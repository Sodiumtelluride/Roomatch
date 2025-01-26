const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

router.post('/createRoomateRequest', async (req, res) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const userTable = process.env.USER_TABLE;
    const { id } = req.body;
    const getRequestId= (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
    const paramsForQuery = {
        TableName: userTable,
        KeyConditionExpression: 'user_id = :userId',
        ExpressionAttributeValues: {
            ':userId': id
        }
    };

    try {
        const data = await dynamoDB.query(paramsForQuery).promise();
        if (data.Item.user_info.request.id !== null && data.Item.user_info.request.request_sent_to !== null) {
            return res.status(400).json({ error: 'One request maximum reached' });
        }

        const updateParams = {
            TableName: userTable,
            Key: {
            user_id: userId
            },
            UpdateExpression: 'set user_info.request.id = :reqId, user_info.request.request_sent_to = :reqSentTo',
            ExpressionAttributeValues: {
            ':reqId': getRequestId(),
            ':reqSentTo': req.body.request_sent_to || null
            },
            ReturnValues: 'ALL_NEW'
        };
        await dynamoDB.update(updateParams).promise();
        res.status(201).json({ message: 'Roommate request created successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Could not create roommate request.' });
    }

});