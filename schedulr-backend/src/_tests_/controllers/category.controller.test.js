const { User, Category } = require('../../models');
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

const createCategory = async (userId) => {
	const response = await request(app)
		.post('/api/categories')
		.send({
			user_id: userId,
			name: 'testCategory',
			emoji: '🍡'
		});
	return response.body;
};

describe('Category Controller', () => {
	beforeAll(async () => {
		await sequelize.authenticate();
    await sequelize.sync();
	});

	afterAll(async () => {
		await sequelize.close();
	});

	it('should create a category', async () => {
		const user = await createUser();
		const userId = user.id;
		const category = await createCategory(userId);

		expect(category).toHaveProperty('id');
		expect(category).toHaveProperty('user_id', userId);
		expect(category).toHaveProperty('name', 'testCategory');
		expect(category).toHaveProperty('emoji', '🍡');
	});

	it('should get a category', async () => {
		const user = await createUser();
		const userId = user.id;
		const category = await createCategory(userId);
		const categoryId = category.id;

		const getCategory = await request(app)
			.get(`/api/categories/${categoryId}`);

		expect(getCategory.status).toBe(200);
		expect(getCategory.body).toHaveProperty('id', categoryId);
		expect(getCategory.body).toHaveProperty('name', 'testCategory');
		expect(getCategory.body).toHaveProperty('emoji', '🍡');
	});

	it('should update a category', async () => {
		const user = await createUser();
		const userId = user.id;
		const category = await createCategory(userId);
		const categoryId = category.id;

		const updateCategory = await request(app)
			.put(`/api/categories/${categoryId}`)
			.send({
				name: 'newCategoryName',
				emoji: '🍣'
			});

		expect(updateCategory.status).toBe(200);
		expect(updateCategory.body).toHaveProperty('name', 'newCategoryName');
		expect(updateCategory.body).toHaveProperty('emoji', '🍣');
	});

	it('should delete a user and associated category', async () => {
		const user = await createUser();
		const userId = user.id;

		const category = await createCategory(userId);
		const categoryId = category.id;

		await request(app)
			.delete(`/api/users/${userId}`)
			.expect(204);

		const deletedUser = await User.findByPk(userId);
		expect(deletedUser).toBeNull();

		const deletedCategory = await Category.findByPk(categoryId);
		expect(deletedCategory).toBeNull();
	});
});