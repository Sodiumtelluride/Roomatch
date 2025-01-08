const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const cors = require('cors');
const getUserRouter = require('./routes/getUsers');
const createUserRouter = require('./routes/createUser');
const getMeRouter = require('./routes/getMe');
const updateMeRouter = require('./routes/updateMe');
const cookieJWTAuth = require('./middleware/cookieJWTAuth'); // Correct import
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5174;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Update with your client URL
    credentials: true // Allow credentials
}));
app.use(bodyParser.json());
app.use(cookieParser()); // Add cookie-parser middleware

// Logging middleware to debug route handling
app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
});

// Configure AWS SDK
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// API Routes
app.use('/getMe', cookieJWTAuth, getMeRouter); // Use the middleware and route
app.use('/user', getUserRouter); // Use the middleware and route
app.use('/createUser', createUserRouter);
app.use('/userGet', cookieJWTAuth, updateMeRouter);

// Catch-all route for client-side routing
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/index.html'));
// });

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});