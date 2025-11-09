// src/middleware/upload.middleware.js
// Lógica para procesar la subida de archivos (imágenes) con Multer.
const multer = require('multer');

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // La carpeta donde se guardarán temporalmente los archivos
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
