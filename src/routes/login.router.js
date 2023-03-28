import { Router } from 'express';
import { authMiddleware,sessionValidation } from '../middlewares/auth.middleware.js';
import {
    loginInicioController,
    loginIniciarSesionController,
    registrarinicioController,
    registrarController,
    cerrarSesionController
} from '../controllers/login.controller.js';

const loginRouter = Router();

loginRouter.get('/login', sessionValidation, loginInicioController); // ok
loginRouter.post('/login', loginIniciarSesionController); // ok
loginRouter.get('/registrar', registrarinicioController); // ok
loginRouter.post('/registrar', registrarController); // ok
loginRouter.get('/cerrarSesion', cerrarSesionController); // ok

export default loginRouter;