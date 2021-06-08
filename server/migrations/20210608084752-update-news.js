'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('News', 'isModerate', {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        }),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn('News', 'isModerate')]);
  },
};
