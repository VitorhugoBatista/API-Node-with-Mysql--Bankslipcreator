var express = require('express');
var router = express.Router();
var isEmpty = require('lodash.isempty');
const { create } = require('./Bankslip');
const jwt = require('jsonwebtoken');
const SECRET = "DruidaFox";

router.get('/', (req, res) => {
  req.getConnection(function (err, connection) {
    if (err) return next(err);
    var id = req.body.id;
    var due_date = req.body.date;
  })
});

router.get('/rest/bankslips/:id', (req, res) => {
  if (req.body.user === 'vitorhugo' && req.body.password === '123') {

    const id = req.params.id;
    const token = jwt.sign({ id }, SECRET, {
      expiresIn: 300
    });
    return res.json({ auth: true, token: token });
  }
  res.status(500).json({ message: 'Login inválido!' });
});

router.post('/rest/bankslips', async (req, res) => {
  var bankslip = req.body;

  if (isEmpty(bankslip)) {
    console.log('Bankslip not provided in the request body');
    return res.status(400).json('Bankslip not provided in the request body');
  }

  bankslipValues = Object.values(bankslip);

  for (const value of bankslipValues) {
    if (value === "") {
      return res.status(422).json('Invalid bankslip provided.The possible reasons are: A field of the provided bankslip was null or with invalid values')
    }
  }

  try {
    const createBankslip = create({
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