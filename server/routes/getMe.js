const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');

router.get('/me', async (req, res) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const userTable = process.env.USER_TABLE;
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
        TableName: userTable,
        Key: {
            user_id: userId
        }
    };
    
    try {
        const result = await dynamoDB.get(params).promise();
        if (!result.Item) {
            return res.status(404).json({ error: 'User not found' });
        }


        const urls = [];

        const imageNames = [result.Item.images.image_1_name, result.Item.images.image_2_name, result.Item.images.image_3_name, result.Item.images.image_4_name, result.Item.images.image_5_name];
        for(const name of imageNames) {
            // Check if images and image_1_name exist
            if (name) {
                const S3_params = {
                    Bucket: bucketName,
                    Key: name
                };
                const command = new GetObjectCommand(S3_params);
                try{
                    const url = await getSignedUrl(S3, command, { expiresIn: 3600 });
                    urls.push(url);
                }catch (error) {}
            }
        }
        const { password, ...userWithoutPassword } = result.Item;
        res.status(200).json({ ...userWithoutPassword, imageUrls: urls });
        
    } catch (error) {
        console.error("Error fetching user data: ", error); // Log the error for debugging
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;