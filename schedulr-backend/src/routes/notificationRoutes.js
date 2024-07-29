const express = require('express');
const router = express.Router();
const { createNotification, getNotification, updateNotification, deleteNotification } = require('../controllers/notificationController');

router.post('/notifications', createNotification);
router.get('/notifications/:id', getNotification);
router.put('/notifications/:id', updateNotification);
router.delete('/notifications/:id', deleteNotification);

module.exports = router;