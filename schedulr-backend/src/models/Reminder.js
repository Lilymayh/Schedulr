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
      references: {
        model: 'users',
        key: 'id'
      }
		},
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'id'
      }
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
    tableName: 'reminders',
		timestamps: true
  });

  Reminder.associate = (models) => {
		Reminder.belongsTo(models.User, {
			foreignKey: 'user_id',
			as: 'users'
		});
    Reminder.hasMany(models.Notification, { 
      foreignKey: 'reminder_id',
      onDelete: 'CASCADE',
      as: 'notifications' 
    });
    Reminder.belongsTo(models.Category, {
			foreignKey: 'category_id',
			as: 'categories'
		});
	};

	return Reminder;
}

module.exports = ReminderModel;