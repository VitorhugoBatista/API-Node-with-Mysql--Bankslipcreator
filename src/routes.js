import { Router } from 'express';
import BankslipController from './app/controllers/BankslipController.js';
import PaymentController from './app/controllers/PaymentController.js';
const routes = Router();

routes.post('/rest/bankslips', BankslipController.create)
routes.get('/rest/bankslips', BankslipController.show)
routes.put('/bankslips/:id', BankslipController.update)
routes.delete('/bankslips/:id', BankslipController.delete)

routes.get('/payments', PaymentController.index)
routes.get('/payments/:id', PaymentController.show)
routes.post('/apayments', PaymentController.store)
routes.delete('/payments/:id', PaymentController.delete)



export default routes;