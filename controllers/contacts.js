const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

//gets all data from the database
const getAllData = async (req, res, next) => {
  const result = await mongodb
    .getDb()
    .db("CSE341")
    .collection("contacts")
    .find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

//gets single data from the database
const getSingleData = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("CSE341")
    .collection("contacts")
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

module.exports = { getAllData, getSingleData };
