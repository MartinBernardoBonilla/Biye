// src/middleware/rateLimiting.middleware.js
// Lógica para limitar las solicitudes a la API y prevenir ataques de fuerza bruta.
const rateLimit = require('express-rate-limit');

// Límites para las solicitudes de autenticación
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Máximo de 100 solicitudes por IP en 15 minutos
    message: 'Demasiadas solicitudes desde esta IP, por favor, inténtalo de nuevo después de 15 minutos.'
});

// Límites para otras rutas de la API
const apiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutos
    max: 1000, // Máximo de 1000 solicitudes por IP en 60 minutos
    message: 'Demasiadas solicitudes desde esta IP, por favor, inténtalo de nuevo en una hora.'
});

module.exports = { authLimiter, apiLimiter };
