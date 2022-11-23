
const Sequelize = require('sequelize');

const sequelize = require('./db')

const User = sequelize.define('users', {
    id: {
        type: Sequelize.STRING,
        defaultValue: "1",
        primaryKey:true
    },
    email: {
        type: Sequelize.STRING,
        unique:true,
        isEmail:true,
        defaultValue: "vitorhugosjrp@gmail.com"
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "123"
    }
    

    
});
module.exports= User;

