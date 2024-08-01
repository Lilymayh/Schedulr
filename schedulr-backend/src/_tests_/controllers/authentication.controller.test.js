const { User } = require('../../models');
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

describe('Authentication Controller', () => {
	beforeAll(async () => {
		await sequelize.sync();
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it('should login a user with valid credentials', async () => {
		const user = await createUser();

		const login = await request(app)
			.post(`/api/`)
			.send({
				username: 'user',
				email: 'test@email.com',
				password: 'password'
			});

		expect(login.status).toBe(200);
		expect(login.body).toHaveProperty('email', 'test@email.com');
	});

	it('should not login a user with invalid credentials', async () => {
		await createUser();

		const login = await request(app)
			.post(`/api/`)
			.send({
				username: 'user',
				email: 'test@email.com',
				password: 'wrongPassword'
			});

		expect(login.status).toBe(401);
		expect(login.body).toHaveProperty('error', 'Invalid login credentials');
	});
	it('should logout a user', async () => {
		await request(app)
			.post('/api/')
			.send({
				username: 'user',
				email: 'test@email.com',
				password: 'password'
			});

		const response = await request(app)
			.post('/api/');

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('message', 'Logged out successfully');
	});
});