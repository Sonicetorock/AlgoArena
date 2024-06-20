const express = require('express');
const userRoutes = express.Router();
const { getAccountDetails } = require('../controllers/userController');
const verifyJWT = require('../middleware/verifyJWT');

userRoutes.use(verifyJWT)
userRoutes.get('/accountDetails', getAccountDetails);

module.exports = {userRoutes}