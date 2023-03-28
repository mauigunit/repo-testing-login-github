import { Router } from 'express';
import {
    getCartsController,
    createCartsController,
    addProdCartsController,
    deleteProdCartsController,
    updproductCartController,
    updCantProductCartController,
    deleteProductsCartController
} from '../controllers/carts.controller.js';
import { authMiddleware,sessionValidation } from '../middlewares/auth.middleware.js';

const cartsRouter = Router();

cartsRouter.delete('/:cid/products/:pid', deleteProdCartsController);
cartsRouter.put('/:cid', updproductCartController);
cartsRouter.put('/:cid/products/:pid', updCantProductCartController);
cartsRouter.delete('/:cid', deleteProductsCartController);
cartsRouter.get('/:cid', authMiddleware, getCartsController);
cartsRouter.post('/:cid/products/:pid', addProdCartsController);


cartsRouter.post('/', createCartsController);






export default cartsRouter;