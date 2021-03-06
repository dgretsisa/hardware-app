const UserRepository = require('../repository/user.repository');
const utility = require('../utility/utility.function');

const fetch = async (req, res) => {
    const data = await UserRepository.fetch(req.query);
    return res.status(200).json(data);
}

const create = async (req, res) => {
    const data = await UserRepository.create(req.body);
    utility.broadcast(req, 'ADD_USER', data);
    return res.status(200).json(data);
}

const fetchById = async (req, res) => {
    const data = await UserRepository.fetchById(req.params.id);
    return res.status(200).json(data);
}

const updateById = async (req, res) => {
    const data = await UserRepository.updateById(req.params.id, req.body);
    utility.broadcast(req, 'UPDATE_USER', data);
    return res.status(200).json(data);
}

const deleteById = async (req, res) => {
    const data = await UserRepository.deleteById(req.params.id);
    utility.broadcast(req, 'DELETE_USER', data);
    return res.status(200).json(data);
}

module.exports = {
    fetch,
    create,
    fetchById,
    updateById,
    deleteById
}
