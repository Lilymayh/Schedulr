const { User, sequelize } = require('../../models');


describe('User Model', () => {
	//Use async/await instead of .then()/.catch() to handle promises.
	beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

	it('should create a user with a valid username', async () => {
    const user = await User.create({
      username: 'user',
      email: 'test@email.com',
      password: 'password'
    });

		expect(user.username).toBe('user');
	});
	it('should create a user with a valid email', async () => {
    const user = await User.create({
      username: 'user',
      email: 'test@email.com',
      password: 'password'
    });

		expect(user.email).toBe('test@email.com');
	});
  it('should create a user with a valid password', async () => {
    const user = await User.create({
      username: 'user',
      email: 'test@email.com',
      password: 'password'
    });

		expect(user.password).toBe('password');
	});
})