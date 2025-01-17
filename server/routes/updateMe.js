const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');


router.post('/updateMe', async (req, res) => {
    console.log( req.file);
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const tableName = process.env.DYNAMODB_TABLE_NAME;
    const userId = req.user.user_id;
    const { first_name, last_name, email, password, display_name, pronouns, major, class_year, placeOrigin, description, extraversion, cleanliness, using_my_stuff, end_time, start_time } = req.body;
    const params = {
        TableName: tableName,
        Key: {
            user_id: userId
        }
    };

    try {
        console.log("running");
        const result = await dynamoDB.get(params).promise();
        const orginalUser = result.Item;
        const passwordToPass = password ? password : orginalUser.password;
        console.log("item: " + JSON.stringify(result.Item));

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
        console.log("updateParams: " + JSON.stringify(updateParams));

        const updatedResult = await dynamoDB.update(updateParams).promise();
        console.log("updated item: " + JSON.stringify(updatedResult.Attributes));
        // Remove the password field from the result
        res.status(201).json("Updated user");
        } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;