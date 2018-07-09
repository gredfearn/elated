'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('roles', [
      {
        id: 1,
        name: 'Super Admin',
        description: 'A Super admin with access to all resources',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'General User',
        description: 'A generic user with access to a limited subset of resources',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('roles', null, {
      where: {
        id: [1, 2],
      },
    });
  },
};