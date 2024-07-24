const { DataTypes } = require('sequelize');

const ProfileModel = (sequelize) => {
  const Profile = sequelize.define('Profile', {
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

  Profile.associate = (models) => {
		Profile.belongsTo(models.User, {
			foreignKey: 'user_id',
			as: 'user'
		});
	};

	return Profile;
}

module.exports = ProfileModel;