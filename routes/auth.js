const router = require('express').Router();
const User = require('../models/User');
const validation = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
    try {
        const {
            error
        } = validation.registerValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        // user exits?
        const userExist = await User.find({
            email: req.body.email,
        });
        if (userExist.length != 0) return res.status(400).send('Email already exists');

        // hash password
        const hashedPassword = await validation.encryptPassword(req.body.password);

        const user = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        }).save();
        res.status(200).json(user);
        console.log(`User Registered`);

    } catch (err) {
        res.status(400).send({
            message: err
        })
    }
});



router.post('/login', async (req, res) => {
    const {
        error
    } = validation.loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.find({
        email: req.body.email,
    });
    if (user.length == 0) return res.status(400).send('Email doesn\'t exits');

    //decrypt password
    const validPassword = await bcrypt.compare(req.body.password, user[0].password)
    if (!validPassword) return res.status(400).send(`Invalid Password`)

    //create and assign token
    const token = await jwt.sign({
            _id: user[0]._id
        },
        process.env.TOKEN_SECRET
    );
    res.header('auth-token', token).send(token);
});



module.exports = router