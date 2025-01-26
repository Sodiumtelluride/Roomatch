const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
router.post('/get', async (req, res) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const chatTable = process.env.CHAT_TABLE;
    const chatIds = req.body;

    console.log(chatIds);
    
    try {
        const wantedChats = [];
        for (const id of chatIds) {
            const params = {
                TableName: chatTable,
                Key: {
                    chat_id: id
                }
            };

            const result = await dynamoDB.get(params).promise();
            console.log(result.Item);
            if (result.Item) {
                console.log("help");
                wantedChats.push(result.Item.messages);
            }
            else {
                return res.status(404).json({ error: 'Chat not found' });
            }
        }   
        res.status(200).json(wantedChats);
        
    } catch (error) {
        console.error("Error fetching user data: ", error); // Log the error for debugging
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;