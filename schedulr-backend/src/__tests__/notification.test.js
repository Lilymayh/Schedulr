const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const Notification = require('../models/Notification')(sequelize, DataTypes);