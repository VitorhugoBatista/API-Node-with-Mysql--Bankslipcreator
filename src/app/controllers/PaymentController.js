import  Bankslip  from "../models/Bankslip.js";
import Payment from "../models/Payment.js";

class PaymentController {
  async payment(req, res) {
    console.log(req.body)
    const payment = await Payment.create(req.body);
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