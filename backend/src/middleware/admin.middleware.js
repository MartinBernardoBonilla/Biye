// src/middleware/admin.middleware.js
// Middleware para verificar si el usuario es un administrador.
const User = require('../models/User');

const admin = (req, res, next) => {
    try {
        if (req.user && req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({ success: false, error: 'Acceso denegado. No eres un administrador' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error del servidor' });
    }
};

module.exports = admin;
