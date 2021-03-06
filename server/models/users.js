'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.News);
      User.hasOne(models.Comments);
      User.belongsTo(models.Roles);
      // define association here
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      confirmationCode: DataTypes.STRING,
      isConfirmed: DataTypes.BOOLEAN,
      isBlocked: DataTypes.BOOLEAN,
      avatar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Users',
    },
  );
  return User;
};
