const { User } = require('../models');

const createUser = async (req, res) => {
	const { username, email, password } = req.body;
	const user = await User.create({ username, email, password });

	res.status(201).json(user);
};

const getUser = async (req, res) => {
	const { id } = req.params;
	const user = await User.findByPk(id);

	if (user) {
		res.status(200).json(user);
	}
};

const updateUser = async (req, res) => {
	const { id } = req.params;
	const { username, email, password } = req.body;
	const user = await User.findByPk(id);

	if (user) {
		await user.update({ username, email, password });
		res.status(200).json(user);
	}
};

const deleteUser = async (req, res) => {
	const { id } = req.params;
	const user = await User.findByPk(id);

	if (user) {
		await user.destroy()
	}
};


module.exports = { createUser, getUser, updateUser, deleteUser };