const routes = require("express").Router();
const lesson1Controller = require("../controllers/lesson1");

routes.get("/", lesson1Controller.kazRoute);
routes.get("/jaqueline", lesson1Controller.jaquelineRoute);
routes.get("/kaz", lesson1Controller.kazRoute);

module.exports = routes;