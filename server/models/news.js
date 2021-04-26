'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      News.belongsTo(models.Users);
      News.hasMany(models.Comments);
      // define association here
    }
  }
  News.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      image: DataTypes.STRING,
      like: DataTypes.ARRAY(DataTypes.INTEGER),
      dislike: DataTypes.ARRAY(DataTypes.INTEGER),
      comments: DataTypes.ARRAY(DataTypes.INTEGER),
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'News',
    },
  );

  // News.associate = (models) => {
  //   News.belongsTo(models.Users);
  //   News.hasMany(models.Comments);
  // };

  return News;
};
