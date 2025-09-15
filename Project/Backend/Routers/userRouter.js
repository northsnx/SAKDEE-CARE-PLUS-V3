const express = require('express');
const router = express.Router();

const { creactUser, login, verifyOtp , getAllUsers , deleteUser} = require('../Controllers/userControllers')

// POST สร้าง user
router.post('/users', creactUser);
router.post('/login', login);

router.post('/verify-otp', verifyOtp);

// GET USER
router.get('/users', getAllUsers);

// DEL USER
router.delete('/users/:id', deleteUser);
 

module.exports = router; 