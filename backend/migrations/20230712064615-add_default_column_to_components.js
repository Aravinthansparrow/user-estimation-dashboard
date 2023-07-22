'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('components', 'default', {
      type: Sequelize.ENUM('default', 'not default'),
      defaultValue: 'not default',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('components', 'default');
  },
};
