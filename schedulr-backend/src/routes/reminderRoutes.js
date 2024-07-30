const express = require('express');
const router = express.Router();
const { createReminder, getReminder, updateReminder, deleteReminder } = require('../controllers/reminderController');

router.post('/', createReminder);
router.get('/:id', getReminder);
router.put('/:id', updateReminder);
router.delete('/:id', deleteReminder);

module.exports = router;