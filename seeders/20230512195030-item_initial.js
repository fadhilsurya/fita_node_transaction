'use strict';
const { Item } = require('../models/index')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const check = await Item.findAll()

    if (check.length != 0) {
      return
    }

    const data = await Item.bulkCreate([
      {
        sku: '120P90',
        name: 'google home',
        price: 49.99,
        inventory: 10
      },
      {
        sku: '43N23P',
        name: 'macbook pro',
        price: 5399.99,
        inventory: 5
      },
      {
        sku: 'A304SD',
        name: 'alexa speaker',
        price: 109.50,
        inventory: 10
      },
      {
        sku: '234234',
        name: 'Rasberry Pi B',
        price: 30,
        inventory: 2
      }
    ])

    return data

  },

  async down(queryInterface, Sequelize) {


    await Item.destroy({
      where: {}
    })

    return
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
