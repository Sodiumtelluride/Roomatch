const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');

router.get('/me', async (req, res) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const tableName = process.env.DYNAMODB_TABLE_NAME;
    const bucketName = process.env.S3_BUCKET_NAME;
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const userId = req.user.user_id;

    const S3 = new S3Client({
        credentials: { 
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey
        },
        region: region
    });
    
    const params = {
        TableName: tableName,
        Key: {
            user_id: userId
        }
    };
    
    try {
        const result = await dynamoDB.get(params).promise();
        if (!result.Item) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const S3_params = {
            Bucket: bucketName,
            Key: result.Item.images.image_1_name
        };
        
        const command = new GetObjectCommand(S3_params);
        const imageUrl = await getSignedUrl(S3, command, { expiresIn: 3600 });
        // Remove the password field from the result
        const { password, ...userWithoutPassword } = result.Item;

        res.status(201).json({ ...userWithoutPassword, imageUrl });
        } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;