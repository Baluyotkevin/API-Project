'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: 'here',
        city: 'me',
        state: 'yellow',
        country: 'everywhere',
        lat: 23.2,
        lng: 33.3,
        name: 'mynamew',
        description: 'allover',
        price: 333.23
      },
      {
        ownerId: 2,
        address: 'your heart baby',
        city: 'you tell me',
        state: 'wherever you want to go',
        country: 'next to your heart',
        lat: 0.1,
        lng: 0.12,
        name: "yes",
        description: 'beautiful',
        price: 2
      }
    ], {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2] }
    }, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};