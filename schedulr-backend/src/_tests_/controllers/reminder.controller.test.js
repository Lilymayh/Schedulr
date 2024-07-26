const { User, Reminder } = require('../../models');
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

describe('Reminder Controller', () => {
	beforeAll(async () => {
		await sequelize.sync();
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it('should create a reminder', async () => {
		const user = await createUser();
		const userId = user.id;
		const reminder = await createReminder(userId);

		expect(reminder).toHaveProperty('id');
		expect(reminder).toHaveProperty('user_id', userId);
	});

	it('should get a reminder', async () => {
		const user = await createUser();
		const userId = user.id;
		const reminder = await createReminder(userId);
		const reminderId = reminder.id;

		const getReminder = await request(app)
			.get(`/api/reminders/${reminderId}`);

		expect(getReminder.status).toBe(200);
		expect(getReminder.body).toHaveProperty('id', reminderId);
	});

	it('should update a reminder', async () => {
		const user = await createUser();
		const userId = user.id;
		const reminder = await createReminder(userId);
		const reminderId = reminder.id;

		const updateReminder = await request(app)
			.put(`/api/reminders/${reminderId}`)
			.send({
				title: 'newTitle',
			});

		expect(updateReminder.status).toBe(200);
		expect(updateReminder.body).toHaveProperty('title', 'newTitle');
	});

	it('should delete a user and associated reminder', async () => {
		const user = await createUser();
		const userId = user.id;

		const reminder = await createReminder(userId);
		const reminderId = reminder.id;

		await request(app)
			.delete(`/api/users/${userId}`)
			.expect(204);

		const deletedUser = await User.findByPk(userId);
		expect(deletedUser).toBeNull();

		const deletedReminder = await Reminder.findByPk(reminderId);
		expect(deletedReminder).toBeNull();
	});
});