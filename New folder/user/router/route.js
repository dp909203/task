  
const express = require('express');
const register = require('../controller/register');
const router = express.Router();

router.post('/register', register.register);
router.post('/login', register.login);
// router.get('/user', register.user);

module.exports = router;

