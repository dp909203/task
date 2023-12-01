const express = require('express');
const auth = require('../middelware/authantication');
const post_controller = require('../controller/post_controller');
const uploadImage = require('../middelware/upload');
const findTokenByUserId = require('../index')
const router = express.Router();


router.post('/createPost', auth.authenticateToken, uploadImage, post_controller.createPost);
router.get('/index', post_controller.abc);
module.exports = router;
