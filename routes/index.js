const router = require('express').Router();
// const lesson1Controller = require('../controllers/lesson1');

// W01 L01
// router.get('/', lesson1Controller.kazRoute);
// router.get('/jaqueline', lesson1Controller.jaquelineRoute);
// router.get('/koh', lesson1Controller.kohRoute);

// W01 L02
router.use('/contacts', require('./contacts'));

// Use swagger
router.use('/api-docs', require('./swagger'));

module.exports = router;
