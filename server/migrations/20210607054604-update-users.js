'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('Users', 'RoleId', {
          type: Sequelize.INTEGER,
          defaultValue: 1,
        }),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn('Users', 'RoleId')]);
  },
};
