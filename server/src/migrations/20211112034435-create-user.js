'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
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
    
    return queryInterface.bulkInsert('Users', [{
      name: 'Thu heo heo',
      email: 'thuheoheo@gmail.com',
      password: await bcrypt.hash("12345678",saltRounds),
      avatar:'1640612798339.png',
      role:"Admin",
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};