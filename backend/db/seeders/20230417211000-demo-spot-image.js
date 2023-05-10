


'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105225824984109157/Hobbit.jpeg',
        preview: true,
      },
      {
        spotId: 1,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105225825210609794/hobbitthree.jpeg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105299564363264091/hobbitfive.jpeg',
        preview: true

      },
      {spotId: 1,
        url: "https://cdn.discordapp.com/attachments/1096834476564295755/1105299564623306793/hobbitfour.jpeg",
        preview: true
      },
      {
        spotId: 1,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105299565025964082/hobbitsix.jpeg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105228012443680838/batmanhouse.jpeg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105228614242402334/randomHouse.jpeg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105228012141686865/ashketchums.jpeg',
        preview: true
      },
      {
        spotId: 5,
        url: "https://cdn.discordapp.com/attachments/1096834476564295755/1105228012691136562/jokershouse.jpeg",
        preview: true
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
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
