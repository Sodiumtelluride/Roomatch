const express = require('express');

const router = express.Router();
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
// Mock authentication function

router.post('/login', async (req, res) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const tableName = process.env.USER_TABLE;
    const { email, password } = req.body;
    const paramsForQuery = {
        TableName: tableName,
        IndexName: 'email-index',
        KeyConditionExpression: 'email = :emailValue',
        ExpressionAttributeValues: {
            ':emailValue': email
        }
    };
    const authenticateUser = async () => {
        const doesUserExist = await dynamoDB.query(paramsForQuery).promise();
        if (doesUserExist.Count === 0) {
            return false;
        } else {
            return doesUserExist.Items[0].password === password;
        }
        
    };
    
    if (authenticateUser()) {
        const doesUserExist = await dynamoDB.query(paramsForQuery).promise();
        const {actualPassword, ...user_to_pass} = doesUserExist.Items[0];
        const token = jwt.sign(user_to_pass, process.env.MY_SECRET, { expiresIn: "1h" });
        res.cookie('token', token, {
            httpOnly: true,
        });
        res.status(201).json({ redirectUrl: '/pages/userPage/userPage.html' });
        return ;        
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

module.exports = router;