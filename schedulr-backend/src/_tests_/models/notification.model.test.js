require('dotenv').config();
const { User, Notification, Reminder, sequelize } = require('../../models');


describe('Notification Model', () => {
  //Use async/await instead of .then()/.catch() to handle promises.
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a notification belonging to a user', async () => {
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

    const notification = await Notification.create({
      user_id: user.id,
      reminder_id: reminder.id,
			notification_time: new Date(),
			status: 'pending'
    });

    const fetchedNotification = await Notification.findByPk(notification.id, {
      include: { model: User, as: 'user' }
    });

    expect(fetchedNotification.user_id).toBe(user.id);
    expect(fetchedNotification.user.username).toBe('user');
  });

  it('should create a notification belonging to a reminder', async () => {
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

    const notification = await Notification.create({
      user_id: user.id,
      reminder_id: reminder.id,
			notification_time: new Date(),
			status: 'pending'
    });

    const fetchedNotification = await Notification.findByPk(notification.id, {
      include: { model: Reminder, as: 'reminder' }
    });

    expect(fetchedNotification.reminder_id).toBe(reminder.id);
		expect(fetchedNotification.reminder.title).toBe('Reminder Title');
  });

  it('should create a notification with a valid time', async () => {
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

		const notificationTime = new Date('2024-07-24T10:00:00Z');

    const notification = await Notification.create({
      user_id: user.id,
      reminder_id: reminder.id,
			notification_time: notificationTime,
			status: 'pending'
    });

    expect(notification.notification_time.toISOString()).toBe(notificationTime.toISOString());
  });
});