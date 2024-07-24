require('dotenv').config();
const { User, Reminder, sequelize } = require('../../models');

describe('Reminder Model', () => {
  //Use async/await instead of .then()/.catch() to handle promises.
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a reminder belonging to a user', async () => {
    const user = await User.create({
      username: 'user',
      email: 'test@email.com',
      password: 'password'
    });

    const reminder = await Reminder.create({
      user_id: user.id,
      title: 'Reminder Title',
      description: 'Reminder Description',
      reminder_time: new Date()
    });

    const fetchedReminder = await Reminder.findByPk(reminder.id, {
      include: { model: User, as: 'user' }
    });

    expect(fetchedReminder.user_id).toBe(user.id);
    expect(fetchedReminder.user.username).toBe('user');
  });
  it('should create a reminder with a valid title', async () => {
    const user = await User.create({
      username: 'user',
      email: 'test@email.com',
      password: 'password'
    });

    const reminder = await Reminder.create({
      user_id: user.id,
      title: 'Reminder Title',
      description: 'Reminder Description',
      reminder_time: new Date()
    });

    expect(reminder.title).toBe('Reminder Title');
  });
  it('should create a reminder with a valid description', async () => {
    const user = await User.create({
      username: 'user',
      email: 'test@email.com',
      password: 'password'
    });

    const reminder = await Reminder.create({
      user_id: user.id,
      title: 'Reminder Title',
      description: 'Reminder Description',
      reminder_time: new Date()
    });

    expect(reminder.description).toBe('Reminder Description');
  });
  it('should create a reminder with a valid reminder time', async () => {
    const user = await User.create({
      username: 'user',
      email: 'test@email.com',
      password: 'password'
    });

    const reminder = await Reminder.create({
      user_id: user.id,
      title: 'Reminder Title',
      description: 'Reminder Description',
      reminder_time: new Date('2024-07-24T10:00:00Z')
    });

    expect(reminder.reminder_time.toISOString()).toBe('2024-07-24T10:00:00.000Z');
  });
});