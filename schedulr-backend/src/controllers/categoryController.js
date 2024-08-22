const { Category } = require('../models');

const createCategory = async (req, res) => {
	const { user_id, name, emoji } = req.body;
	const category = await Category
		.create({ user_id, name, emoji });

	res.status(201).json(category);
};

const getCategory = async (req, res) => {
	const { id } = req.params;
	const category = await Category.findByPk(id);

	if (category) {
		res.status(200).json(category);
	}
};

const updateCategory = async (req, res) => {
	const { id } = req.params;
	const { name, emoji } = req.body;
	const category = await Category.findByPk(id);

	if (category) {
		await category.update({ name, emoji });
		res.status(200).json(category);
	}
};

const deleteCategory = async (req, res) => {
	const { id } = req.params;
	const category = await Category.findByPk(id);

	if (category) {
		await Category.destroy({ where: { id } });
		return res.status(204).send();
	}
	return res.status(404).json({ message: 'Category not found' });
};


module.exports = { createCategory, getCategory, updateCategory, deleteCategory };