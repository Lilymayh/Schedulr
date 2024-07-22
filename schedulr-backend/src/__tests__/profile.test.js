require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');

const ProfileModel = require('../models/profile');
const Profile = ProfileModel(sequelize, DataTypes);

describe('Profile Model', () => {
	//Use async/await instead of .then()/.catch() to handle promises.
	beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

	it('should create a profile with a valid integer user_id', async () => {
    const profile = await Profile.create({
      user_id: 1,
      avatar: 'https://example.com/avatar.jpg',
      first_name: 'John',
      last_name: 'Doe'
    });

		expect(profile.user_id).toBe(1);
	})
})