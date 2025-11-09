// Configuración para subir y gestionar imágenes con Cloudinary.
const cloudinary = require('cloudinary').v2;
// [CORRECCIÓN]: Eliminamos require('dotenv').config(), ya se carga en src/app.js

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;
