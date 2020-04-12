import { Router } from 'express';

//import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliveryController from './app/controllers/DeliveryController';
import ProblemDeliveryController from './app/controllers/ProblemDeliveryController';
import DeliverymanController from './app/controllers/DeliverymanController';
import PackageController from './app/controllers/PackageController';
import ProblemController from './app/controllers/ProblemController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

//routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.post('/deliveryman/:id/deliveries', DeliveryController.store);
routes.get('/deliveryman/:id/deliveries', DeliveryController.index);
routes.put('/deliveryman/:id/deliveries/:packageId', DeliveryController.update);

routes.post('/delivery/:id/problems', ProblemController.store);
routes.get('/delivery/:id/problems', ProblemController.index);

// Admin-only Features
routes.use(authMiddleware);

routes.post('/recipient', RecipientController.store);
routes.get('/recipient', RecipientController.index);
routes.put('/recipient/:id', RecipientController.update);

routes.post('/deliveryman', DeliverymanController.store);
routes.get('/deliveryman', DeliverymanController.index);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

routes.post('/package', PackageController.store);
routes.get('/package', PackageController.index);
routes.put('/package/:id', PackageController.update);
routes.delete('/package/:id', PackageController.delete);

routes.delete('/problem/:id/cancel-delivery', DeliveryController.delete);
routes.get('/problem/deliveries', ProblemDeliveryController.index);

export default routes;
