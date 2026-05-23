const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db('project1').collection('users').find();
    const users = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('project1').collection('users').find({ _id: userId });
    const users = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users[0]);
};

module.exports = {
    getAll,
    getSingle
}