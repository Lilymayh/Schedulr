const { User, Profile, sequelize } = require('../../models');


describe('Profile Model', () => {
  //Use async/await instead of .then()/.catch() to handle promises.
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a profile belonging to a user', async () => {
    const user = await User.create({
      username: 'user',
      email: 'test@email.com',
      password: 'password'
    });

    const profile = await Profile.create({
      user_id: user.id,
      avatar: 'avatar.jpg',
      first_name: 'Jane',
      last_name: 'Doe'
    });

    const fetchedProfile = await Profile.findByPk(profile.id, {
      include: { model: User, as: 'user' }
    });

    expect(fetchedProfile.user_id).toBe(user.id);
    expect(fetchedProfile.user.username).toBe('user');
  });

  it('should create a profile with a valid avatar', async () => {
    const user = await User.create({
      username: 'user',
      email: 'test@email.com',
      password: 'password'
    });

    const profile = await Profile.create({
      user_id: user.id,
      avatar: 'avatar.jpg',
      first_name: 'Jane',
      last_name: 'Doe'
    });

    expect(profile.avatar).toBe('avatar.jpg');
  });

  it('should create a profile with a valid first and last name', async () => {
    const user = await User.create({
      username: 'user',
      email: 'test@email.com',
      password: 'password'
    });

    const profile = await Profile.create({
      user_id: user.id,
      avatar: 'avatar.jpg',
      first_name: 'Jane',
      last_name: 'Doe'
    });

    expect(profile.first_name).toBe('Jane');
    expect(profile.last_name).toBe('Doe');
  });
});