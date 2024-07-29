const { Notification, User, Reminder } = require('../../models');
const { sequelize } = require('../../../config/sequelize');
const app = require('../../../app');
const request = require('supertest');

const createUser = async () => {
	const response = await request(app)
		.post('/api/users')
		.send({
			username: 'user',
			email: 'test@email.com',
			password: 'password'
		});
	return response.body;
};

const createReminder = async (userId) => {
	const response = await request(app)
		.post('/api/reminders')
		.send({
			user_id: userId,
			title: 'title',
			description: 'description',
			reminder_time: new Date(),
		});
	return response.body;
};

const createNotification = async (userId, reminderId) => {
	const response = await request(app)
		.post('/api/notifications')
		.send({
			user_id: userId,
			reminder_id: reminderId,
			notification_time: new Date(),
			status: 'pending'
		});
	return response.body;
};

describe('Reminder Controller', () => {
	beforeAll(async () => {
		await sequelize.sync();
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it('should create a notification', async () => {
		const user = await createUser();
		const userId = user.id;
		const reminder = await createReminder(userId);
		const reminderId = reminder.id;
		const notification = await createNotification(userId, reminderId);

		expect(notification).toHaveProperty('id');
		expect(notification).toHaveProperty('user_id', userId);
		expect(notification).toHaveProperty('reminder_id', reminderId);
	});

	it('should get a reminder', async () => {
		const user = await createUser();
		const userId = user.id;
		const reminder = await createReminder(userId);
		const reminderId = reminder.id;
		const notification = await createNotification(userId, reminderId);
		const notificationId = notification.id;

		const getNotification = await request(app)
			.get(`/api/notifications/${notificationId}`);

		expect(getNotification.status).toBe(200);
		expect(getNotification.body).toHaveProperty('id', notificationId);
	});

	it('should update a reminder', async () => {
		const user = await createUser();
		const userId = user.id;
		const reminder = await createReminder(userId);
		const reminderId = reminder.id;
		const notification = await createNotification(userId, reminderId);
		const notificationId = notification.id;

		const updateNotification = await request(app)
			.put(`/api/notifications/${notificationId}`)
			.send({
				status: 'completed',
			});

		expect(updateNotification.status).toBe(200);
		expect(updateNotification.body).toHaveProperty('status', 'completed');
	});

	it('should delete a a notification', async () => {
		const user = await createUser();
		const userId = user.id;
		const reminder = await createReminder(userId);
		const reminderId = reminder.id;
		const notification = await createNotification(userId, reminderId);
		const notificationId = notification.id;

		await request(app)
			.delete(`/api/notifications/${notificationId}`)
			.expect(204);

		const deletedNotification = await Notification.findByPk(reminderId);
		expect(deletedNotification).toBeNull();
	});

	it('should delete a user or reminder and associated notification', async () => {
		const user = await createUser();
		const userId = user.id;
		const reminder = await createReminder(userId);
		const reminderId = reminder.id;
		const notification = await createNotification(userId, reminderId);
		const notificationId = notification.id;

		await request(app)
			.delete(`/api/users/${userId}`)
			.expect(204);

		const deletedUser = await User.findByPk(userId);
		expect(deletedUser).toBeNull();

		const deletedReminder = await Reminder.findByPk(reminderId);
		expect(deletedReminder).toBeNull();

		const deletedNotification = await Notification.findByPk(notificationId);
		expect(deletedNotification).toBeNull();
	});
});