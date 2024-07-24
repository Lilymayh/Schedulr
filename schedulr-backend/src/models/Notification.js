const { DataTypes } = require('sequelize');

const NotificationModel = (sequelize) => {
  const Notification = sequelize.define('Notification', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
      },
		},
    reminder_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
      },
		},
    notification_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
		status: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Notification.associate = (models) => {
		Notification.belongsTo(models.User, {
			foreignKey: 'user_id',
			as: 'user'
		});
		Notification.belongsTo(models.Reminder, {
			foreignKey: 'reminder_id',
			as: 'reminder'
		});
	};

	return Notification;
}

module.exports = NotificationModel;