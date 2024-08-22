const { Category } = require('../models');

const createCategory = async (req, res) => {
	const { user_id, name, emoji } = req.body;

	try {
		const category = await Category.create({ user_id, name, emoji });
		return res.status(201).json(category);
	} catch (error) {
		return res.status(500).json({ message: 'Error creating category', error: error.message });
	}
};

const getCategory = async (req, res) => {
	const { id } = req.params;

	try {
		const category = await Category.findByPk(id);

		if (category) {
			res.status(200).json(category);
		}
	} catch {
		return res.status(500).json({ message: 'Error fetching category' });
	}
};

const updateCategory = async (req, res) => {
	const { id } = req.params;
	const { name, emoji } = req.body;

	try {
		const category = await Category.findByPk(id);

		if (category) {
			await category.update({ name, emoji });
			res.status(200).json(category);
		}
	}
	catch {
		return res.status(404).json({ message: 'Error updating category' });
	}
};

const deleteCategory = async (req, res) => {
	const { id } = req.params;

	try {
		const category = await Category.findByPk(id);

		if (category) {
			await Category.destroy({ where: { id } });
			return res.status(204).send();
		}
	}
	catch {
		return res.status(404).json({ message: 'Error deleting category' });
	}
};


module.exports = { createCategory, getCategory, updateCategory, deleteCategory };