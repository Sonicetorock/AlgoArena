const express = require('express');
const authRoutes = express.Router();
const { registerUser, loginUser, refresh, logout } = require('../controllers/authController');



authRoutes.post('/register',registerUser);
authRoutes.post('/login',loginUser)
authRoutes.get('/refresh',refresh);
authRoutes.post('/logout',logout);

module.exports={authRoutes}