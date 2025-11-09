// utils/ErrorResponse.js
// Usamos 'export default' para que se pueda importar con 'import ErrorResponse from ...'
class ErrorResponse extends Error {
    constructor(message, statusCode) {
        // Llama al constructor padre (Error) con el mensaje
        super(message); 
        this.statusCode = statusCode;

        // Captura el stack trace para mejor debugging
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorResponse;
