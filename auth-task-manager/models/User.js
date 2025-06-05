const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 1978
        },
        Editor: Number,
        Admin: Number
    },
    refreshToken: String
});

module.exports = mongoose.model('User', usersSchema);