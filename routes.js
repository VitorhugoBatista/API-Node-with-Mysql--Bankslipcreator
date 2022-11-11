var express = require('express');
var router = express.Router();
var isEmpty = require('lodash.isempty');
const sequelize = require('./db');
var config = require('./config');
var Bankslip = require('./client')


    router.get('/', (req, res) => {
        req.getConnection(function (err, connection) {
          if (err) return next(err);
          var id = req.body.id;
          var due_date = req.body.date;
        })
      });
      
      router.get('/rest/bankslips/:id', (req, res) => {
        if (req.body.user === 'vitorhugo' && req.body.password === '123') {
          //auth ok
          const id = req.params.id; //esse id viria do banco de dados
          const token = jwt.sign({ id }, SECRET, {
            expiresIn: 300 // expires in 5min
          });
          return res.json({ auth: true, token: token });
        }
      
        res.status(500).json({ message: 'Login inválido!' });
      });
      
      router.post('/rest/bankslips', async (req, res) => {  //Esse método deve receber um novo boleto e inseri-lo em um 
        var bankslip = req.body;
        bankslipValues = Object.values(bankslip);
        console.log(bankslipValues)
       for (const value of bankslipValues) {          
          if (value === ""){
          console.log(bankslip)
          return res.status(422).json('Invalid bankslip provided.The possible reasons are: A field of the provided bankslip was null or with invalid values')
       }}
      //  if(bankslipValues == "") {                                                       //
       //   console.log('Bankslip not provided in the request body');                   //
      //    return res.status(422).json('Invalid bankslip provided.The possible reasons are: A field of the provided bankslip was null or with invalid values')    //
     // }


        if(isEmpty(req.body)) {                                                       //
          console.log('Bankslip not provided in the request body');                   //
          return res.status(400).json('Bankslip not provided in the request body')    //
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
          });
      
        } catch (error) {
          if (error) {
            res.status(422).json('Invalid bankslip provided.The possible reasons are: A field of the provided bankslip was null or with invalid values')
          }
        }
      });


      module.exports = router;