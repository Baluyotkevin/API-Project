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
        address: '1215 Hobbit Street',
        city: 'Hobbity-city',
        state: 'Hobbit',
        country: 'Middle-earth',
        lat: 23.2,
        lng: 33.3,
        name: 'Hobbit-house',
        description: 'One and only hobbit house to stay at!',
        price: 99999.99
      },
      {
        ownerId: 2,
        address: 'Somewhere in Gotham',
        city: 'Gotham City',
        state: 'Some state',
        country: 'Some country',
        lat: 0.1,
        lng: 0.12,
        name: "Batman's House",
        description: "You get to see all of his stuff and ride his batmobile",
        price: 2
      },
      {
        ownerId: 3,
        address: 'wherever you want it to be',
        city: 'Pallet Town',
        state: 'Somewhere',
        country: 'Kanto',
        lat: 23.2,
        lng: 33.3,
        name: "Ash Ketchum's house",
        description: "You not only get to stay in Ash Ketchum's house, but you also get to hang out with Pikachu",
        price: 999.99
      },
      {
        ownerId: 4,
        address: '23213 pasdw st.',
        city: 'Carson',
        state: 'CA',
        country: 'North America',
        lat: 0.1,
        lng: 0.12,
        name: "yes",
        description: 'This is a beautiful home that you will enjoy. I promise',
        price: 5923
      },
      {
        ownerId: 5,
        address: 'Kirbys home',
        city: 'Kirbys city',
        state: 'Kirbys state',
        country: 'Kirbys country',
        lat: 0.1,
        lng: 0.12,
        name: "Kirby's home",
        description: 'You get to see what Kirby does on a daily basis.',
        price: 5923
      },
      {
        ownerId: 3,
        address: '20234',
        city: 'BEST CITY',
        state: 'BEST STATE',
        country: 'BEST COUNTRY',
        lat: 0.1,
        lng: 0.12,
        name: "My homeeee",
        description: 'MANSION HELLO!?',
        price: 5923
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
      ownerId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
