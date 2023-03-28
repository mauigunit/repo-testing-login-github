import {
    registerUser,
    loginUser
} from '../services/login.service.js'
import { createHash, isValidPassword }  from '../utils/utils.js'

const loginInicioController = async (req, res) => {
    try {
        res.render('login', {})
    } catch (error) {
        res.render('error', {link: 'login', error: error, texto: 'login'})
    }
}

const loginIniciarSesionController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await loginUser(email);
        if(result){
            if(isValidPassword(password, result.password)){
                req.session.user = { usuario: result.firstname, email: result.email , visitas: 0, rol: result.rol }
                res.json({ status: 'success', message: `Sesión iniciada correctamente`, link: 'http://localhost:8080/api/products'});
            } else {
                res.status(401).json({ "status": 'error', "message": `credenciales incorrectas`});
            }
        } else {
            res.status(401).json({ "status": 'error', "message": `credenciales incorrectas`});
        }
    } catch (error) {
        res.status(500).json({ "status": 'error', "message": `error al iniciar sesión`});
    }
}

const registrarinicioController = async (req, res) => {
    try {
        res.render('register', {})
    } catch (error) {
        
    }
}

const registrarController = async (req, res) => {
    try {
        const { firstname, lastname, email, password, rol } = req.body;
        let passHash = createHash(password);
        const result = await registerUser(firstname, lastname, email, passHash, rol);
        if(result)
            res.json({status:"success", message:"Registrado correctamente"});
        else
            res.status(400).json({status:"error", message: "No fue posible registrar."});
    } catch (error) {
        res.status(500).json({status:"error", message: `Error al registrar ${error}`});
    }
}

const cerrarSesionController = async (req, res) => {
    try {
        req.session.destroy();
        res.redirect('/login');
    } catch (error) {
        res.render('error', {link: '/login', error: error, texto: 'login'})
    }
}

export { loginInicioController, loginIniciarSesionController, registrarinicioController, registrarController, cerrarSesionController };