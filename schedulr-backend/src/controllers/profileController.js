const { Profile } = require('../models');

const createProfile = async (req, res) => {
	const { user_id, avatar, first_name, last_name } = req.body;
	const profile = await Profile.create({ user_id, avatar, first_name, last_name });

	res.status(201).json(profile);
};

const getProfile = async (req, res) => {
	const { id } = req.params;
	const profile = await Profile.findByPk(id);

	if (profile) {
		res.status(200).json(profile);
	}
};

const updateProfile = async (req, res) => {
	const { id } = req.params;
	const { avatar, first_name, last_name } = req.body;
	const profile = await Profile.findByPk(id);

	if (profile) {
		await profile.update({ avatar, first_name, last_name });
		res.status(200).json(profile);
	}
};

const deleteProfile = async (req, res) => {
	const { id } = req.params;
	const profile = await Profile.findByPk(id);

	if (profile) {
		await Profile.destroy({ where: { id } });
		return res.status(204).send();
	}
	return res.status(404).json({ message: 'Profile not found' });
};


module.exports = { createProfile, getProfile, updateProfile, deleteProfile };