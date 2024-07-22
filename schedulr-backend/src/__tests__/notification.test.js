require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');

const NotificationModel = require('../models/profile');
const Notification = NotificationModel(sequelize, DataTypes);

describe('Notification Model', () => {
	//Use async/await instead of .then()/.catch() to handle promises.
	beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

	it('should create a notification with valid fields', async () => {
    const notification = await Notification.create({
      user_id: 1,
      reminder_id: 1,
      notification_time: new Date(),
      status: 'completed'
    });

    expect(notification.user_id).toBe(1);
    expect(notification.reminder_id).toBe(1);
    expect(notification.status).toBe('completed');
  }),

	it('should have default status as "pending"', async () => {
    const notification = await Notification.create({
      user_id: 1,
      reminder_id: 1,
      notification_time: new Date()
    });

    expect(notification.status).toBe('pending');
  });
})