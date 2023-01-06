import { Router } from 'express';
import BankslipController from './app/controllers/BankslipController.js';
import PaymentController from './app/controllers/PaymentController.js';

const routes = Router();

routes.use
//Bankslip Routes
routes.post('/rest/bankslips', BankslipController.create)
routes.get('/rest/bankslips/:id',BankslipController.show)
routes.delete('/rest/bankslips/:id', BankslipController.delete)
//Payment Route
routes.post('/rest/bankslip/payments/:id', PaymentController.payment)




export default routes;