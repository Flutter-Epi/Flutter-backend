//import mongoose from 'mongoose';
//import userSchema from "../schemas/userSchema";
const mongoose = require('mongoose');
const userSchema = require('../schemas/userSchema');

const User = mongoose.model('User', userSchema);

// export default User;
module.exports = User;