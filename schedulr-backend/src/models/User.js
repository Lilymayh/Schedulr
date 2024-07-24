const { DataTypes } = require('sequelize');

const UserModel = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
			validate: {
				isEmail: true
			},
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

	User.associate = (models) => {
    User.hasMany(models.Reminder, {
      foreignKey: 'user_id',
			as: 'reminders'
    });
		User.hasOne(models.Profile, {
			foreignKey: 'user_id',
			as: 'profile'
		});
	};

	return User;
};

module.exports = UserModel;