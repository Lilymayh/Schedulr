const express = require('express');
const router = express.Router();
const { createNotification, getNotification, updateNotification, deleteNotification } = require('../controllers/notificationController');

router.post('/', createNotification);
router.get('/:id', getNotification);
router.put('/:id', updateNotification);
router.delete('/:id', deleteNotification);

module.exports = router;