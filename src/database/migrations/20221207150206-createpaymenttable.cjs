'use strict';


module.exports = {

  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('payments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: false,
        autoIncrement:true
      },
      payment_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('payments');
  }
};
