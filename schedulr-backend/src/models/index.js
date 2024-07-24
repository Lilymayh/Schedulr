const { Sequelize } = require('sequelize');
const sequelize = require('../../config/sequelize');

const UserModel = require('./user');
const ReminderModel = require('./reminder');
const ProfileModel = require('./profile');
const NotificationModel = require('./notification');

// Initialize models
const User = UserModel(sequelize);
const Reminder = ReminderModel(sequelize);
const Profile = ProfileModel(sequelize);
const Notification = NotificationModel(sequelize)

// Set up associations
User.associate({ Reminder, Profile, Notification });
Reminder.associate({ User, Notification });
Profile.associate({ User }); 
Notification.associate({ User, Reminder })

module.exports = { User, Reminder, Profile, Notification, sequelize };