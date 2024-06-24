const express = require('express');
const userRoutes = express.Router();
const { getAccountDetails, updateAccountDetails } = require('../controllers/userController');
const verifyJWT = require('../middleware/verifyJWT');

userRoutes.use(verifyJWT)
userRoutes.get('/accountDetails', getAccountDetails);
userRoutes.put('/accountDetails',updateAccountDetails)

module.exports = {userRoutes}