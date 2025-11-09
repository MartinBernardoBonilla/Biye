// routes/auth.routes.js
// Rutas para la autenticación de usuarios (registro y login) - AHORA EN ES MODULES

import express from 'express';
// Importamos solo lo necesario para validar y el controlador
import { body } from 'express-validator'; 
import { registerUser, loginUser, getUserProfile } from '../controllers/auth.controller.js'; // CRÍTICO: Agregar .js
import validate from '../middleware/validation.middleware.js'; // CRÍTICO: Agregar .js
// ✅ CRÍTICO: Importar el middleware de protección para la ruta /profile
import { protect } from '../middleware/auth.middleware.js'; // CRÍTICO: Agregar .js

const router = express.Router();

// Validaciones para el registro
const registerValidation = [
    body('username').notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('email').isEmail().withMessage('El correo electrónico debe ser válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];

// Validaciones para el login
const loginValidation = [
    body('email').isEmail().withMessage('El correo electrónico debe ser válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
];

// Rutas Públicas
router.route('/register').post(registerValidation, validate, registerUser);
router.route('/login').post(loginValidation, validate, loginUser);

// ✅ RUTA PROTEGIDA: Obtener perfil del usuario logueado
router.route('/profile').get(protect, getUserProfile);


// CRÍTICO: Reemplazar module.exports con export default
export default router;
