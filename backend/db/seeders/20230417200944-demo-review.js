'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        review: 'was an exceptional guest who showed greo host them again.',
        stars: 5,
      },
      {
        spotId: 4,
        userId: 1,
        review: 'They were pwould gladly host them again.',
        stars: 5
      },
      {
        spotId: 1,
        userId: 3,
        review: 'It was our pleasure to host for a couple of days while they enjoyed the highlights of southern. We found .',
        stars: 4
      },
      {
        spotId: 3,
        userId: 2,
        review: 'and their companion were fantastic guestswould gladly host them again and highly recommend them to other hosts.',
        stars: 5
      },
      {
        spotId: 2,
        userId: 1,
        review: 'This was really nice! They were quiet, respectful of the property and communicated really well about .',
        stars: 4
      },
      {
        spotId: 2,
        userId: 3,
        review: 'WOW were absolutely perfect guests to host!! ',
        stars: 5
      },
      {
        spotId: 1,
        userId: 4,
        review: 'LKJASBDKAJHSDJKASKJDHASKLDJHASLKDJHnL KASNDL',
        stars: 3
      },
      {
        spotId: 3,
        userId: 4,
        review: 'WOW IT WAS A PLEASURE BEING IN THIS HOSUE I LOVE OH MY GOOODNESS WOOW I JUST CANT NOT EVEN IMAGINE STYAING ANYWHERE ELSE I HAD THE BEST TIME EVEEEEEEEEAR',
        stars: 5
      },
      {
       spotId: 4,
       userId: 2,
       review: "Thank for your review, were so glad to hear that you enjoyed your stay and found our staff helpful. Its always great when we can help guests.",
       stars: 4
      },
      {
        spotId: 2,
        userId: 4,
        review: "Wonderful place to stay. I dont normally stay in hostels but this was perfect  the beds are comfortable, and the rooms are quiet despite the fact that if you want to.",
        stars: 5
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
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5]}
    }, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
