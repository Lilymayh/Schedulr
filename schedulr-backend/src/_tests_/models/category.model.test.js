const { User, Reminder, Category, sequelize } = require('../../models');
const request = require('supertest');
const app = require('../../../app'); 

let userId;

//Declare once to use in both tests
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

const createCategory = async (userId, name, emoji = null) => {
  const response = await request(app)
    .post('/api/categories')
    .send({
      user_id: userId,
      name,
      emoji
    });
  return response.body;
};

const createReminder = async (userId, categoryId, title, description) => {
  return Reminder.create({
    user_id: userId,
    title,
    description,
    reminder_time: new Date(),
    category_id: categoryId
  });
};

describe('Category Model', () => {
  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    const user = await createUser();
    userId = user.id;
  });

  afterEach(async () => {
    await sequelize.truncate({ cascade: true });
  });


  it('should create a category with one or more reminders', async () => {
    const category = await createCategory(userId, 'baking', '🍰');

    //Create Reminders and associate them with a category
    await createReminder(userId, category.id, 'Title1', 'Description1');
    await createReminder(userId, category.id, 'Title2', 'Description2');

    const fetchedCategory = await Category.findByPk(category.id, {
      include: { model: Reminder, as: 'reminders' }
    });

    expect(fetchedCategory).not.toBeNull();
    expect(fetchedCategory.reminders.length).toBe(2);
    expect(fetchedCategory.reminders[0].description).toBe('Description1');
    expect(fetchedCategory.reminders[1].title).toBe('Title2');
  });

  it('should create a category with or without emoji(s)', async () => {
    const category1 = await createCategory(userId, 'Berry picking', '🍓🍒🎂');
    const category2 = await createCategory(userId, 'work', null);

    expect(category1.emoji).toBe('🍓🍒🎂');
    expect(category2.emoji).toBeNull();
  });
});