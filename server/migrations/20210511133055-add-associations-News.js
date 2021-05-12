'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.define('News', {
      comments: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        references: {
          model: 'Comments',
          key: 'id',
        },
        allowNull: false,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.define('News', {
      comments: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      UserId: {
        type: Sequelize.INTEGER,
      },
    });
  },
};
