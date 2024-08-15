const { DataTypes } = require('sequelize');

const CategoryModel = (sequelize) => {
	const Category = sequelize.define('Category', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		emoji: {
			type: DataTypes.STRING,
			allowNull: true
		},
		tableName: 'categories',
	});

	Category.associate = (models) => {
		Category.hasMany(models.Reminder, {
			foreignKey: 'category_id',
			as: 'reminders'
		});
	};

	return Category;
};

module.exports = CategoryModel;