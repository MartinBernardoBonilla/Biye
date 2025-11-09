// Asumiendo que usas Joi o un paquete similar para la validación
// No se incluye la lógica de Joi para mantenerlo como una plantilla genérica de middleware

/**
 * Middleware para validar el cuerpo de la solicitud (req.body)
 * usando un esquema de validación.
 * @param {Object} schema - El esquema de validación (e.g., Joi).
 * @returns {Function} - Función de middleware de Express.
 */
const validate = (schema) => (req, res, next) => {
    // Ejemplo de cómo se aplicaría la validación (usando Joi como referencia):
    // const { error, value } = schema.validate(req.body);

    // if (error) {
    //     // Si hay un error de validación, enviar una respuesta 400
    //     res.status(400);
    //     // Solo mostrar el primer error para la simplicidad
    //     throw new Error(error.details[0].message.replace(/['"]/g, ''));
    // } else {
    //     // Si la validación es exitosa, adjuntar el valor validado al cuerpo
    //     // req.body = value; 
    //     next();
    // }
    
    // Si no estás usando una librería de validación, esta función
    // simplemente debería verificar la estructura de los datos.

    // Por ahora, simplemente llamaremos a next() para que no bloquee el flujo, 
    // pero debes añadir tu lógica de validación real aquí.
    next();
};

// CRÍTICO: Usar export default para que pueda ser importado como `import validate from ...`
export default validate;
