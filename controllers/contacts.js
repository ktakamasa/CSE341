const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// gets all data from the database
const getAllContacts = async (req, res, next) => {
  const result = await mongodb
    .getDb()
    .db('CSE341')
    .collection('contacts')
    .find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

// gets single data from the database
const getSingleContact = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('CSE341')
    .collection('contacts')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

// create new contact in the database
const createContact = async (req, res, next) => {
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
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'An error occurred!');
  }
};

// update contact\ by id in the database
const updateContact = async (req, res, next) => {
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
    res.status(204).send;
  } else {
    res.status(500).json(response.error || 'An error occurred!');
  }
};

// delete contact by id in the database
const deleteContact = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db('CSE341')
    .collection('contacts')
    .deleteOne({ _id: userId });
  if (response.deletedCount === 1) {
    console.log('Deleted successfully');
    res.status(204).send;
  } else {
    res.status(500).json(response.error || 'An error occurred!');
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
};
