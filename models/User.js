const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        max: 15
    },
    email: {
        type: String,
        max: 40,
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 8
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema);