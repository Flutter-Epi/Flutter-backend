import { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255,
    },
    role: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
    },
    spotify_token: {
        type: String,
        required: false,
        minlength: 1,
        maxlength: 255,
    },
    picture: {
        type: String,
        required: false,
        minlength: 1,
    }
}, { timestamps: { createdAt: "CreatedAt", updatedAt: "UpdatedAt" }});

export default userSchema;