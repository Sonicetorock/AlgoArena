const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    console.log("called MW JWT")
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Unauthorized (verification of JWT)' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {//decoded user
            if (err) return res.status(403).json({ message: 'Forbidden' });
            req.user = decoded.email;
            req.roles = decoded.roles;
            console.log("sucessfully passed jwt verification")
            next();
        }
    );
};

module.exports = verifyJWT;