import Bankslip from '../models/Bankslip.js';
import msg from "../services/UserConstants.js"


async function deletebankslip(req) {
    let bankslip = await Bankslip.destroy({ where: { id: req.id } })
    if (!bankslip) return ( msg.bankslipNotFound )
    else return (msg.bankslipCancelled)
}
  export default deletebankslip;