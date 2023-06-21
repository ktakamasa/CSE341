const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');
const validate = require('../middleware/validate');

// GET
router.get('/', contactsController.getAllContacts);
router.get('/:id', contactsController.getSingleContact);

// POST
router.post('/', validate.saveContact, contactsController.createContact);

// PUT
router.put('/:id', validate.saveContact, contactsController.updateContact);

// DELETE
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
