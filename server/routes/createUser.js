const express = require('express');
const AWS = require('aws-sdk');
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post('/create', async (req, res) => {
    const { id, first_name, last_name, email, password} = req.body;
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const tableName = process.env.DYNAMODB_TABLE_NAME;
    const paramsForQuery = {
        TableName: tableName,
        IndexName: 'email-index',
        KeyConditionExpression: 'email = :emailValue',
        ExpressionAttributeValues: {
            ':emailValue': email
        }
    };
    const user = { 
        user_id: id,
        first_name,
        last_name,
        email,
        password
    };
    const params = {
        TableName: tableName,
        Item: user,
    };
    
    try {
        const doesUserExist = await dynamoDB.query(paramsForQuery).promise();
        if(doesUserExist.Count!=0){
            res.status(300).json({ error: 'User with that email already exists' });
        } else{
            await dynamoDB.put(params).promise();
            const token = jwt.sign(
                {user_id: user.user_id},
                process.env.MY_SECRET,
                { expiresIn: "1h" }
            );
    
            
            res.cookie("token",token, {
               httpOnly:true,
            });
            return res.status(201).json({
                message: 'Item added successfully',
                redirect: '/userPage',
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(user);
    }
});

module.exports = router;