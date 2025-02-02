const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');


router.post('/create', async (req, res) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const userTable = process.env.USER_TABLE;
    const { id, first_name, last_name, email, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 12);
    const randomFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
    const paramsForQuery = {
        TableName: userTable,
        IndexName: 'email-index',
        KeyConditionExpression: 'email = :emailValue',
        ExpressionAttributeValues: {
            ':emailValue': email
        }
    };
    const user = { 
        user_id: id,
        first_name,
        last_name,
        email,
        password: passwordHash,
        user_info: {
            display_name: null,
            pronouns: null,
            major: null,
            grad: null,
            place_origin: null,
            description: null,
            extraversion: null,
            cleanliness: null,
            using_my_stuff: null,
            end_time: null,
            start_time: null,
            roommate: {
                id: null,
            },
            request: {
                id: '',
                request_sent_to: ''
            }
        },
        profile_picture: randomFileName(),
        images: {
            image_1_name: randomFileName(),
            image_2_name: randomFileName(),
            image_3_name: randomFileName(),
            image_4_name: randomFileName(),
            image_5_name: randomFileName()
        },
        chat_ids: []

    };
    const params = {
        TableName: userTable,
        Item: user,
    };

    const user_to_pass = {
        user_id: id,
        first_name,
        last_name,
        email,
        user_info: {
            display_name: null,
            pronouns: null,
            major: null,
            grad: null,
            place_origin: null,
            description: null,
            extraversion: null,
            cleanliness: null,
            using_my_stuff: null,
            end_time: null,
            start_time: null
        },
        chat_ids: []
    };
    
    try {
        const doesUserExist = await dynamoDB.query(paramsForQuery).promise();
        if (doesUserExist.Count != 0) {
            res.status(409).json({ error: 'User with that email already exists' });
        } else {
            await dynamoDB.put(params).promise();
            const token = jwt.sign(user_to_pass, process.env.MY_SECRET, { expiresIn: "1h" });
            //console.log(token);
            res.cookie('token', token, {
                httpOnly: true,
            });
            res.status(201).json({ redirectUrl: '/pages/userPage/userPage.html' });
            return ;
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;