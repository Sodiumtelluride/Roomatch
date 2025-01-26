const express = require('express');
const AWS = require('aws-sdk');
const router = express.Router();

router.get('/:id', async (req, res) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const tableName = process.env.USER_TABLE;
    const params = {
        TableName: tableName,
        Key: { user_id: req.params.id }, // Match your DynamoDB Partition Key name
    };

    try {
        const data = await dynamoDB.get(params).promise();
        if (data.Item) {
            res.status(202).json(data.Item);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;