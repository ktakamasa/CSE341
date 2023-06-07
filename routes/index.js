const router = require("express").Router();
const lesson1Controller = require("../controllers/lesson1");

router.get("/", lesson1Controller.kazRoute);
router.get("/jaqueline", lesson1Controller.jaquelineRoute);
router.get("/koh", lesson1Controller.kohRoute);

router.use("/contacts", require("./contacts"));

module.exports = router;
