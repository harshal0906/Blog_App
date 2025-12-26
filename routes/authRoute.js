const express = require('express');
const { loginUser, signup, signupPage, loginPage } = require('../controller/authController');

const router = express.Router();

router.post('/login',loginUser);
router.get('/login',loginPage);

router.post('/signup',signup);
router.get('/signup',signupPage);

module.exports = router;