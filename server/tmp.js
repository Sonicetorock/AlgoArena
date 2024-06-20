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
      if(!(email && dob && phone && password && fullname)) {
           return res.status(400).json({msg: "Fill all details "})
        }
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
        res.status(StatusCodes.CREATED).json({ msg: "Registered successfully", user,token });
    } catch (error) {
      console.error("Error registering:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

const loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body;
        if(!(email && password)){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:"All fields are required to login"})
        }
        //chk user exists or not
        const user = await Users.findOne({ email });
        if (!user) {
              return res
              .status(StatusCodes.UNAUTHORIZED)
              .json({ msg: "User doesnt exist! Please SignUp" });
          }
        //chk if password is valid and correct ot not
        bcrypt.compare(password, user.password, function(err, result) {
            if(result){
                const token = jwt.sign({
                    id: user._id,
                    email,
                   //role can also be given here
                   role: 'user'
                }, process.env.SECRET_KEY,{
                    expiresIn:'2h'//autmoatically logout
                });
        
                user.password = undefined //delete user.password
                res.status(StatusCodes.CREATED).json({ msg: "Logged In successfully", user,token });
            }
            else res.status(StatusCodes.UNAUTHORIZED).json({ error: "Incorrect Creds" });
        });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Internal server error" });
    }
}

  module.exports = {registerUser,loginUser}