const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./router/route');
const multer = require('multer');
const upload = multer();
const { Sequelize } = require('sequelize');
const port = process.env.PORT || 3001;
const http = require('http');
const axios = require('axios');
const user = require('../user/model/user_session')
const app = express();
app.use(express.json());
app.use(upload.any());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '',
    database: 'task',
});

const PostModel = require('./model/post');
const { log } = require('console');


const Post = require('./model/post')(sequelize, Sequelize);
sequelize.sync()
    .then(() => {
        console.log('Post model synchronized with the database');
    })
    .catch((error) => {
        console.error('Error synchronizing Post model:', error);
    });



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
