'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tableIdUserIdChat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tableIdUserIdChat.init({
    idUser:DataTypes.INTEGER,
    idUserChat: DataTypes.INTEGER,
  },
     {
    sequelize,
    modelName: 'tableIdUserIdChat',
  });
  return tableIdUserIdChat;
};