const bcrypt = require('bcryptjs')
const { User, Profile } = require('../models');

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
	const userId = req.params.id;
	const user = await User.findByPk(userId);

	if (user) {
		await Profile.destroy({ where: { user_id: userId } });
		await User.destroy({ where: { id: userId }});
		return res.status(204).send();
	}
	return res.status(404).json({ message: 'User not found' });
};


module.exports = { createUser, getUser, updateUser, deleteUser };