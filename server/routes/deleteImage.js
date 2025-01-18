const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');

router.post('/deleteImage', async (req, res) => {
    const { imageUrl } = req.body;
    const bucketName = process.env.S3_BUCKET_NAME;
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const userId = req.user.user_id;

    const s3 = new S3Client({
        credentials: { 
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey
        },
        region: region
    });

    const imageName = imageUrl.split('/').pop().substring(0, 64); // Extract first 64 characters of the image name from URL
    console.log(imageName);

    const s3Params = {
        Bucket: bucketName,
        Key: imageName
    };

    const command = new DeleteObjectCommand(s3Params);

    try {
        await s3.send(command);
        res.status(200).json({ message: 'Image deleted successfully', updatedUser: result.Attributes });
    } catch (error) {
        console.error("Error deleting image: ", error); // Log the error for debugging
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;