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
      references: {
        model: 'users',
        key: 'id'
      }
		},
    reminder_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'reminders',
        key: 'id'
      }
		},
    notification_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
		status: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
     tableName: 'notifications', 
     timestamps: true
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