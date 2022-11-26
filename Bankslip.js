const { response } = require('express');
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

const create = async (

) => await Bankslip.create({
    due_date: due_date,
    total_in_cents: total_in_cents,
    customer: customer,
    status: "PENDING"
});


async function payments(payment_date, id) {
    try {
        const bankslip = await Bankslip.findOne({
            where: {
                id: id
            }
        })
        bankslip.status = "PAID"
        bankslip.save()
        console.log(" the status of payment was change to PAID")

    } catch (error) {
        if (error) {
            console.log(error)
        }
    }
}

const cancelBanklsip = async (id) => {

    const bankslip = await Bankslip.findOne({
        where: {
            id: id
        }
    })
    bankslip.status = "CANCELED"
    await bankslip.save()
    console.log(" the status of payment was change to CANCELED")

}









module.exports = { Bankslip, create, payments, cancelBanklsip };