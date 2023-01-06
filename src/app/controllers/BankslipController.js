

import Bankslip from "../models/Bankslip.js";
import Payment from "../models/Payment.js";

class BankslipController {
  async show(req, res) {
    let bankslip = await Bankslip.findByPk(req.params.id, { include: [{ as: 'payments', model: Payment, }] });
    console.log(bankslip.status)
    if (bankslip.status === "PENDING") {
      return res.json({
        id: bankslip.id,
        due_date: bankslip.due_date,
        total_in_cents: bankslip.total_in_cents,
        customer: bankslip.customer,
        status: bankslip.status
      })
    }


    console.log("n")
    const bankslip_status = () => {
      let due_date = new Date(bankslip.due_date)
      let payment_date = new Date(bankslip.payments.payment_date);
      let bankslip_payment_month = payment_date.getUTCMonth() + 1;
      let bankslip_payment_day = payment_date.getUTCDate();
      // let bankslip_payment_year = payment_date.getUTCFullYear();
      let fine = []
      let bankslip_due_date_month = due_date.getUTCMonth() + 1;
      let bankslip_due_date_day = due_date.getUTCDate();
      //let bankslip_due_date_year = due_date.getUTCFullYear();
      let hasFine = () => {
        if (bankslip_payment_month <= bankslip_due_date_month || (bankslip_payment_day <= bankslip_due_date_day)) {
          return fine[0]
        }
        else if (bankslip_payment_month === bankslip_due_date_month || (bankslip_payment_day - bankslip_due_date_day > 10)) {
          fine.push((bankslip.total_in_cents * 0.005))
          return fine[0]
        }
        else if (bankslip_payment_month === bankslip_due_date_month || (bankslip_payment_day - bankslip_due_date_day <= 10)) {
          fine.push(bankslip.total_in_cents * 0.01)
          return fine[0]
        }
      }
      return ({
        id: bankslip.id,
        due_date: bankslip.due_date,
        payment_date: bankslip.payments.payment_date,
        total_in_cents: bankslip.total_in_cents,
        customer: bankslip.customer,
        fine: hasFine(),
        status: bankslip.status,
      })
    }

  }

  async create(req, res) {
  //console.log(Object.values(req.body).function isenpty(params) {
    
  //})

    try {
      const bankslip = await Bankslip.create({
        due_date: req.body.due_date,
        total_in_cents: req.body.total_in_cents,
        customer: req.body.customer,
      });
      return res.json(bankslip)
    } catch (error) {
      if (error) res.json({ message: "some field are empty" })
    }
  }

  async delete(req, res) {
    let bankslip = await Bankslip.destroy({ where: { id: req.params.id } })
    if (!bankslip) return res.status(404).json({ message: "Bankslip not found with the specified id" })
    else return res.status(200).json({ message: "Bankslip canceled" })
  }
}

export default new BankslipController();


