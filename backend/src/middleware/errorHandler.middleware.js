// src/middleware/errorHandler.middleware.js

// Este middleware debe ser el último en cargarse en tu app.js
const errorHandler = (err, req, res, next) => {
    // Diagnóstico en consola para ver el error completo
    console.error(`[API ERROR] Ruta: ${req.method} ${req.originalUrl}`);
    console.error(err);

    let statusCode = err.statusCode || 500;
    let message = err.message || 'Error interno del servidor';
    let errors = {};

    // 1. Manejo específico de errores de Mongoose (ValidationError)
    if (err.name === 'ValidationError') {
        statusCode = 400; // Bad Request
        message = 'Error de validación: campos requeridos o formato incorrecto.';
        
        // Extraer los detalles de cada campo fallido
        Object.keys(err.errors).forEach(key => {
            errors[key] = err.errors[key].message;
        });
    } 
    // 2. Manejo de errores de JSON (como el SyntaxError que viste)
    else if (err.type === 'entity.parse.failed' || err.code === 'EPARSE') {
        statusCode = 400;
        message = 'El cuerpo de la solicitud no es JSON válido.';
    }

    // 3. Respuesta final en formato JSON
    res.status(statusCode).json({
        success: false,
        message: message,
        // Solo incluimos el objeto 'errors' si hay detalles de validación
        ...(Object.keys(errors).length > 0 && { errors }), 
        // Opcional: solo para debugging en desarrollo
        // stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

// 🚨 MEJOR PRÁCTICA: Exportación ESM
export default errorHandler;
