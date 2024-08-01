const { User, sequelize } = require('../../models');
const app = require('../../../app');
const request = require('supertest');
const bcrypt = require('bcryptjs');


const createUser = async () => {
	const response = await request(app)
		.post('/api/users')
		.send({
			username: 'user',
			email: 'test@email.com',
			password: 'password'
		});
    console.log('Response Body:', response.body);
	return response.body;
};

describe('User Model', () => {
	beforeAll(async () => {
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

	it('should create a user with a valid username', async () => {
    const user = await createUser();

    expect(user).toHaveProperty('username', 'user');
	});

	it('should create a user with a valid email', async () => {
    const user = await createUser();

		expect(user.email).toBe('test@email.com');
	});

  it('should create a user with a valid password', async () => {
    const user = await createUser();
    const userId = user.id;
		const findUser = await User.findByPk(userId);
		console.log('Hashed Password in DB:', findUser.password);

		expect(findUser).toHaveProperty('password');
		expect(findUser.password).not.toBe('password');

    const isPasswordCorrect = await bcrypt.compare('password', findUser.password);
    console.log('Password Match Result:', isPasswordCorrect);

    expect(isPasswordCorrect).toBe(true);
	});
})