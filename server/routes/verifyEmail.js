const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const userTable = process.env.USER_TABLE;

router.get('/verify-email', async (req, res) => {
    const token = req.query.token;

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.MY_SECRET);
        const email = decoded.email;

        // Update the user's status in the database
        const params = {
            TableName: userTable,
            Key: {
                email: email
            },
            UpdateExpression: 'set email_verified = :verified',
            ExpressionAttributeValues: {
                ':verified': true
            },
            ReturnValues: 'ALL_NEW'
        };

        const result = await dynamoDB.update(params).promise();
        console.log('User verified:', result);

        // Redirect to a confirmation page or send a success response
        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(400).json({ error: 'Invalid or expired token' });
    }
});

module.exports = router;