'use strict';


module.exports = {

  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('payments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      payment_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('payments');
  }
};
