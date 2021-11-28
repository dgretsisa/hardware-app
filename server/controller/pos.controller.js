const PosRepository = require('../repository/pos.repository');
const utility = require('../utility/utility.function');

const fetch = async (req, res) => {
    const data = await PosRepository.fetch(req.query);
    return res.status(200).json(data);
}

const create = async (req, res) => {
    const data = await PosRepository.create(req.body);
    utility.broadcast(req, 'ADD_POS', data);
    return res.status(200).json(data);
}

const fetchById = async (req, res) => {
    const data = await PosRepository.fetchById(req.params.id);
    return res.status(200).json(data);
}

const updateById = async (req, res) => {
    const data = await PosRepository.updateById(req.params.id, req.body);
    utility.broadcast(req, 'UPDATE_POS', data);
    return res.status(200).json(data);
}

const deleteById = async (req, res) => {
    const data = await PosRepository.deleteById(req.params.id);
    utility.broadcast(req, 'DELETE_POS', data);
    return res.status(200).json(data);
}

module.exports = {
    fetch,
    create,
    fetchById,
    updateById,
    deleteById
}