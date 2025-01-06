const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');


router.post('/create', async (req, res) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const tableName = process.env.DYNAMODB_TABLE_NAME;
    const { id, first_name, last_name, email, password } = req.body;

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

    const user_to_pass = {
        user_id: id,
        first_name,
        last_name,
        email
    };
    
    try {
        const doesUserExist = await dynamoDB.query(paramsForQuery).promise();
        if (doesUserExist.Count != 0) {
            res.status(409).json({ error: 'User with that email already exists' });
        } else {
            await dynamoDB.put(params).promise();
            const token = jwt.sign(user_to_pass, process.env.MY_SECRET, { expiresIn: "1h" });
            console.log(token);
            res.cookie('token', token, {
                httpOnly: true,
            });
            // return res.redirect('http://localhost:5173/pages/userPage/userPage.html');
            res.status(201).json({ redirectUrl: '/pages/userPage/userPage.html' });
            return ;
            // res.status(200).json({ redirectUrl: '/pages/userPage/userPage.html' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;