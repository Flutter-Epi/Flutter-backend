import Joi from "joi";

export function validateLogin(user) {
    const schema = Joi.object({
        username: Joi.string() .min(1) .max(50) .required(),
        password: Joi.string() .min(1) .max(255) .required()
    });

    return schema.validate(user);
}

export function validateRegister(user) {
    const schema = Joi.object({
        username: Joi.string() .min(1) .max(50) .required(),
        email: Joi.string() .min(1) .max(255) .required() .email(),
        password: Joi.string() .min(1) .max(255) .required()
    });

    return schema.validate(user);
}

export function validateUpdateUser(user) {
    const schema = Joi.object({
        username: Joi.string() .min(1) .max(50),
        email: Joi.string() .min(1) .max(255) .email(),
        role: Joi.string() .min(1) .max(50),
        password: Joi.string() .min(1) .max(255)
    });

    return schema.validate(user);
}