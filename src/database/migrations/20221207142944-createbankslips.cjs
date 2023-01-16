'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('bankslips', {
    id: {
      type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: false,
    },
    due_date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    total_in_cents: {
      type: Sequelize.BIGINT,
      allowNull: false,
    },
    customer: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
},


down: (queryInterface) => {
  return queryInterface.dropTable('bankslips');
}
};