const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const cors = require('cors');
const getUserRouter = require('./routes/getUsers');
const createUserRouter = require('./routes/createUser');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5174;

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

app.use('/user', getUserRouter);

app.use('/create', createUserRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});