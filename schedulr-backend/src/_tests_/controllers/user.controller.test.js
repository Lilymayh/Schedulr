const request = require('supertest');
const app = require('../../../app');

const createUser = async () => {
	const response = await request(app)
		.post('/users')
		.send({
			username: 'user',
			email: 'test@email.com',
			password: 'password'
		});
	return response.body;
};

describe('User Controller', () => {
	let userId;

	it('should create a user', async () => {
		const user = await createUser();

		expect(user).toHaveProperty('id');
		userId = user.id;
	});

	it('should get a user', async () => {
		const getUser = await request(app)
			.get(`/users/${userId}`);

		expect(getUser.status).toBe(200);
		expect(getUser.body).toHaveProperty('username', 'user');
	});

	it('should update a user', async () => {
		const user = await createUser();
		const userId = user.id;

		const updateUser = await request(app)
			.put(`/users/${userId}`)
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
			.delete(`/users/${deleteUserId}`);

		expect(deleteUser.status).toBe(204);

		const verifyDelete = await request(app)
			.get(`/users/${deleteUserId}`);

		expect(verifyDelete.status).toBe(404);
	});
});