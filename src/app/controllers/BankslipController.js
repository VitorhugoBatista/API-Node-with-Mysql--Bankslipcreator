

import Bankslip from "../models/Bankslip.js";
import Payment from "../models/Payment.js";

class BankslipController {
  async show(req, res) {
    let bankslipId = req.params.id;
    const bankslip = await Bankslip.findByPk(bankslipId, { include: [{ as: 'payments', model: Payment, attributes: ['payment_date'] }] });
    console.log(bankslip.payments.payment_date)
    const bankslip_status = () => {
      
      let due_date = new Date(bankslip.due_date)
      let payment_date = new Date(bankslip.payments.payment_date);
      let bankslip_payment_month = payment_date.getUTCMonth() + 1;
      let bankslip_payment_day = payment_date.getUTCDate();
      let bankslip_payment_year = payment_date.getUTCFullYear();

      let bankslip_due_date_month = due_date.getUTCMonth() + 1;
      let bankslip_due_date_day = due_date.getUTCDate();
      let bankslip_due_date_year = due_date.getUTCFullYear();


      if (bankslip.status === "PENDING") {
        console.log(bankslip.payment_date)
        return ({
          id: bankslip.id,
          due_date: bankslip.due_date,
          total_in_cents: bankslip.total_in_cents,
          customer: bankslip.customer,
          status: bankslip.status
        })
      }
      return ({
        id: bankslip.id,
        due_date: bankslip.due_date,
        total_in_cents: bankslip.total_in_cents,
        customer: bankslip.customer,
        status: bankslip.status,
        payment_date: bankslip.payments.payment_date,
        fine:0
      })
      
    }

    //let bankslip_payment = {
    ////date: payment_date,
    //day: payment_date.slice(8),
    // month: payment_date.slice(5, 7)
    //}

    return res.json(bankslip_status())
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


