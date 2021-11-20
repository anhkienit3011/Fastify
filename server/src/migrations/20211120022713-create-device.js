'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Devices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      namedevice: {
        type: Sequelize.STRING
      },
      imgdevice: {
        type: Sequelize.STRING
      },
      quantitydevice: {
        type: Sequelize.INTEGER
      },
      soluongconlai: {
        type: Sequelize.INTEGER
      },
      tienthietbi: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Devices');
  }
};