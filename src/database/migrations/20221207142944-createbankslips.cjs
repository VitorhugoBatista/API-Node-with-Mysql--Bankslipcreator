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
      allowNull: false,
    },
    total_in_cents: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    customer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
},


down: (queryInterface) => {
  return queryInterface.dropTable('bankslips');
}
};