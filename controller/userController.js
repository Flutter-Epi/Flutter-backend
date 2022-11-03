import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import _ from "lodash";

import { User } from "../database/models";
import { checkJwt } from "../store/middlewares";
import { validateUpdateUser } from "../store/validators";
import { config } from "../store/config";

const UserController = express.Router();

UserController.get('/' , checkJwt, async (req, res) => {
    User.find({}, function(err, users) {
        let userMap = [];

        users.forEach((user) => {
            userMap.push(_.pick(user, ['_id', 'username','email','role', 'createdAt', 'updatedAt']));
        });

        res.status(200).send(userMap);
    });
});

UserController.get('/:id', checkJwt, async (req, res) => {
    let user = await User.findOne({ _id: req.params.id });

    if (user)
        res.send(_.pick(user, ['_id', 'username','email','role', 'createdAt', 'updatedAt']));
    else
        res.status(404).json({error: "User not found"});
});

UserController.put('/:id', checkJwt, async (req, res)=> {
    const { error } = validateUpdateUser(req.body);

    if (error)
        return res.status(403).json({ error: error.details[0].message});

    try {
        const token = req.token;
        const decoded = jwt.verify(token, config.publicKey);
        const salt = await bcrypt.genSalt(10);

        let user = await User.findOne({_id: decoded._id});

        const newBody = req.body;

        if (req.body.role && user.role !== "admin")
            delete newBody.role
        if (newBody.password)
            newBody.password = await bcrypt.hash(newBody.password, salt)

        User.findByIdAndUpdate(req.params.id, newBody, (err, user) => {
            if (err)
                return res.status(403).json({error: 'Update couldn\'t be proceed'})
            return res.status(200).json({success: 'Updated!'})
        })
    } catch {
        return res.status(403).json({error: 'You need to be logged as an admin or request for your profile '});
    }
});

UserController.delete('/:id', checkJwt, async (req, res) => {
    User.deleteOne({_id: req.params.id})
        .then(()=> {
            res.status(200).json({ message: 'User deleted !' });
        })
        .catch( (error) => {
            res.status(400).json({ error: error });
        });
});

export default UserController;
