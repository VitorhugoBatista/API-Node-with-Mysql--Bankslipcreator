import  Bankslip  from "../models/Bankslip.js";
import payment from "../models/Payment.js";

class PaymentController {
  async store(req, res) {
    const payment = await payment.create(req.body);
    return res.json(payment)
  }
  async index(req, res) {
    const payments = await payment.findAll({
        attributes: [
            'id','nome', 'dtnascimento', 'telefone', 'bairro', 'cep'
        ],
        include: [
            { 
                model: Curso,
                as: 'curso'
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
            'id','nome', 'dtnascimento', 'telefone', 'bairro', 'cep'
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