// src/routes/categories.routes.js
// Rutas para la gestión de categorías.
const express = require('express');
const router = express.Router();
const {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
} = require('../controllers/category.controller');
const auth = require('../middleware/auth.middleware');
const admin = require('../middleware/admin.middleware');

// Rutas públicas (cualquiera puede ver las categorías)
router.route('/').get(getCategories);

// Rutas privadas (solo para administradores)
router.route('/').post(auth, admin, createCategory);
router.route('/:id').put(auth, admin, updateCategory).delete(auth, admin, deleteCategory);

module.exports = router;
