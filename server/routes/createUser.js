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
        password,
        user_info: {
            display_name: null,
            pronouns: null,
            major: null,
            '#yr': null,
            placeOrigin: null,
            description: null,
            extraversion: null,
            cleanliness: null,
            using_my_stuff: null,
            end_time: null,
            start_time: null
        }
    };
    const params = {
        TableName: tableName,
        Item: user,
    };

    const user_to_pass = {
        user_id: id,
        first_name,
        last_name,
        email,
        user_info: {
            display_name: null,
            pronouns: null,
            major: null,
            '#yr': null,
            placeOrigin: null,
            description: null,
            extraversion: null,
            cleanliness: null,
            using_my_stuff: null,
            end_time: null,
            start_time: null
        }
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
            res.status(201).json({ redirectUrl: '/pages/userPage/userPage.html' });
            return ;
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;