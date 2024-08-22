const express = require('express');
const router = express.Router();
const { createCategory, getCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

router.post('/', createCategory);
router.get('/:id', getCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;