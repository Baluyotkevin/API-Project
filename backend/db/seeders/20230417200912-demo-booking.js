'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        startDate: new Date('2022-01-17'),
        endDate: new Date('2023-01-17')
      },
      {
        spotId: 4,
        userId: 1,
        startDate: new Date('2015-08-01'),
        endDate: new Date('2016-01-01')
      },
      {
        spotId: 1,
        userId: 3,
        startDate: new Date('2020-08-01'),
        endDate: new Date('2021-01-01')
      },
      {
        spotId: 3,
        userId: 2,
        startDate: new Date('1993-01-01'),
        endDate: new Date('2023-01-02')
      },
      {
        spotId: 4,
        userId: 1,
        startDate: new Date('2000-10-10'),
        endDate: new Date('2001-01-01')
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
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2] }
    }, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
