const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");

express().use(cookieParser());

const cookieJWTAuth = (req, res, next) => {
    console.log(req.cookies);
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const user = jwt.verify(token, process.env.MY_SECRET);
        console.log(user);
        req.user = user;
        next();
    } catch (err) {
        res.clearCookie("token");
        return res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = cookieJWTAuth;