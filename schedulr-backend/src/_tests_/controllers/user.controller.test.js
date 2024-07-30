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

describe('User Controller', () => {
	let userId;

	beforeAll(async () => {
		await sequelize.sync();
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it('should create a user', async () => {
		const user = await createUser();

		expect(user).toHaveProperty('id');
		userId = user.id;
	});

	it('should hash a user password', async () => {
		const user = await createUser();
		const findUser = await User.findByPk(user.id);

		expect(findUser).toHaveProperty('password');
		expect(findUser.password).not.toBe('password');
	});

	it('should get a user', async () => {
		const getUser = await request(app)
			.get(`/api/users/${userId}`);

		expect(getUser.status).toBe(200);
		expect(getUser.body).toHaveProperty('username', 'user');
	});

	it('should update a user', async () => {
		const user = await createUser();
		const userId = user.id;

		const updateUser = await request(app)
			.put(`/api/users/${userId}`)
			.send({
				username: 'newUsername',
			});

		expect(updateUser.status).toBe(200);
		expect(updateUser.body).toHaveProperty('username', 'newUsername');
	});

	it('should delete a user', async () => {
		const user = await createUser();
		const deleteUserId = user.id;

		const deleteUser = await request(app)
			.delete(`/api/users/${deleteUserId}`);

		expect(deleteUser.status).toBe(204);
	});
});