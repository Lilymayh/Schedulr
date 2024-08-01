const { User, Profile } = require('../models');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
	const { username, email, password } = req.body;

	if (!username || !email || !password) {
		res.status(404).json({ message: 'Username, email, and password must all be provided' });
	}

	try {
		const user = await User.create({ username, email, password });

		return res.status(201).json(user);
	}
	catch {
		return res.status(500).json({ message: 'Error creating user' });
	}
};

const getUser = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findByPk(id);

		if (user) {
			return res.status(200).json(user);
		}
	}
	catch
	{
		return res.status(500).json({ message: 'Error fetching user' });
	}
};

const updateUser = async (req, res) => {
	const { id } = req.params;
	const { username, email, password } = req.body;

	try {
		const user = await User.findByPk(id);

		if (user) {
			const updatedUser = { username, email };

			if (password) {
				updatedUser.password = await bcrypt.hash(password, 10);
			}
			await user.update(updatedUser);
			return res.status(200).json(user);
		}
	}
	catch {
		return res.status(404).json({ message: 'Error updating user' });
	}
};

const deleteUser = async (req, res) => {
	const userId = req.params.id;

	try {
		const user = await User.findByPk(userId);

		if (user) {
			await Profile.destroy({ where: { user_id: userId } });
			await User.destroy({ where: { id: userId } });
			return res.status(204).send();
		}
	}
	catch {
		return res.status(404).json({ message: 'Error deleting user' });
	}
};


module.exports = { createUser, getUser, updateUser, deleteUser };