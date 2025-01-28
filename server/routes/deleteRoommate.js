const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

router.post('/delete', async (req, res) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const userTable = process.env.USER_TABLE;
    const { id } = req.body;

    const paramsForQuery = {
        TableName: userTable,
        KeyConditionExpression: 'user_id = :userId',
        ExpressionAttributeValues: {
            ':userId': id
        }
    };
    
    try {
        const data = await dynamoDB.query(paramsForQuery).promise();
        if (data.Items.length !== 0 && data.Items[0].user_info.roommate.id === null) {
            return res.status(400).json({ error: 'No roommate request found to delete' });
        }
        
        const updateParams = {
            TableName: userTable,
            Key: {
                user_id: id
            },
            UpdateExpression: 'set #userInfo.#request.#id = :reqId',
            ExpressionAttributeNames: {
                '#userInfo': 'user_info',
                '#request': 'roommate',
                '#id': 'id',
            },
            ExpressionAttributeValues: {
                ':reqId': null,
            },
            ReturnValues: 'ALL_NEW'
        };
        await dynamoDB.update(updateParams).promise();
        res.status(200).json({ message: 'Roommate request deleted successfully.' });
    } catch (error) {
        console.error("Error deleting roommate request:", error);
        res.status(500).json({ error: 'Could not delete roommate request.' });
    }

});

module.exports = router;
