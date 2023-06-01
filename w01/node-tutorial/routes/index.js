const routes = require("express").Router();
const lesson1Controller = require("../controllers/lesson1");

routes.get("/", lesson1Controller.kohRoute);
routes.get("/jaqueline", lesson1Controller.jaquelineRoute);

module.exports = routes;