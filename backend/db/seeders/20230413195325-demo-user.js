'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Kevin',
        lastName: 'Wonderful',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Joey',
        lastName: 'Amazing',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Taylor',
        lastName: 'Beautiful',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Chantal',
        lastName: 'Gorgeous',
        email: 'chantal@gorgeous.com',
        username: 'ChantalGorgeous',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Kevin',
        lastName: 'Zaddy',
        email: 'kevin@zaddy.com',
        username: 'KevinZaddy',
        hashedPassword: bcrypt.hashSync('password5')
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'ChantalGorgeous', 'KevinZaddy'] }
    }, {});
  }
};
