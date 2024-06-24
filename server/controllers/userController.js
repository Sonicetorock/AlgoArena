const jwt = require('jsonwebtoken');
const { StatusCodes } = require("http-status-codes");

const Users = require('../models/Users');

const bcrypt = require('bcryptjs');
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
const updateAccountDetails = async (req, res) => {
    console.log("called update profile");
    try {
        const { oldPassword, updatedData } = req.body;

        // Find the user by their email (unique identifier)
        const user = await Users.findOne({ email: updatedData.email });

        if (!user) {
            return res.status(404).json({ error: 'User not found!' });
        }

        // Verify the old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect Old Password' });
        }

        // Hash the new password if it is being updated
        if (updatedData.password && updatedData.password !== user.password) {
            const salt = await bcrypt.genSalt(8);
            updatedData.password = await bcrypt.hash(updatedData.password, salt);
        }

        // Update user details
        Object.assign(user, updatedData);

        // Save the updated user details
        await user.save();

        res.status(200).json({ message: 'Account details updated successfully', user });
    } catch (error) {
        console.log('BC: Error updating account details:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {getAccountDetails,updateAccountDetails}