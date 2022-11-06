// import express from 'express';
// import cors from 'cors';
// import mongoose from "mongoose";
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// import { config } from "./store/config";
// import { LoginController, RegisterController, UserController } from "./controller";
const { config } = require('./store/config');
const { LoginController, RegisterController, UserController } = require('./controller');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/login', LoginController);
app.use('/register', RegisterController);
app.use('/user', UserController);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

let envConfig = config;

app.listen(envConfig.port, () => {
    console.log(`Server started on port ${envConfig.port}`);
    mongoose
        .connect(envConfig.mongoDbUri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.log("Error connecting to MongoDB", err);
        });
});