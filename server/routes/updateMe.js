const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const crypto = require('crypto'); 



router.post('/updateMe', async (req, res) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const tableName = process.env.DYNAMODB_TABLE_NAME;
    const bucketName = process.env.S3_BUCKET_NAME;
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const userId = req.user.user_id;
    const { first_name, last_name, email, password, display_name, pronouns, major, class_year, placeOrigin, description, extraversion, cleanliness, using_my_stuff, end_time, start_time } = req.body;
    const params = {
        TableName: tableName,
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
        const passwordToPass = password ? password : orginalUser.password;

        if (!result.Item) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user in DynamoDB
        const updateParams = {
            TableName: tableName,
            Key: {
            user_id: userId
            },
            UpdateExpression: 'set first_name = :fn, last_name = :ln, email = :em, password = :pw, user_info.display_name = :dn, user_info.pronouns = :pr, user_info.major = :mj, user_info.#yr = :yr, user_info.placeOrigin = :po, user_info.description = :ds, user_info.extraversion = :ex, user_info.cleanliness = :cl, user_info.using_my_stuff = :us, user_info.end_time = :et, user_info.start_time = :st',
            ExpressionAttributeValues: {
            ':fn': first_name || null,
            ':ln': last_name || null,
            ':em': email || null,
            ':pw': passwordToPass || null,
            ':dn': display_name || null,
            ':pr': pronouns || null,
            ':mj': major || null,
            ':yr': class_year || null,
            ':po': placeOrigin || null,
            ':ds': description || null,
            ':ex': extraversion || null,
            ':cl': cleanliness || null,
            ':us': using_my_stuff || null,
            ':et': end_time || null,
            ':st': start_time || null
            },
            ExpressionAttributeNames: {
            '#yr': 'class'
            },
            ReturnValues: 'ALL_NEW'
        };
        const updatedResult = await dynamoDB.update(updateParams).promise();
        if(req.file){
            let add = false;
            let insertImageName = null;
            const imageNames = [orginalUser.images.image_1_name, orginalUser.images.image_2_name, orginalUser.images.image_3_name, orginalUser.images.image_4_name, orginalUser.images.image_5_name];
            for (const name of imageNames) {
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
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;