const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5174;
const keyId = "34c2xw234";

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configure AWS SDK
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.DYNAMODB_TABLE_NAME;

// API Routes
//app.get(url, callback)

app.get('/GETUSER', async (req, res) => {
    const params = {
        TableName: tableName,
        Key: { id: keyId },
    };

    try {
        const data = await dynamoDB.scan(params).promise();
        res.status(200).json(data.Items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/CREATEUSER', async (req, res) => {
    const { id, first_name, last_name, email, password} = req.body;

    const user = {
        user_id: id, // Match your DynamoDB Partition Key name
        first_name,
        last_name,
        email,
        password
    };
    const params = {
        TableName: tableName,
        Item: user,
    };

    try {
        await dynamoDB.put(params).promise();
        res.status(201).json({ message: 'Item added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(user);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});