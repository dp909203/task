const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: false
    },
    tok: {
        type: String,
        required: true,
        unique: false
    },

});

const user_session = mongoose.model('user_session', postSchema);

module.exports = user_session;
