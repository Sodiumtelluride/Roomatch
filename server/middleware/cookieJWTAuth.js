const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

exports.cookieJWTAuth = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, process.env.MY_SECRET);
        console.log(user);
        req.user = user;
        next();
    }
    catch(err) {
        res.clearCookie("token");
        return res.redirect("/");
    }
}
module.exports = router;