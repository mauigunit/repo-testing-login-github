import { Router } from 'express';
import {
    getProdController,
    getPIDController,
    createProdController,
    updateProdController, 
    deleteProdController
} from '../controllers/products.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js'

const prodRouter = Router();

prodRouter.get('/', authMiddleware, getProdController);
prodRouter.get('/:pid', authMiddleware, getPIDController);
prodRouter.post('/', authMiddleware, createProdController);
prodRouter.put('/:pid', authMiddleware, updateProdController);
prodRouter.delete('/:pid', authMiddleware, deleteProdController);

export default prodRouter;