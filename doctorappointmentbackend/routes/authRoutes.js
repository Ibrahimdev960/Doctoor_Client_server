const express = require('express');
const { registerUser, loginUser,registerDoctor } = require('../controller/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post("/register-doctor", registerDoctor);

module.exports = router;
