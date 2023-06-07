const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const app = express();

const port = process.env.port || 3000;

app.use("/", require("./routes"));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

mongodb.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log("Connected to DB and listening on " + port);
  }
});
