const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/authController');

router.post('/login', loginUser);
// Note: In production you might want to protect or remove the register route
// router.post('/register', registerUser);

module.exports = router;
