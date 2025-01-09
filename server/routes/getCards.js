const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');

router.get('/getCards', async (req, res) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const tableName = process.env.DYNAMODB_TABLE_NAME;
    let lastEvaluatedKey = null;
    let allItems = [];
    


    while (lastEvaluatedKey !== null) {
        const params = {
            TableName: tableName,
            ExclusiveStartKey: lastEvaluatedKey
        };

        try {
            const result = await dynamoDB.scan(params).promise();
            allItems = allItems.concat(result.Items);
            lastEvaluatedKey = result.LastEvaluatedKey;
        } catch (error) {
            console.error("Error fetching data:", error);
            break;
        }
    }
    console.log(allItems)
});