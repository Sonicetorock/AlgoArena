const jwt = require('jsonwebtoken');
const { StatusCodes } = require("http-status-codes");
const bcrypt = require('bcryptjs')
require('dotenv').config();

//model imports 
const Users = require('../models/Users');

const registerUser = async (req, res) => {
    try {
      const {fullname,email,password, phone, forgotPassQ,forgotPassA,dob,bio} = req.body;
        // console.log(req.body)
    //   if(!(email && dob && phone && password && fullname)) {
    //        return res.status(400).json({msg: "Fill all details "})
    //     }
        const emailExists = await Users.findOne({ email });
      if (emailExists) {
            return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ msg: "Email already exists!" });
        }
        const hashedPass = bcrypt.hashSync(password, 8);
        const user = await Users.create({
            fullname,
            email,
            dob,
            phone,
            password:hashedPass,
            forgotPassQ,
            forgotPassA,
            bio
        })
        const token = jwt.sign({
            id: user._id,
           email,
           role: 'user'
           //role can also be given here
        }, process.env.SECRET_KEY,{
            expiresIn:'2h'//autmoatically logout
        });

        user.password = undefined
        res.status(StatusCodes.CREATED).json({ msg: "Usered successfully", user,token });
    } catch (error) {
      console.error("Error registering:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  module.exports = {registerUser}