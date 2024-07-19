const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const Profile = require('../models/profile')(sequelize, DataTypes);

