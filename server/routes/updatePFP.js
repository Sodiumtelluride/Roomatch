const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const crypto = require('crypto'); 
const bcrypt = require('bcrypt');
const multer = require('multer');
const { count } = require('console');

const storage = multer.memoryStorage();

router.post('/updatePFP', async (req, res) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const userTable = process.env.USER_TABLE;
    const bucketName = process.env.S3_BUCKET_NAME;
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const userId = req.user.user_id;
    const params = {
        TableName: userTable,
        Key: {
            user_id: userId
        }
    };
    const s3 = new S3Client({
        credentials: { 
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey
        },
        region: region
    });

    try {
        const result = await dynamoDB.get(params).promise();
        const originalUser = result.Item;

        if (!result.Item) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (req.file) {
            const imageBuffer = req.file.buffer;
            const imageType = req.file.mimetype;
            const profilePictureName = originalUser.profile_picture;

            const s3Params = {
                Bucket: bucketName,
                Key: profilePictureName,
                Body: imageBuffer,
                ContentType: imageType
            };
            const command = new PutObjectCommand(s3Params);
            await s3.send(command);

        }

        res.status(201).json("Updated user");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;