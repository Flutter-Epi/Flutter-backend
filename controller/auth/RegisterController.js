// import express from "express";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import _ from "lodash";
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const _ = require("lodash");

// import User from "../../database/models/userModel";
// import { validateRegister } from "../../store/validators";
// import { config } from "../../store/config";
const User = require("../../database/models/userModel");
const { validateRegister } = require("../../store/validators");
const { config } = require("../../store/config");

const RegisterController = express.Router();

RegisterController.post('/', async (req, res) => {
    const {error} = validateRegister(req.body);

    if (error)
        return res.status(400).json( { error: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });

    if (user)
        return res.status(401).json( { error: 'That user already exist !' });
    else {
        user = new User(_.pick(req.body, ['username', 'email', 'password']));
        user['role'] = 'user';
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user['token'] = jwt.sign({ _id: user._id }, config.privateKey, {algorithm: 'RS256'});

        await user.save();

        res.status(201).send(_.pick(user, ['_id', 'username', 'email', 'token']));
    }
});

// export default RegisterController;
// module.exports.default = RegisterController;
exports.default = RegisterController;