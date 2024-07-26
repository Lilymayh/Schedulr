const express = require('express');
const router = express.Router();
const { createProfile, getProfile, updateProfile, deleteProfile } = require('../controllers/profileController');

router.post('/profiles', createProfile);
router.get('/profiles/:id', getProfile);
router.put('/profiles/:id', updateProfile);
router.delete('/profiles/:id', deleteProfile);

module.exports = router;