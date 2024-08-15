const { sequelize } = require('../../config/sequelize');

const UserModel = require('./User');
const ReminderModel = require('./Reminder');
const ProfileModel = require('./Profile');
const NotificationModel = require('./Notification');
const CategoryModel = require('./Category');

// Initialize models
const User = UserModel(sequelize);
const Reminder = ReminderModel(sequelize);
const Profile = ProfileModel(sequelize);
const Notification = NotificationModel(sequelize);
const Category = CategoryModel(sequelize);

// Set up associations
User.associate({ Reminder, Profile, Notification });
Reminder.associate({ User, Notification, Category });
Profile.associate({ User }); 
Notification.associate({ User, Reminder });
Category.associate({ Reminder });


module.exports = { sequelize, User, Reminder, Profile, Notification, Category };