'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
  return queryInterface.createTable('bankslips', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
      primaryKey: true,
      autoIncrement:true,
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    total_in_cents: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    customer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
},


down: (queryInterface) => {
  return queryInterface.dropTable('bankslips');
}
};