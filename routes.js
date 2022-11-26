var express = require('express');
var router = express.Router();
var isEmpty = require('lodash.isempty');

const jwt = require('jsonwebtoken');
const SECRET = "druidafox";
const path = require('path')
const { Bankslip, create, payments, cancelBanklsip} = require('./Bankslip.js');
const verifyJwt = require('./authtoken')
const User = require('./dbuser');
const bodyParser = require('body-parser');




router.post('/login', async (req, res, next) => {
  console.log
  const { email, password } = req.body;

  //esse teste abaixo deve ser feito no seu banco de dados
  if (!(email && password)) {
    res.status(400).send("All input is required");
  }

  const user = await User.findAll({ attributes: ['email', 'password'] });
  if (!(user.email)) {

    const id = user.id

    const token = jwt.sign({ id, email }, SECRET, {
      expiresIn: 300 // expires in 5min
    });
    user.token = token;
    return res.status(401).json({ auth: true, token: user.token });

  }

  res.status(500).json({ message: 'Login inválido!' });

})
router.post('/rest/bankslips/:id/payments',verifyJwt, async (req, res) => {
  payment_date = req.body;
  let id = req.params.id;
  if (payment_date) {
    res.status(204)
  }
  payments(payment_date, id)
  res.end()
})





router.post('/logout', function (req, res) {
  res.json({ auth: false, token: null });
})


router.delete('/rest/bankslips/:id',verifyJwt, async(req,res)=>{
let id = req.params.id
try {
  await cancelBanklsip(id)
res.status(204).json("Bankslip canceled")
} catch (error) {
  res.status(404).send("Bankslip not found with the specified id")
}
})


router.get('/rest/bankslips/', verifyJwt, async (req, res, next) => {

  const token = req.headers['x-access-token'];

  var bankslip = await Bankslip.findAll(bankslip)
  return res.json({ bankslip })

})

router.get('/rest/bankslips/:id', verifyJwt, async (req, res, next) => {
  const id = req.params.id;
  console.log(id)

  var bankslipByID = await Bankslip.findOne({
    where: {
      id: id
    }
  });

  if (id) {
    return res.json({ bankslipByID })
  }
  return res.status(400).json('not finded');

})


router.post('/rest/bankslips', verifyJwt, async (req, res) => {

  const bankslip = req.body
  due_date = bankslip.due_date;
  total_in_cents = bankslip.total_in_cents,
    customer = bankslip.customer
  console.log(bankslip)
  //console.log(due_date,total_in_cents,customer)

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
    createBankslip = await create({
      due_date: due_date,
      total_in_cents: total_in_cents,
      customer: customer,
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
      console.log(error)
      res.status(422).json('Invalid bankslip provided.The possible reasons are: A field of the provided bankslip was null or with invalid values')
    }
  }




});


module.exports = router;