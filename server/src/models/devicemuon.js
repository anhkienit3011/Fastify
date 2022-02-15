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
    //  models.Device.belongsToMany(models.User,{through: "DeviceMuon"})
     // models.User.belongsToMany(models.Device, {through: "DeviceMuon"})
       DeviceMuon.belongsTo(models.Device)
       DeviceMuon.belongsTo(models.User)
      //  DeviceMuon.hasMany(models.Nhomthietbi)

    }
  };
  DeviceMuon.init({
    datetra: DataTypes.DATE,
    DeviceId: DataTypes.INTEGER,
    numberm: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    trangthai:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DeviceMuon',
  });
  return DeviceMuon;
};