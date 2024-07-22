require('dotenv').config(); 
const { Sequelize } = require('sequelize');

const databaseUrl = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

const sequelize = new Sequelize(databaseUrl, {
  dialect: process.env.DB_DIALECT,
  logging: false,
});

module.exports = sequelize;