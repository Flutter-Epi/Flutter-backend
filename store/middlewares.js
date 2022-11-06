//import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken");

// import { config } from "./config";
const { config } = require("./config");

async function checkJwt(req, res, next) {
    if (!req.headers.authorization)
        return res.status(401).json({error: 'You need to be logged in to proceed'});
    else {
        const token = String(req.headers.authorization).substring(7);
        req.token = token;
        jwt.verify(token, config.publicKey, (err) => {
            if (err) {
                return res.status(403).json({error: err});
            } else
                next();
        });
    }
}

module.exports = { checkJwt };