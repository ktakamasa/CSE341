const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// gets all data from the database
const getAllContacts = async (req, res, next) => {
  try {
    mongodb
      .getDb()
      .db('CSE341')
      .collection('contacts')
      .find()
      .toArray((err, lists) => {
        if (err) {
          res.status(500).json({ error: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// gets single data from the database
const getSingleContact = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid contact id to find a contact.');
    }
    const userId = new ObjectId(req.params.id);
    mongodb
      .getDb()
      .db('CSE341')
      .collection('contacts')
      .find({ _id: userId })
      .toArray((err, lists) => {
        if (err) {
          res.status(500).json({ error: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// create new contact in the database
const createContact = async (req, res, next) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb
      .getDb()
      .db('CSE341')
      .collection('contacts')
      .insertOne(contact);
    if (response.acknowledged) {
      console.log('Created successfully');
      res.setHeader('Content-Type', 'application/json');
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(response.error || 'An error occurred! Contact not created!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// update contact by id in the database
const updateContact = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid contact id to update a contact.');
    }
    const userId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };
    const response = await mongodb
      .getDb()
      .db('CSE341')
      .collection('contacts')
      .updateOne({ _id: userId }, { $set: contact });
    console.log(response);
    if (response.modifiedCount === 1) {
      console.log('Updated successfully');
      res.setHeader('Content-Type', 'application/json');
      res.status(204).json(response).send;
    } else {
      res.status(500).json(response.error || 'An error occurred!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// delete contact by id in the database
const deleteContact = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid contact id to delete a contact.');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('CSE341')
      .collection('contacts')
      .deleteOne({ _id: userId });
    if (response.deletedCount === 1) {
      console.log('Deleted successfully');
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(response).send;
    } else {
      res.status(500).json(response.error || 'An error occurred!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
};
