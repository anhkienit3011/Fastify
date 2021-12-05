'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DeviceMuon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DeviceMuon.belongsTo(models.Device)
    }
  };
  DeviceMuon.init({
    datetra: DataTypes.DATE,
    DeviceId: DataTypes.INTEGER,
    numberm: DataTypes.INTEGER,
    email: DataTypes.STRING,
    trangthai:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DeviceMuon',
  });
  return DeviceMuon;
};