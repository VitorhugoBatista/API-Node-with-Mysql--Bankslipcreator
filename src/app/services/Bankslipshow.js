import moment from "moment/moment.js";
import Bankslip from "../models/Bankslip.js";

console.log(moment().format())

async function show(req,res){


let bankslip = await Bankslip.findByPk(req.params.id, { include: [{ as: 'payments', model: Payment }] });
    
    if (bankslip.status === "PENDING") {
       res.json({
        id: bankslip.id,
        due_date: bankslip.due_date,
        total_in_cents: bankslip.total_in_cents,
        customer: bankslip.customer,
        status: bankslip.status
      })
    }
    
      let due_date = new Date(bankslip.due_date)
      let payment_date = new Date(bankslip.payments.payment_date);
      let bankslip_payment_month = payment_date.getUTCMonth() + 1;
      let bankslip_payment_day = payment_date.getUTCDate();
      // let bankslip_payment_year = payment_date.getUTCFullYear();
      let fine = []
      let bankslip_due_date_month = due_date.getUTCMonth() + 1;
      let bankslip_due_date_day = due_date.getUTCDate();
      //let bankslip_due_date_year = due_date.getUTCFullYear();
      console.log("line 29")
      let hasFine = () => {
        if (bankslip_payment_month <= bankslip_due_date_month || (bankslip_payment_day <= bankslip_due_date_day)) {
          console.log("line 32")
          return fine[0]
        }
        else if (bankslip_payment_month === bankslip_due_date_month || (bankslip_payment_day - bankslip_due_date_day > 10)) {
          console.log("line 36")
          fine.push((bankslip.total_in_cents * 0.005))
          return fine[0]
        }
        else if (bankslip_payment_month === bankslip_due_date_month || (bankslip_payment_day - bankslip_due_date_day <= 10)) {
          console.log("line 41")
          fine.push(bankslip.total_in_cents * 0.01)
          return fine[0]
        }
      }
      res.json({
        id: bankslip.id,
        due_date: bankslip.due_date,
        payment_date: bankslip.payments.payment_date,
        total_in_cents: bankslip.total_in_cents,
        customer: bankslip.customer,
        fine: hasFine(),
        status: bankslip.status,
      })

    }

    export default show;