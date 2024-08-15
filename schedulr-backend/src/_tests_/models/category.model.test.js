const { User, Reminder, Category, sequelize } = require('../../models');


describe('Category Model', () => {
	beforeAll(async () => {
		await sequelize.authenticate();
    await sequelize.sync({ force: true });
	});

	afterAll(async () => {
		await sequelize.close();
	});
  
  it('should create a category with one or more reminders', async () => {

    const user = await User.create({
      username: 'user',
      email: 'test@email.com',
      password: 'password'
    });

    const category = await Category.create({
      name: 'baking',
      emoji: '🍰',
    });
    //Create Reminders and associate them with a category
    const reminder1 = await Reminder.create({
      user_id: user.id,
      title: 'Title1',
      description: 'Description1',
      reminder_time: new Date(),
      category_id: category.id 
    });
    
    const reminder2 = await Reminder.create({
      user_id: user.id,
      title: 'Title2',
      description: 'Description2',
      reminder_time: new Date(),
      category_id: category.id 
    });

    const fetchedCategory = await Category.findByPk(category.id, {
      include: { model: Reminder, as: 'reminders' }
    });
  
    expect(fetchedCategory).not.toBeNull();
    expect(fetchedCategory.reminders[0].description).toBe('Description1');
    expect(fetchedCategory.reminders[1].title).toBe('Title2');
  });

  it('should create a category with or without emoji(s)', async () => {
    const category1 = await Category.create({
      name: 'Berry picking',
      emoji: '🍓🍒🎂',
    });

    const category2 = await Category.create({
      name: 'work',
      emoji: null,
    });

    expect(category1.emoji).toBe('🍓🍒🎂');
	expect(category2.emoji).toBeNull();
  });
});