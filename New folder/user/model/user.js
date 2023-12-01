const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // photo: {
    //     type: String,

    //     required: false,
    //     unique: true
    // },
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

});

const USER = mongoose.model('USER', userSchema);

module.exports = USER;
