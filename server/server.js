const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const getUserRouter = require('./routes/getUsers');
const createUserRouter = require('./routes/createUser');
const getMeRouter = require('./routes/getMe');
const updateMeRouter = require('./routes/updateMe');
const deleteImageRouter = require('./routes/deleteImage'); // Import deleteImage route
const loginRouter = require('./routes/login');
const getCardsRouter = require('./routes/getCards');
const cookieJWTAuth = require('./middleware/cookieJWTAuth');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5174;

// Initialize multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
app.use('/userGet', upload.single('image'), cookieJWTAuth, updateMeRouter); // Use multer middleware for file uploads
app.use('/', cookieJWTAuth, deleteImageRouter); // Use deleteImage route
app.use('/getCards', getCardsRouter); // add middleware when working
app.use('/', loginRouter);

//messaging 
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        method: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('ID: ' + socket.id);

    socket.on('join_room', (data) => {
        console.log('room: ' + data);
        socket.join(data);
    });

    socket.on('send_message', (data) => {
        // console.log(data);
        socket.to(data.room).emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected ', socket.id);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});