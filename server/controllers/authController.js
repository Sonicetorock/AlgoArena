const jwt = require('jsonwebtoken');
const { StatusCodes } = require("http-status-codes");
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Model imports 
const Users = require('../models/Users');

//gen new access token upon expiry 
const generateAccessToken = (user) => {
    console.log("generating access token")
    // console.log(user)
    return jwt.sign({
        id: user._id,
        email: user.email,
        role: user?.role||"user",
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

//gen new refresh token to get upon expiry of old one
const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

//registering user if all consitions met
// form validation should be done 
const registerUser = async (req, res) => {
    const { fullname, email, password, phone, forgotPassQ, forgotPassA, dob, bio } = req.body;
    // console.log(req.body)
    try {
        console.log("called register");
        if (!(email && dob  && password && fullname)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Fill all details' });
        }
        if ((forgotPassQ && !forgotPassA) || (!forgotPassQ && forgotPassA)) {
            //boths hould be filled or both should be e,pty
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please selct a Question or do Answer' });
        }

        const emailExists = await Users.findOne({ email });
        if (emailExists) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Email already exists!' });
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

        res.status(StatusCodes.CREATED).json({ msg: "Registered successfully", user });
    } catch (error) {
        console.error('Error registering:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

//loggin in user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
      console.log("called login")

        if (!(email && password)) {
            console.log("BC: Missing all fields");
            return res.status(StatusCodes.BAD_REQUEST).json({ error: 'All fields are required to login' });
        }
        //chk user exists or not
        const user = await Users.findOne({ email });
        console.log("BC user login :",user)
        if (!user) {
            console.log("BC: User not found");
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'User does not exist! Please Sign Up' });
        }
        //chk if password is valid and correct or not
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            console.log("BC: Passwords do not match");
            return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Incorrect credentials' });
        }
        console.log("before gernating accT", user)
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
            maxAge: 7*24* 60 * 60* 1000 // 7d
        });


        user.password = undefined;//making invisible kin of
        //protecting this , if MIM has access there is no use of using this refresh mech, done in updateAccountdetails too
        user.refreshToken = undefined;
        res.status(StatusCodes.OK).json({ msg: "Logged In successfully", user, accessToken });
    } catch (error) {
        console.error('Error logging in:(Incorct Creds)', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};

//refresing accesstoken based on stored refresh and requested refresh token 
const refresh = (req, res) => {
    console.log("called refresh");
    //we are setting and sending a cookie name d "jwt"(http only -> can be only acceseed by a server) while authentication
    // upon requesting refresh frm frontend, we are chking whether still refresh is not expired or not using verify
    // if expired refresh (cookie is not expired)=> get error in decoding => unauthorised sent
    // if cookie expired means => no cookie named jwt => forbidden
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized: No JWT in cookies may be cookie expired' });

    const refreshToken = cookies.jwt;
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            console.log(decoded)
            if (err) {
                console.log("Refresh token expired or invalid!");
                return res.status(StatusCodes.FORBIDDEN).json({ error: 'Forbidden' });
            }

            const foundUser = await Users.findById(decoded.id).exec();
            if (!foundUser) return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Unauthorized: User not found' });

          const accessToken = generateAccessToken(foundUser);

            res.json({ accessToken });
        }
    );
};

// just to clear cookie if exists
const logout = async (req, res) => {
    console.log("called logout");

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
    res.json({ msg: 'Cookie cleared' });
};

module.exports = { registerUser, loginUser, refresh, logout };