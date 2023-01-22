import { response } from "express";
import moment from "moment/moment.js";
import Bankslip from "../models/Bankslip.js";
import Payment from "../models/Payment.js"
import msg from "./UserConstants.js"

async function checkFine(due_date, payment_date, total_in_cents) {
  let fine = []
  let formulefine = ((payment_date - due_date) / (1000 * 60 * 60 * 24)) // calcula a diferença de dia entre a data de vencimento do boleto e a data de pagamento//

  if (formulefine >= 10) {
    fine = + (total_in_cents * 0.005)  ///
  }
  else if (formulefine <= 10)
  
  { fine = + (total_in_cents * 0.001) }
  console.log(fine)



}



async function show(req) {


  try {
    const bankslip = await Bankslip.findByPk(req.id, { include: [{ as: 'payments', model: Payment }] });
    
      let total_in_cents = bankslip.total_in_cents
      let due_date = moment(bankslip.due_date)
      let payment_date = moment(bankslip.payment_date)
      checkFine(due_date, payment_date, total_in_cents)
     response.status(200) 
    return 
    
  } catch (error) {
    response.status(error.status || 404);
    return msg.bankslipNotFound
  }

}




export default show;