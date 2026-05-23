const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    // #swagger.tags = ['Users']
    const result = await mongodb.getDatabase().db('project1').collection('users').find();
    const users = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
};

const getSingle = async (req, res) => {
    // #swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('project1').collection('users').find({ _id: userId });
    const users = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users[0]);
};

const createUser = async (req, res) => {
    // #swagger.tags = ['Users']
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb.getDatabase().db('project1').collection('users').insertOne(user);
    if (result.acknowledged) {
        res.status(201).json({ id: result.insertedId });
    } else {
        res.status(500).json({ error: 'Failed to create user.' });
    }
};

const updateUser = async (req, res) => {
    // #swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const result = await mongodb.getDatabase().db('project1').collection('users').replaceOne({ _id: userId }, user);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json({ error: 'Failed to update user.' });
    }
};

const deleteUser = async (req, res) => {
    // #swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('project1').collection('users').deleteOne({ _id: userId });
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json({ error: 'Failed to delete user.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};
