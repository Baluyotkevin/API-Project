


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
        preview: false
      },
      {
        spotId: 1,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105299564363264091/hobbitfive.jpeg',
        preview: false

      },
      {spotId: 1,
        url: "https://cdn.discordapp.com/attachments/1096834476564295755/1105299564623306793/hobbitfour.jpeg",
        preview: false
      },
      {
        spotId: 1,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105299565025964082/hobbitsix.jpeg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105228012443680838/batmanhouse.jpeg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1106729203493244999/0e31841e783001ccde44c97ec70efdd2.png',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1106729202654384188/batmanfive.jpeg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1106729202956369920/batmanten.jpeg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1106729203187073107/1000.png',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105228012141686865/ashketchums.jpeg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1106741278504402994/kirbyhouse.png',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1106731049406443610/89920724e03853483dec310e8a89ca72.png',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1106731049691652156/ff0b191722feb3f3fce78e9349a36dd7.png',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1106731049981067264/902888db6291ebd1cf5def77f5f2aaf6.png',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105228614242402334/randomHouse.jpeg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1106731890980946020/randomhomefour.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1106731891870150787/randomhousetwo.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1106731892117602344/homealonehome.jpeg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1106732877783236719/b64d643a0b360164b156263b9af3989c.png',
        preview: false
      },
      {
        spotId: 3,
        url: "https://cdn.discordapp.com/attachments/1096834476564295755/1105228012691136562/jokershouse.jpeg",
        preview: true
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1106733460615344248/e2674eae65a74a9272b3dadeddaf09ef.png',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1106733460904755320/ff5fe8d53669d1973f32f4ca1dffaf48.png',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1106733461189955584/f2722bc1f7550c362ff0457cd2dc53ce.png',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1106733461546479717/e1967b8fd1b498659b9b3e9c43b6a0f2.png',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1106741899718561832/maxresdefault.png',
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
