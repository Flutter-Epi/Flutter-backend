import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import _ from "lodash";

import User from "../../database/models/userModel";
import { validateLogin } from "../../store/validators";
import { config } from "../../store/config";

const LoginController = express.Router();

LoginController.post('/', async (req, res) => {
    const { error } = validateLogin(req.body);

    if (error)
        return res.status(400).json({ error: error.details[0].message});

    let user = await User.findOne({ username: req.body.username });

    if (!user)
        return res.status(401).json( { error: 'Incorrect username or password.' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword)
        return res.status(401).json( { error: 'Incorrect email or password.' });

    user['token'] = jwt.sign({ _id: user._id }, config.privateKey, {algorithm: 'RS256'});

    res.status(200).send(_.pick(user, ['_id', 'email', 'token', 'role', 'spotify_token', 'picture']));
});

export default LoginController;