import Bankslip from '../models/Bankslip.js';
import msg from "../services/UserConstants.js"


async function deleteBankslip(req) {
  const bankslip = await Bankslip.findByPk(req.id);
  if (!bankslip) return msg.bankslipNotFound;
  if(bankslip.status ==="CANCELLED") return bankslip

  bankslip.status="CANCELLED";
  bankslip.save()
  return msg.bankslipCancelled;
}

export default deleteBankslip;

