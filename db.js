const Sequelize = require('sequelize');
const database = require('./config');


const sequelize = new Sequelize('test', database.database.user, database.database.password, {dialect: 'mysql', host: database.database.host});
 
module.exports = sequelize;