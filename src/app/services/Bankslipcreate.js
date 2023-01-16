import Bankslip from '../models/Bankslip.js';
import msg from '../services/UserConstants.js'
async function create(req) {
  console.log(req)
  try {
   const response = await Bankslip.create({
      due_date: req.due_date,
      total_in_cents: req.total_in_cents,
      customer: req.customer
    })
    return (response)
  } catch (error) {
   return (msg.bankslipError)
  }

}
export default create

