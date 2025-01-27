const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

router.post('/add', async (req, res) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const userTable = process.env.USER_TABLE;
    const { user1, user2 } = req.body;
    const paramsForQueryForUser1 = {
        TableName: userTable,
        IndexName: 'email-index',
        KeyConditionExpression: 'email = :emailValue',
        ExpressionAttributeValues: {
            ':emailValue': user1
        }
    };

    const paramsForQueryForUser2 = {
        TableName: userTable,
        IndexName: 'email-index',
        KeyConditionExpression: 'email = :emailValue',
        ExpressionAttributeValues: {
            ':emailValue': user2
        }
    };

    
    try {
        const dataUser1 = await dynamoDB.query(paramsForQueryForUser1).promise();
        const dataUser2 = await dynamoDB.query(paramsForQueryForUser2).promise();
    
        const userId1 = dataUser1.Items.length > 0 ? dataUser1.Items[0].user_id : null;
        const userId2 = dataUser2.Items.length > 0 ? dataUser2.Items[0].user_id : null;
    
        if (!userId1 || !userId2) {
            return res.status(404).json({ error: 'One or both users not found' });
        }
        
        const updateParamsUser1 = {
            TableName: userTable,
            Key: {
                user_id: userId1
            },
            UpdateExpression: 'set user_info.roommate.id = :roommateId',
            ExpressionAttributeValues: {
                ':roommateId': userId2
            },
            ReturnValues: 'ALL_NEW'
        };

        const updateParamsUser2 = {
            TableName: userTable,
            Key: {
                user_id: userId2
            },
            UpdateExpression: 'set user_info.roommate.id = :roommateId',
            ExpressionAttributeValues: {
                ':roommateId': userId1
            },
            ReturnValues: 'ALL_NEW'
        };

        await dynamoDB.update(updateParamsUser1).promise();
        await dynamoDB.update(updateParamsUser2).promise();
        res.status(201).json({ message: 'Roommate added' });
    } catch (error) {
        console.error("Error accepting roomate request", error);
        res.status(500).json({ error: 'Couldnt accept request' });
    }

});

module.exports = router;