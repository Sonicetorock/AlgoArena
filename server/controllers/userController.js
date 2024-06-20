const jwt = require('jsonwebtoken');
const { StatusCodes } = require("http-status-codes");
const Users = require('../models/Users');
require('dotenv').config();

const getAccountDetails = async (req,res)=>{
    try {
        const {email}= req.body
        const user = await Users.findOne({email})
        if(!user) return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ msg: 'User does not exist! Please Sign Up' });
        return res.status(StatusCodes.OK).json({user});
    } catch (error) {
        console.log("Error Fetching account details : " +error)
    }
}

module.exports = {getAccountDetails}