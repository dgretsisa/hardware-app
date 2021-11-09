const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

/** Model */
const User = require('../model/user.model');

/** Error */
const { ValidationError } = require('../utility/error.class');

const login = async (resource) => {
    const { username, password } = resource;
    
    const user = await User.findOne({ username }).select('+password');

    if(!user) {
        throw new ValidationError('Failed to login', { credential: 'You have entered an unknown credential' });
    }

    /** Check password if match */
    if(! await bcrypt.compare(password, user.password)) {
        throw new ValidationError('Failed to login', { credential: 'You have entered an unknown credential' });
    }

    /** JWT token */
    const token = jwt.sign({ id: user._id }, process.env.APP_TOKEN_KEY, { expiresIn: 3600000 });
    
    return { user, token };
}

module.exports = {
    login
}