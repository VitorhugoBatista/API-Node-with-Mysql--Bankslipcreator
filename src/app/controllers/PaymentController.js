import Bankslip from "../models/Bankslip.js";
import Payment from "../models/Payment.js";

class PaymentController {
  async payment(req, res) {
    const id = req.params.id
    const payment_date = req.body.payment_date;
    
    
    if(req.body){
      console.log("nobody")
    }
    try {
      const bankslip = await Bankslip.findOne({ where: { id: id } })
      bankslip.status = "PAID"
      bankslip.save;
    } catch (error) {
      //return res.status(404).json("Bankslip not found with the specified id")
    }
    const payment = await Payment.create({payment_date:payment_date});
    return res.json(payment)

  }
  
  async index(req, res) {
    const payments = await Payment.findAll({
      attributes: [

      ],
      include: [
        {
          model: Bankslip,
          as: 'Bankslip'
        }
      ]
    });
    return res.json(payments)
  }

  async delete(req, res) {
    let payment = await Payment.findByPk(req.params.id)
    payment = await payment.destroy(req.body)
    return res.json(payment)
  }
  async show(req, res) {
    let payment = await payment.findByPk(req.params.id, {
      attributes: [

      ],
      include: [
        {
          model: Bankslip,
          as: 'bankslip'
        }
      ]
    })
    return res.json(payment)
  }
}
export default new PaymentController();