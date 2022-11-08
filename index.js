var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mysql = require('mysql')

/**
 * This middleware provides a consistent API 
 * for MySQL connections during request/response life cycle
 */ 
var myConnection  = require('express-myconnection')
/**
 * Store database credentials in a separate config.js file
 * Load the file/module and its values
 */ 
var config = require('./config')
var dbOptions = {
    host:     config.database.host,
    user:     config.database.user,
    password: config.database.password,
    port:     config.database.port, 
    database: config.database.db
}
/**
 * 3 strategies can be used
 * single: Creates single database connection which is never closed.
 * pool: Creates pool of connections. Connection is auto release when response ends.
 * request: Creates new connection per new request. Connection is auto close when response ends.
 */ 
app.use(myConnection(mysql, dbOptions, 'request'))







app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/rest/bankslips/:id', (req, res) => {

res.json({
  "id":"c2dbd236-3fa5-4ccc-9c12-bd0ae1d6dd89",
  "due_date":"2018-05-10",
  "payment_date":"2018-05-13",
  "total_in_cents":"99000",
  "customer":"Ford Prefect Company",
  "fine":"1485",
  "status":"PAID"
 })



})





app.listen(3000, function(){
    console.log('Server running at port 3000: http://127.0.0.1:3000')
})