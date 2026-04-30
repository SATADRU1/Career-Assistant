const jwt = require('jsonwebtoken');
const tokenBlacklistModel = require('../models/blacklist.model');


async function authUser(req, res, next) {
    const token = req.cookies.token; // reading the token first
    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token });  // check is the is not blacklisted yet
    if (isTokenBlacklisted) {
        return res.status(401).json({ message: 'Token is invalid' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // decoded use for reading or extracting data from token
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = { authUser };