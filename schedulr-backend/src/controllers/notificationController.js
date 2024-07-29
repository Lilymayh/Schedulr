const { Notification } = require('../models');

const createNotification = async (req, res) => {
	const { user_id, reminder_id, notification_time, status } = req.body;
	const notification = await Notification.create({ user_id, reminder_id, notification_time, status });

	res.status(201).json(notification)
}

const getNotification = async (req, res) => {
	const { id } = req.params;
	const notification = await Notification.findByPk(id);

	if (notification) {
		res.status(200).json(notification);
	}
};

const updateNotification = async (req, res) => {
	const { id } = req.params;
	const { notification_time, status } = req.body;
	const notification = await Notification.findByPk(id);

	if (notification) {
		await notification.update({ notification_time, status  });
		res.status(200).json(notification);
	}
};

const deleteNotification = async (req, res) => {
	const { id } = req.params;
	const notification = await Notification.findByPk(id);

	if (notification) {
		await Notification.destroy({ where: { id } });
		return res.status(204).send();
	}
	return res.status(404).json({ message: 'Notification not found' });
};


module.exports = { createNotification, getNotification, updateNotification, deleteNotification };