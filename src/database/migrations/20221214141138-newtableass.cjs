'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn("payments", "bankslip_Id", {
    type: Sequelize.UUID,
    references: { model: 'Bankslips', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
    allowNull:true
  }),

  down: (queryInterface) => queryInterface.removeColumn('payments', 'bankslip_Id')
};