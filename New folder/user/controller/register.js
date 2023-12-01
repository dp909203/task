const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const user_session = require('../model/user_session');
const register = async (req, res) => {
    try {

        const { name, email, password, mobile } = req.body;
        console.log(req.body);
        const existingUser = await User.findOne({ email: email });
        console.log(req.body);

        // const photo = req.photoPath;
        // console.log(req.photoPath);

        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            // photo,
            name,
            email,
            password: hashedPassword,
            mobile,
        });
        await user.save();

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, 'myLongAndSecureSecretKey1234');


        let userSession = await user_session.findOne({
            where: { userId: user.id },
        });

        if (userSession) {

            userSession.tok = token;
            await userSession.save();
        } else {

            userSession = await user_session.create({
                userId: user.id,
                tok: token,
            });
        }


        res.status(200).json({ message: 'User login successful', token: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Login failed' });
    }
};


// const user = async (req, res) => {
//     // // token 
//     const token = req.headers.authorization;


//     jwt.verify(token, 'myLongAndSecureSecretKey1234', (err, user) => {
//         if (err) {
//             return res.status(403).json({ error: 'Invalid token' });
//         }
//         return res.status(200).json({ "user": user });
//     });

// }













module.exports = { register, login };

