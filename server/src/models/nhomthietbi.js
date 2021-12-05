'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nhomthietbi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Nhomthietbi.hasMany(models.Device, { foreignKey: 'id' });
    }

  };
  Nhomthietbi.init({
    Name: DataTypes.STRING,
    timetoida: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Nhomthietbi',
  });
  return Nhomthietbi;
};