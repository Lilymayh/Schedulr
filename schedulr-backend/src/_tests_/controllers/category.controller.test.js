const { User, Category, Reminder } = require('../../models');
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

const createCategory = async (userId, name) => {
	const response = await request(app)
		.post('/api/categories')
		.send({
			user_id: userId,
			name,
			emoji: '🍡'
		});
	return response.body;
};

describe('Category Controller', () => {
	let userId;
	let categoryId;
	let category;

	beforeAll(async () => {
		await sequelize.authenticate();
		await sequelize.sync();
	});

	afterAll(async () => {
		await sequelize.close();
	});

	//Create a user and category before each test
	beforeEach(async () => {
		const user = await createUser();
		userId = user.id;

		const categoryName = `testCategory_${Date.now()}`;
		const createdCategory = await createCategory(userId, categoryName);
		categoryId = createdCategory.id;
		category = createdCategory;
	});

	//Clean them up
	afterEach(async () => {
		await sequelize.truncate({ cascade: true });
	});


	it('should create a category', async () => {
		const categoryName = `testCategory_${Date.now()}`;
    const createdCategory = await createCategory(userId, categoryName);

		expect(createdCategory).toHaveProperty('id');
		expect(createdCategory).toHaveProperty('user_id', userId);
		expect(createdCategory).toHaveProperty('name', categoryName);
		expect(createdCategory).toHaveProperty('emoji', '🍡');
	});

	it('should get a category', async () => {
		const getCategory = await request(app)
			.get(`/api/categories/${categoryId}`);

		expect(getCategory.status).toBe(200);
		expect(getCategory.body).toHaveProperty('id', categoryId);
		expect(getCategory.body).toHaveProperty('name', category.name);
		expect(getCategory.body).toHaveProperty('emoji', '🍡');
	});

	it('should update a category', async () => {
		const updateCategory = await request(app)
			.put(`/api/categories/${categoryId}`)
			.send({
				name: 'updatedCategoryName',
				emoji: '🍣'
			});

		expect(updateCategory.status).toBe(200);
		expect(updateCategory.body).toHaveProperty('name', 'updatedCategoryName');
		expect(updateCategory.body).toHaveProperty('emoji', '🍣');
	});

	it('should delete a user and associated category', async () => {
		await request(app)
			.delete(`/api/users/${userId}`)
			.expect(204);

		const deletedUser = await User.findByPk(userId);
		expect(deletedUser).toBeNull();

		const deletedCategory = await Category.findByPk(categoryId);
		expect(deletedCategory).toBeNull();
	});
});