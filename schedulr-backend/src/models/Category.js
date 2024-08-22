const { DataTypes } = require('sequelize');

const CategoryModel = (sequelize) => {
	const Category = sequelize.define('Category', {
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
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		emoji: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		 tableName: 'categories',
		 timestamps: true
	 });

	Category.associate = (models) => {
		Category.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
		Category.hasMany(models.Reminder, {
			foreignKey: 'category_id',
			as: 'reminders'
		});
	};

	return Category;
};

module.exports = CategoryModel;