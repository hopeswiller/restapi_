const joi = require('@hapi/joi')
const bcrypt = require('bcryptjs');

function registerValidation(data) {
    const schema = joi.object({
        username: joi.string().required(),
        email: joi.string().email(),
        password: joi.string().min(6).required()
    });

    // VALIDATE DATA 
    return schema.validate(data);
}

function loginValidation(data) {
    const schema = joi.object({
        email: joi.string().email(),
        password: joi.string().min(6).required()
    });

    // VALIDATE DATA 
    return schema.validate(data);
}

async function encryptPassword(data) {
    const generatedSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data, generatedSalt);

    return hashedPassword
}

module.exports = {
    registerValidation,
    loginValidation,
    encryptPassword
}