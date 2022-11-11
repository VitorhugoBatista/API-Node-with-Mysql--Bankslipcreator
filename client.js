
const Sequelize = require('sequelize');
const sequelize = require('./db');



const Bankslip = sequelize.define('bankslip', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: true,
        primaryKey: true
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
    }
    
})

module.exports = Bankslip;