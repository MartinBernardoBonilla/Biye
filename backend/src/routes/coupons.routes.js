// src/routes/coupons.routes.js
// Rutas para los cupones.
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { createCoupon, getCoupons, validateCoupon } = require('../controllers/coupons.controller');

router.route('/')
    .post([
        body('code').notEmpty().withMessage('El código es obligatorio'),
        body('discountType').notEmpty().withMessage('El tipo de descuento es obligatorio'),
        body('discountValue').isNumeric().withMessage('El valor del descuento debe ser un número'),
        body('expiresAt').isISO8601().withMessage('La fecha de vencimiento es obligatoria y debe ser un formato de fecha válido')
    ], createCoupon)
    .get(getCoupons);

router.route('/validate').post([
    body('code').notEmpty().withMessage('El código del cupón es obligatorio'),
], validateCoupon);

module.exports = router;
