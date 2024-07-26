const { User, Profile } = require('../../models');
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

const createProfile = async (userId) => {
	const response = await request(app)
		.post('/api/profiles')
		.send({
			user_id: userId,
			avatar: 'avatar.png',
			first_name: 'Jane',
			last_name: 'Doe'
		});
	return response.body;
};

describe('Profile Controller', () => {
	beforeAll(async () => {
		await sequelize.sync();
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it('should create a profile', async () => {
		const user = await createUser();
		const userId = user.id;
		const profile = await createProfile(userId);

		expect(profile).toHaveProperty('id');
		expect(profile).toHaveProperty('user_id', userId);
	});

	it('should get a profile', async () => {
		const user = await createUser();
		const userId = user.id;
		const profile = await createProfile(userId);
		const profileId = profile.id;

		const getProfile = await request(app)
			.get(`/api/profiles/${profileId}`);

		expect(getProfile.status).toBe(200);
		expect(getProfile.body).toHaveProperty('id', profileId);
	});

	it('should update a profile', async () => {
		const user = await createUser();
		const userId = user.id;
		const profile = await createProfile(userId);
		const profileId = profile.id;

		const updateProfile = await request(app)
			.put(`/api/profiles/${profileId}`)
			.send({
				avatar: 'newAvatar.png',
			});

		expect(updateProfile.status).toBe(200);
		expect(updateProfile.body).toHaveProperty('avatar', 'newAvatar.png');
	});

	it('should delete a user and associated profile', async () => {
		const user = await createUser();
		const userId = user.id;

		const profile = await createProfile(userId);
		const profileId = profile.id;

		await request(app)
			.delete(`/api/users/${userId}`)
			.expect(204);

		const deletedUser = await User.findByPk(userId);
		expect(deletedUser).toBeNull();

		const deletedProfile = await Profile.findByPk(profileId);
		expect(deletedProfile).toBeNull();
	});
});