import Bankslip from "../models/Bankslip.js";

class BankslipController {
  async show(req, res) {
    const bankslip = await Bankslip.findAll({ attributes: ['id'] });
    return res.json(bankslip)

  }
  async create(req, res) {
    let { due_date, total_in_cents, customer } = req.body;
    try {
      const bankslip = await Bankslip.create({
        due_date: due_date,
        total_in_cents: total_in_cents,
        customer: customer,
      });
      return res.json(bankslip)
    
    } catch (error) {
      console.log(error)
    }

  }














  async update(req, res) {
    let bankslip = await Bankslip.findByPk(req.params.id)
    bankslip = await Bankslip.update(req.body)
    return res.json(bankslip)
  }
  async delete(req, res) {
    let bankslip = await Bankslip.findByPk(req.params.id)
    bankslip = await bankslip.destroy(req.body)
    return res.json(bankslip)
  }

}

export default new BankslipController();


