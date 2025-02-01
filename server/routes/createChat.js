const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

router.post('/create', async (req, res) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const chatTable = process.env.CHAT_TABLE;
    const otherUserEmail = req.body.other_user_email;
    const userId = req.user.user_id;
    const userTable = process.env.USER_TABLE;
    const paramsForMainUser = {
        TableName: userTable,
        Key: {
            user_id: userId
        }
    };

    const paramsForSecondUser = {
        TableName: userTable,
        IndexName: 'email-index',
        KeyConditionExpression: 'email = :emailValue',
        ExpressionAttributeValues: {
            ':emailValue': otherUserEmail
        }
    };

    try {
        const mainUserResult = await dynamoDB.get(paramsForMainUser).promise();

        const secondUserResult = await dynamoDB.query(paramsForSecondUser).promise();

        if (secondUserResult.Items.length === 0) {
            return res.status(404).json({ error: 'Second user not found' });
        }

        const secondUserId = secondUserResult.Items[0].user_id;
        const userPair = [userId, secondUserId].sort().join('#');

        // Check if a chat already exists between the two users
        const paramsForChatCheck = {
            TableName: chatTable,
            IndexName: 'user_pair-index',
            KeyConditionExpression: 'user_pair = :userPair',
            ExpressionAttributeValues: {
                ':userPair': userPair
            }
        };

        const chatCheckResult = await dynamoDB.query(paramsForChatCheck).promise();

        if (chatCheckResult.Items.length > 0) {
            return res.status(400).json({ error: 'Chat already exists between the two users' });
        }

        // Create a new chat
        const chatId = uuidv4();
        const paramsForNewChat = {
            TableName: chatTable,
            Item: {
                chat_id: chatId,
                user_pair: userPair,
                users: [{
                    name: mainUserResult.Item.user_info.display_name,
                    email: mainUserResult.Item.email,
                }, {
                    name: secondUserResult.Items[0].user_info.display_name,
                    email: secondUserResult.Items[0].email,
                }],
                messages: []
            }
        };

        const updateParamsForMainUser = {
            TableName: userTable,
            Key: {
                user_id: userId
            },
            UpdateExpression: 'SET chat_ids = list_append(if_not_exists(chat_ids, :emptyList), :chatId)',
            ExpressionAttributeValues: {
                ':chatId': [chatId],
                ':emptyList': []
            }
        };

        const updateParamsForSecondUser = {
            TableName: userTable,
            Key: {
                user_id: secondUserId
            },
            UpdateExpression: 'SET chat_ids = list_append(if_not_exists(chat_ids, :emptyList), :chatId)',
            ExpressionAttributeValues: {
                ':chatId': [chatId],
                ':emptyList': []
            }
        };
        await dynamoDB.update(updateParamsForMainUser).promise();
        await dynamoDB.update(updateParamsForSecondUser).promise();

        await dynamoDB.put(paramsForNewChat).promise();
        res.status(201).json({ message: 'Chat created successfully', chat_id: chatId });
    } catch (error) {
        console.error("Error creating chat: ", error); // Log the error for debugging
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;