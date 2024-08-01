const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');


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

  User.beforeCreate(async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

	User.associate = (models) => {
    User.hasMany(models.Reminder, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
			as: 'reminders'
    });
    User.hasMany(models.Notification, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
			as: 'notifications'
    })
		User.hasOne(models.Profile, {
			foreignKey: 'user_id',
      onDelete: 'CASCADE',
			as: 'profile',
		});
	};

	return User;
};

module.exports = UserModel;