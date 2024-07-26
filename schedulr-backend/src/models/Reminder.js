const { DataTypes } = require('sequelize');

const ReminderModel = (sequelize) => {
  const Reminder = sequelize.define('Reminder', {
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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reminder_time: {
      type: DataTypes.DATE,
      allowNull: false,
    }
	}, {
		timestamps: true
  });

  Reminder.associate = (models) => {
		Reminder.belongsTo(models.User, {
			foreignKey: 'user_id',
			as: 'user'
		});
    Reminder.hasMany(models.Notification, { 
      foreignKey: {
        name: 'reminder_id',
        onDelete: 'CASCADE'
      },
      as: 'notifications' 
    });
	};

	return Reminder;
}

module.exports = ReminderModel;