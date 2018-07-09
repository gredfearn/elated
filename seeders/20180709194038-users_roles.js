'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users_roles', [
      {
        id: 1,
        user_id: 1,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        user_id: 2,
        role_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users_roles', null, {
      where: {
        id: [1, 2],
      },
    });
  },
};