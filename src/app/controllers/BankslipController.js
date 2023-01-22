
import Bankslipcreate from '../services/Bankslipcreate.js'
import Bankslipdelete from '../services/Bankslipdelete.js'
import Bankslipshow from '../services/Bankslipshow.js'

class BankslipController {
  async show(req, res) {
    const response = await Bankslipshow(req.params);
    return res.json(response);

  }

  async create(req, res) {
    const response = await Bankslipcreate(req.body);
    return res.status(201).json(response);
  }


  async delete(req, res) {
    const response = await Bankslipdelete(req.params)
    return res.status(201).json(response)
  }
}

export default new BankslipController();


