import { Router } from 'express';

//import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliveredController from './app/controllers/DeliveredController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import DeliverymanController from './app/controllers/DeliverymanController';
import PackageController from './app/controllers/PackageController';
import ProblemController from './app/controllers/ProblemController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

//routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddleware);

routes.post('/recipient', RecipientController.store);
routes.put('/recipient/:id', RecipientController.update);

routes.post('/deliveryman', DeliverymanController.store);
routes.get('/deliveryman', DeliverymanController.index);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

routes.post('/package', PackageController.store);
routes.get('/package', PackageController.index);
routes.put('/package/:id', PackageController.update);
routes.delete('/package/:id', PackageController.delete);

routes.post('/deliveryman/:id/packages/:packageId', DeliveryController.store);
routes.get('/deliveryman/:id/current-deliveries', DeliveryController.index);

routes.get('/deliveryman/:id/delivered', DeliveredController.index);
routes.put(
  '/deliveryman/:id/current-deliveries/:packageId',
  DeliveryController.update
);

routes.post('/problem/delivery/:id', ProblemController.store);
routes.get('/problem/deliveries', ProblemController.index);
// routes.put('/', ProblemController.update);
routes.delete('/problem/:id/cancel-delivery', ProblemController.delete);

routes.get('/delivery/:id/problems', DeliveryProblemController.index);

export default routes;
