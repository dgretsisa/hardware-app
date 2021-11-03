const UserRepository = require('../repository/user.repository');

const broadcast = (req, eventName, eventData) => {
    const socket = req.app.get('socket');
    socket.emit(eventName, eventData);
}

const fetch = async (req, res) => {
    const data = await UserRepository.fetch();
    return res.status(200).json(data);
}

const create = async (req, res) => {
    const data = await UserRepository.create(req.body);
    broadcast(req, 'ADD_USER', data);
    return res.status(200).json(data);
}

const fetchById = async (req, res) => {
    const data = await UserRepository.fetchById(req.params.id);
    return res.status(200).json(data);
}

const updateById = async (req, res) => {
    const data = await UserRepository.updateById(req.params.id, req.body);
    broadcast(req, 'UPDATE_USER', { id: req.params.id, user: data });
    return res.status(200).json(data);
}

const deleteById = async (req, res) => {
    const data = await UserRepository.deleteById(req.params.id);
    broadcast(req, 'DELETE_USER', data);
    return res.status(200).json(data);
}

module.exports = {
    fetch,
    create,
    fetchById,
    updateById,
    deleteById
}
