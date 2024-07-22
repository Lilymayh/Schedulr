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
  });
};

module.exports = ProfileModel;