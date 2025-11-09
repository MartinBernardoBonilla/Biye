import jwt from 'jsonwebtoken'; // ✅ CORREGIDO: Importar jwt para verificar el token
import asyncHandler from './asyncHandler.middleware.js'; // Asegúrate de la ruta
import User from '../models/User.js'; // Asegúrate de la ruta

// Middleware para proteger rutas que requieren un usuario autenticado
export const protect = asyncHandler(async (req, res, next) => {
    let token;

    // 1. Obtener el token del encabezado (Bearer token)
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Extraer el token de la cadena "Bearer <token>"
            token = req.headers.authorization.split(' ')[1];

            // 2. Verificar el token
            // CRÍTICO: Necesita jwt importado y JWT_SECRET en .env
            const decoded = jwt.verify(token, process.env.JWT_SECRET); 

            // 3. Obtener el usuario del token (excluyendo la contraseña)
            // Se inyecta el objeto usuario en la solicitud (req.user)
            req.user = await User.findById(decoded.userId).select('-password');
            // NOTA: Cambié 'decoded.id' a 'decoded.userId'. Si usas 'id' en el payload de tu token, déjalo como estaba.

            // 4. Continuar con la siguiente función (controlador de ruta)
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('No autorizado, token fallido.');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('No autorizado, no hay token.');
    }
});

// Middleware para restringir rutas solo a administradores (exportación que faltaba)
export const admin = (req, res, next) => {
    // Verificar si el usuario está autenticado y tiene el flag 'isAdmin'
    if (req.user && req.user.isAdmin) {
        next(); // El usuario es administrador, continuar
    } else {
        res.status(403); // 403 Forbidden (Prohibido)
        throw new Error('No autorizado. Se requiere acceso de Administrador.');
    }
};

// Ambas funciones, 'protect' y 'admin', se exportan de forma nombrada.
