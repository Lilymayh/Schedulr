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
  let user;
  
	beforeAll(async () => {
    await sequelize.sync();
  });


	beforeEach(async () => {
		user = await createUser();
  });

  afterAll(async () => {
    await sequelize.close();
  });

	it('should create a user with a valid username', async () => {
    expect(user).toHaveProperty('username', 'user');
	});

	it('should create a user with a valid email', async () => {
		expect(user.email).toBe('test@email.com');
	});

  it('should create a user with a valid password', async () => {
		const findUser = await User.findByPk(user.id);

		expect(findUser).toHaveProperty('password');
		expect(findUser.password).not.toBe('password');

    const isPasswordCorrect = await bcrypt.compare('password', findUser.password);

    expect(isPasswordCorrect).toBe(true);
	});
})