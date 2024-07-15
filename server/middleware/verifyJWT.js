const jwt = require('jsonwebtoken');


//chks user session is valid or not (default chk : user)
const verifyJWT = (req, res, next) => {
    console.log("called MW JWT")
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized (verification of JWT)' });
    }

    const token = authHeader.split(' ')[1]; 
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {//decoded user
            if (err) return res.status(403).json({ error: 'Forbidden' });
            req.user = decoded.email;
            req.role = decoded.role;
            console.log("sucessfully passed jwt verification")
            next();
        }
    );
};


//chks if user role is admin or not
const isAdmin = (req, res, next) => {
    console.log("called MW JWT, checking user is admin or not");
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized (verification of JWT)' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => { // decoded user
            if (err) return res.status(403).json({ error: 'Forbidden' });
            req.user = decoded.email;
            req.role = decoded.role;

            if (decoded.role !== 'admin') {
                return res.status(403).json({ error: 'Forbidden: Admins only' });
            }

            console.log("successfully passed role verification @ jwt MW");
            next();
        }
    );
}

module.exports = {isAdmin,verifyJWT};