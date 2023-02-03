
import moment from "moment/moment.js";
import Bankslip from "../models/Bankslip.js";
import Payment from "../models/Payment.js"
import msg from "./UserConstants.js"

function calculateFine(total_in_cents, daysPastDue) {
  let finePerDay;
  if (daysPastDue <= 10) {
    finePerDay = 0.005;
  } else {
    finePerDay = 0.01;
  }
  return total_in_cents * finePerDay * daysPastDue;
}






async function show(req) {
  try {
    const bankslip = await Bankslip.findByPk(req.id, { include: [{ as: 'payments', model: Payment }] })
    if (bankslip.status === "CANCELLED"){return {message:msg.bankslipCancelled}}

    const total_in_cents = bankslip.total_in_cents;
    const due_date = moment(bankslip.due_date);
    const payment_date = moment(bankslip.payments.payment_date);
    console.log(due_date-payment_date)
    const daysPastDue = ((payment_date - due_date)/(24*60*60*1000))
    console.log(daysPastDue)
    const fine = calculateFine(total_in_cents, daysPastDue);
    console.log(`Fine amount: $${fine.toFixed(2)}`);
    
    return {bankslip}
  } catch (error) {
    console.error(error);
    //response.status(error.status || 404);
    return {message:msg.bankslipNotFound}
  }
}

export default show;