const router = require('express').Router();
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET all contacts
router.get('/', async (req, res) => {
    try {
        const result = await mongodb
            .getDb()
            .db('project1')
            .collection('contacts')
            .find();
        const lists = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single contact by ID
router.get('/:id', async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb
            .getDb()
            .db('project1')
            .collection('contacts')
            .find({ _id: userId });
        const lists = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new contact
router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, email, favoriteColor, birthday } =
            req.body;

        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const contact = {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        };
        const result = await mongodb
            .getDb()
            .db('project1')
            .collection('contacts')
            .insertOne(contact);
        res.setHeader('Content-Type', 'application/json');
        return res.status(201).json({
            message: 'Contact created successfully',
            _id: result.insertedId
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// PUT to update a contact
router.put('/:id', async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const { firstName, lastName, email, favoriteColor, birthday } =
            req.body;
        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({
                message: 'All fields are required',
                required: [
                    'firstName',
                    'lastName',
                    'email',
                    'favoriteColor',
                    'birthday'
                ]
            });
        }
        const contact = {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        };
        const result = await mongodb
            .getDb()
            .db('project1')
            .collection('contacts')
            .replaceOne({ _id: userId }, contact);
        res.setHeader('Content-Type', 'application/json');
        if (result.modifiedCount > 0) {
            return res.status(200).json({
                message: 'Contact updated successfully',
                _id: userId
            });
        } else if (result.matchedCount === 0) {
            return res.status(404).json({
                message: 'Contact not found',
                _id: userId
            });
        } else {
            return res.status(200).json({
                message: 'No changes made - contact data was identical',
                _id: userId
            });
        }
    } catch (err) {
        if (err.name === 'BSONError' || err.message.includes('ObjectId')) {
            return res.status(400).json({
                message: 'Invalid contact ID format'
            });
        }
        return res.status(500).json({
            message: 'Internal server error',
            error: err.message
        });
    }
});

// DELETE a contact
router.delete('/:id', async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb
            .getDb()
            .db('project1')
            .collection('contacts')
            .deleteOne({ _id: userId });

        res.setHeader('Content-Type', 'application/json');
        if (result.deletedCount > 0) {
            return res.status(200).json({
                message: 'Contact deleted successfully',
                _id: userId
            });
        } else {
            return res.status(404).json({
                message: 'Contact not found - nothing to delete',
                _id: userId
            });
        }
    } catch (err) {
        if (err.name === 'BSONError' || err.message.includes('ObjectId')) {
            return res.status(400).json({
                message: 'Invalid contact ID format'
            });
        }
        return res.status(500).json({
            message: 'Internal server error',
            error: err.message
        });
    }
});

module.exports = router;
