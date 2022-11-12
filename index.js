var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mysql = require('mysql')
const SECRET = "DruidaFox";
const sequelize = require('./db');
var config = require('./config');
var routes = require('./routes')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
var myConnection = require('express-myconnection')
app.use('/', routes)

var dbOptions = {
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  port: config.database.port,
  database: config.database.db
}

app.use(myConnection(mysql, dbOptions, 'single'));

; (async () => {
  const database = require('./db');
  const Bankslip = require('./client');
  try {
    const resultado = await sequelize.sync();
    console.log("banco sincronizado");
  } catch (error) {
    console.log(error);
  }
})();

app.listen(3000, function () {
  console.log('Server running at port 3000: http://127.0.0.1:3000')
})