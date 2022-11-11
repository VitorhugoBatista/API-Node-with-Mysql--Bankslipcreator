var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mysql = require('mysql')
const jwt = require('jsonwebtoken');
const SECRET = "DruidaFox";
const sequelize = require('./db');
const Bankslip = require('./client');
var isEmpty = require('lodash.isempty');


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
/**
 * This middleware provides a consistent API 
 * for MySQL connections during request/response life cycle
 */
var myConnection = require('express-myconnection')
/**
 * Store database credentials in a separate config.js file
 * Load the file/module and its values
 */
var config = require('./config')
var dbOptions = {
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  port: config.database.port,
  database: config.database.db
}
/**
 * 3 strategies can be used
 * single: Creates single database connection which is never closed.
 * pool: Creates pool of connections. Connection is auto release when response ends.
 * request: Creates new connection per new request. Connection is auto close when response ends.
 */
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

app.get('/', (req, res) => {
  req.getConnection(function (err, connection) {
    if (err) return next(err);
    var id = req.body.id;
    var due_date = req.body.date;
  })
})

app.get('/rest/bankslips/:id', (req, res) => {
  if (req.body.user === 'vitorhugo' && req.body.password === '123') {
    //auth ok
    const id = req.params.id; //esse id viria do banco de dados
    const token = jwt.sign({ id }, SECRET, {
      expiresIn: 300 // expires in 5min
    });
    return res.json({ auth: true, token: token });
  }

  res.status(500).json({ message: 'Login inválido!' });
})

app.post('/rest/bankslips', async (req, res) => {  //Esse método deve receber um novo boleto e inseri-lo em um 
  var bankslip = req.body;
  if(isEmpty(req.body)) {
    console.log('Bankslip not provided in the request body');
    return res.status(400).json('Bankslip not provided in the request body')
}

  try {
    const createBankslip = await Bankslip.create({       ///banco de dados para ser consumido pela própria API. Todos os campos são obrigatórios.
      due_date: bankslip.due_date,
      total_in_cents: bankslip.total_in_cents,
      customer: bankslip.customer,
      status: "PENDING"
    });

    res.status(200).json({
      'id': createBankslip.id,
      'due_date': createBankslip.due_date,
      'total_in_cents': createBankslip.total_in_cents,
      'customer': createBankslip.customer,
      'status': createBankslip.status,
    })

  } catch (error) {
    if (error) {
      res.status(422).json('Invalid bankslip provided.The possible reasons are: A field of the provided bankslip was null or with invalid values')
    }
  }
})





app.listen(3000, function () {
  console.log('Server running at port 3000: http://127.0.0.1:3000')
})