
import Bankslip from "../models/Bankslip.js";
import Payment from "../models/Payment.js";

class PaymentController {
  async payment(req, res) {
    const id = req.params.id
    console.log(id)
    const payment_date = req.body.payment_date;
    if (!payment_date) {
      res.status(204)
    }
    try {
      const bankslip = await Bankslip.findByPk(id)
      const payment = await Payment.create({
        payment_date: payment_date,
        bankslip_id: id
      });
      
      bankslip.status = "PAID"
      bankslip.save();
      return res.json(payment)
    } catch (error) {
      return res.status(404).json('Message: Bankslip not found with the specified id')
    }
  }
}
export default new PaymentController();