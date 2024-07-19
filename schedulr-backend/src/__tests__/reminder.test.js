const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const Reminder = require('../models/reminder')(sequelize, DataTypes);