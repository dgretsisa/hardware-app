const jwt = require('jsonwebtoken')

/** Error */
const { UnauthorizedError } = require('../utility/error.class');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        throw new UnauthorizedError('Access denied');
    }

    try {
        jwt.verify(token, process.env.APP_TOKEN_KEY);
    }
    catch{
        throw new UnauthorizedError('Access denied');
    }

    return next();
}

module.exports = verifyToken;