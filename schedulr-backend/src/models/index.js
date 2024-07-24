const { Sequelize } = require('sequelize');
const sequelize = require('../../config/sequelize');

const UserModel = require('./user');
const ReminderModel = require('./reminder');
const ProfileModel = require('./profile');

// Initialize models
const User = UserModel(sequelize);
const Reminder = ReminderModel(sequelize);
const Profile = ProfileModel(sequelize);
const Notification = Notification(sequelize)

// Set up associations
User.associate({ Reminder, Profile, Notification });
Reminder.associate({ User });
Profile.associate({ User }); 
Notification.associate({ User })

module.exports = { User, Reminder, Profile, sequelize };