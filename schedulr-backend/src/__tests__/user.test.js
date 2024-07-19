const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const User = require('../models/user')(sequelize, DataTypes);