const jwt = require('jsonwebtoken')

/** Error */
const { UnauthorizedError } = require('../utility/error.class');

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

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