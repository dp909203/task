
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./model/user');
const user_session = require('./model/user_session');
const path = require('path');
const router = require('./router/route');
const multer = require('multer');
const upload = multer();
const port = process.env.PORT || 3000;
const http = require('http');
const url = 'mongodb://localhost:27017/task';


const app = express();
app.use(upload.any())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,


});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
