const AuthRepository = require('../repository/auth.repository');

const login = async (req, res) => {
    const data = await AuthRepository.login(req.body);
    return res.status(200).json(data);
}

module.exports = {
    login
}