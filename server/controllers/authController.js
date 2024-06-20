const jwt = require('jsonwebtoken');
const { StatusCodes } = require("http-status-codes");
const bcrypt = require('bcryptjs')
require('dotenv').config();

//model imports 
const Users = require('../models/Users');


const generateAccessToken = (user) => {
  return jwt.sign({
          id: user._id,
          email: user.email,
          role: 'user'
  }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2m' });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
};


const registerUser = async (req, res) => {
    const { fullname, email, password, phone, forgotPassQ, forgotPassA, dob, bio } = req.body;

    try {
        console.log("called register")
        if (!(email && dob && phone && password && fullname)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Fill all details' });
        }
        const emailExists = await Users.findOne({ email });
        if (emailExists) {
            return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ msg: 'Email already exists!' });
        }

        const hashedPass = await bcrypt.hash(password, 8);
        const user = await Users.create({
            fullname,
            email,
            dob,
            phone,
            password: hashedPass,
            forgotPassQ,
            forgotPassA,
            bio
        });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Save refreshToken with user
        user.refreshToken = refreshToken;
        await user.save();

        // Send refresh token as httpOnly cookie
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            // secure: true,
            // sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        user.password = undefined;
        res
        .status(StatusCodes.CREATED)
        .json({ msg: "Registered successfully", user, accessToken });
    } catch (error) {
        console.error('Error registering:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
      console.log("called login")

        if (!(email && password)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'All fields are required to login' });
        }
        //chk user exists or not
        const user = await Users.findOne({ email });
        if (!user) {
            return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ msg: 'User does not exist! Please Sign Up' });
        }
        //chk if password is valid and correct or not
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Incorrect credentials' });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Save refreshToken with user
        user.refreshToken = refreshToken;
        await user.save();

        // Send refresh token as httpOnly cookie
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            // secure: true,
            // sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });


        user.password = undefined;//making invisible kin of
        res.status(StatusCodes.OK).json({ msg: "Logged In successfully", user, accessToken });
    } catch (error) {
        console.error('Error logging in:(Incorct Creds)', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

const refresh = (req, res) => {
  console.log("called refresh")

  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized no JWT' });

  const refreshToken = cookies.jwt;

  jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
          if (err) return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' });

          const foundUser = await Users.findById(decoded.id).exec();
          if (!foundUser) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized user not found' });

          const accessToken = generateAccessToken(foundUser);

          res.json({ accessToken });
      }
  );
};

// @desc Logout User
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = async (req, res) => {
  console.log("called refresh")

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content

  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await Users.findOne({ refreshToken }).exec();
  if (!foundUser) {
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
      return res.sendStatus(204);
  }

  // Delete refreshToken in db
  foundUser.refreshToken = '';
  await foundUser.save();

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  res.json({ message: 'Cookie cleared' });
};

module.exports = { registerUser, loginUser, refresh,logout};



