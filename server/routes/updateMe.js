const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const crypto = require('crypto'); 
const bcrypt = require('bcrypt');
const multer = require('multer');
const { count } = require('console');

const storage = multer.memoryStorage();

router.post('/updateMe', async (req, res) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const userTable = process.env.USER_TABLE;
    const bucketName = process.env.S3_BUCKET_NAME;
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const userId = req.user.user_id;
    const { first_name, last_name, email, password, display_name, pronouns, major, grad, place_origin, description, extraversion, cleanliness, using_my_stuff, end_time, start_time } = req.body;
    // const {display_name, pronouns, major, grad, placeOrigin, description, extraversion, cleanliness, using_my_stuff, end_time, start_time} = req.body.user_info;
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

    const imageBuffer = req.file ? req.file.buffer : null;
    const imageType = req.file ? req.file.mimetype : null;

    
    try {
        const result = await dynamoDB.get(params).promise();
        const orginalUser = result.Item;
        const passwordToPass = password ? await bcrypt.hash(password, 12) : orginalUser.password;

        if (!result.Item) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user in DynamoDB
        const updateParams = {
            TableName: userTable,
            Key: {
            user_id: userId
            },
            UpdateExpression: 'set first_name = :fn, last_name = :ln, email = :em, password = :pw, user_info.display_name = :dn, user_info.pronouns = :pr, user_info.major = :mj, user_info.grad = :gd, user_info.place_origin = :po, user_info.description = :ds, user_info.extraversion = :ex, user_info.cleanliness = :cl, user_info.using_my_stuff = :us, user_info.end_time = :et, user_info.start_time = :st',
            ExpressionAttributeValues: {
            ':fn': first_name || null,
            ':ln': last_name || null,
            ':em': email || null,
            ':pw': passwordToPass || null,
            ':dn': display_name || null,
            ':pr': pronouns || null,
            ':mj': major || null,
            ':gd': grad || null,
            ':po': place_origin || null,
            ':ds': description || null,
            ':ex': extraversion || null,
            ':cl': cleanliness || null,
            ':us': using_my_stuff || null,
            ':et': end_time || "12:00 AM",
            ':st': start_time || "12:00 AM"
            },
            ReturnValues: 'ALL_NEW'
        };
        const updatedResult = await dynamoDB.update(updateParams).promise();
        if (req.files && req.files.length > 0) {
            let add = false;
            let insertImageName = null;
            const imageNames = [
            orginalUser.images.image_1_name,
            orginalUser.images.image_2_name,
            orginalUser.images.image_3_name,
            orginalUser.images.image_4_name,
            orginalUser.images.image_5_name
            ];
            let count = 0;
            for(const file of req.files) {
                count++;            
                const imageBuffer = file.buffer;
                const imageType = file.mimetype;
                const used = [];

                for (const name of imageNames) {
                    console.log('the image that doesnt exist is ', name);
                    if (name) {
                        const headParams = {
                            Bucket: bucketName,
                            Key: name
                        };
                        try {
                            await s3.send(new GetObjectCommand(headParams));
                        } catch (err) {
                            add = true;
                            insertImageName = insertImageName == null ? name : insertImageName;
                        }
                    }
                }

                if (add) {
                    console.log('Adding ', insertImageName);
                    const s3Params = {
                        Bucket: bucketName,
                        Key: insertImageName,
                        Body: imageBuffer,
                        ContentType: imageType
                    };
                    
                    const command = new PutObjectCommand(s3Params);
                    await s3.send(command);
                    insertImageName = null;
                } 
                else {
                    return res.status(500).json({ error: 'Maximum Images Exceeded' });
                }
            }
//             console.log(count);
//             console.log(add);
            if (add) {
                const s3Params = {
                    Bucket: bucketName,
                    Key: insertImageName,
                    Body: imageBuffer,
                    ContentType: imageType
                };
            
                const command = new PutObjectCommand(s3Params);
                await s3.send(command);
            } else{
                return res.status(500).json({ error: 'Maximum Images Exceeded' });
            }
        }
        res.status(201).json("Updated user");
        } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: error.message });
        }
});

module.exports = router;