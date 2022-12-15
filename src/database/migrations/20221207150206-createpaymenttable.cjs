'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('payments', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      payment_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('payments');
  }
};
