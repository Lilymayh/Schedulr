const express = require('express');
const router = express.Router();
const { createProfile, getProfile, updateProfile, deleteProfile } = require('../controllers/profileController');

router.post('/profile', createProfile);
router.get('/profile/:id', getProfile);
router.put('/profile/:id', updateProfile);
router.delete('/profile/:id', deleteProfile);

module.exports = router;