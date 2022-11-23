var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const sequelize = require('./db');
var routes = require('./routes')
const database = require('./db');
const Bankslip = require('./Bankslip.js');


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', routes)




app.use(express.static(__dirname + '/public'));


; (async () => {
  
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