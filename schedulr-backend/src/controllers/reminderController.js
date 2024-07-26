const { Reminder } = require('../models');

const createReminder = async (req, res) => {
	const { user_id, title, description, reminder_time } = req.body;
	const reminder = await Reminder.create({ user_id, title, description, reminder_time });

	res.status(201).json(reminder);
};

const getReminder = async (req, res) => {
	const { id } = req.params;
	const reminder = await Reminder.findByPk(id);

	if (reminder) {
		res.status(200).json(reminder);
	}
};

const updateReminder = async (req, res) => {
	const { id } = req.params;
	const { title, description, reminder_time } = req.body;
	const reminder = await Reminder.findByPk(id);

	if (reminder) {
		await reminder.update({ title, description, reminder_time });
		res.status(200).json(reminder);
	}
};

const deleteReminder = async (req, res) => {
	const { id } = req.params;
	const reminder = await Reminder.findByPk(id);

	if (reminder) {
		await Reminder.destroy({ where: { id } });
		return res.status(204).send();
	}
	return res.status(404).json({ message: 'Reminder not found' });
};


module.exports = { createReminder, getReminder, updateReminder, deleteReminder };