'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        id: 1,
        first_name: 'Super',
        last_name: 'Admin',
        email: 'admin@test.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        first_name: 'General',
        last_name: 'User',
        email: 'user@test.com',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {
      where: {
        id: [1, 2],
      },
    });
  },
};