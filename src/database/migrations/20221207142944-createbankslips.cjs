'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('bankslips', {
    id: {
      type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
    },
    due_date: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    total_in_cents: {
      type: Sequelize.BIGINT,
      allowNull: true,
    },
    customer: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
},


down: (queryInterface) => {
  return queryInterface.dropTable('bankslips');
}
};