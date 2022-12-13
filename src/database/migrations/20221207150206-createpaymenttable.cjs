'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('payments', {
      id: {
        type: DataTypes.UUID,
        allowNull: true
      },
      payment_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      bankslipId: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('payments');
  }
};
