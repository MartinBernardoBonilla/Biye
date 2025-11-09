// src/routes/users.routes.js
// Rutas para la gestión de usuarios (Crear, leer, actualizar, eliminar).
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');
const {
    registerUser,
    loginUser,
    getMe,
    updateUser,
    deleteUser,
    getAllUsers
} = require('../controllers/users.controller');

// Rutas públicas
router.post('/register', registerUser);
router.post('/login', loginUser);

// Rutas privadas (requieren autenticación)
router.get('/me', auth, getMe);

// Rutas de administración (requieren ser admin)
router.route('/').get(auth, admin, getAllUsers);
router.route('/:id').delete(auth, admin, deleteUser).put(auth, admin, updateUser);

module.exports = router;
