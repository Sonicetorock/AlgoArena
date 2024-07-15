const express = require('express');
const userRoutes = express.Router();
const { getAccountDetails, updateAccountDetails, compile, submitCode } = require('../controllers/userController');
const {verifyJWT} = require('../middleware/verifyJWT');
const { getAllProblems, getProblem } = require('../controllers/adminController');

userRoutes.use(verifyJWT)




userRoutes.get('/accountDetails', getAccountDetails);
userRoutes.put('/accountDetails',updateAccountDetails);

userRoutes.get('/problems',getAllProblems)
userRoutes.get('/problems/:id',getProblem)
userRoutes.post('/compile',compile)
userRoutes.post('/submit',submitCode)

module.exports = {userRoutes}