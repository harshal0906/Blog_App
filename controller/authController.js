const User = require('../models/userModel');

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email, password });

        if (!user) {
            return res.send('Invalid email or password');
        }

        res.cookie('user', user._id, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        });

        return res.redirect('/admin');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
};

const loginPage = (req,res) => {
    res.render('login')
}
const signupPage = (req,res) => {
    res.render('signup')
}

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.send('Email already registered');
        }

        const newUser = new User({
            name,
            email,
            password
        });

        await newUser.save();
        return res.redirect('/auth/login');
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    loginUser,
    signup,
    signupPage,
    loginPage,
};
