'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tableChat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tableChat.init({
    idRowUserChat : DataTypes.INTEGER,
    textChat: DataTypes.STRING,
    image: DataTypes.STRING,
    idUserChat: DataTypes.INTEGER,
  
  }, {
    sequelize,
    modelName: 'tableChat',
  });
  return tableChat;
};