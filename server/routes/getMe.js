const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');


router.get('/me', async (req, res) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const tableName = process.env.DYNAMODB_TABLE_NAME;
    const userId = req.user.user_id;

    const params = {
        TableName: tableName,
        Key: {
            user_id: userId
        }
    };

    try {
        console.log("running");
        const result = await dynamoDB.get(params).promise();
        console.log("item: " + JSON.stringify(result.Item));

        if (!result.Item) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Remove the password field from the result
        const { password, ...userWithoutPassword } = result.Item;

        res.status(201).json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;