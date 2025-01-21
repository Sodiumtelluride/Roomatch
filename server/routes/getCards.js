const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');

router.get('/get', async (req, res) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const userTable = process.env.USER_TABLE;
    let allItems = [];
    const params = {
        TableName: userTable,
    };

    try {
        const result = await dynamoDB.scan(params).promise();
        let index=0;
        let itemSurrender=16;
        while (index<itemSurrender && index<result.Items.length) {
            if (result.Items[index].user_info.major!=null && result.Items[index].user_info.grad!=null && result.Items[index].user_info.description!=null) {
                allItems.push(result.Items[index]);   
            }
            else {
                itemSurrender++;
            }
            
            index++;
        }res.status(201).json(allItems);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    
});

module.exports = router;