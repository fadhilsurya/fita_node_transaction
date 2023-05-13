'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sku: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false

      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,

      },
      inventory: {
        type: Sequelize.INTEGER,
        allowNull: false

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Items');
  }
};