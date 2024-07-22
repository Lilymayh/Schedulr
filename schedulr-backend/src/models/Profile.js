const { DataTypes } = require('sequelize');

const ProfileModel = (sequelize) => {
  return sequelize.define('Profile', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
      },
		},
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

module.exports = ProfileModel;