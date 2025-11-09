// src/models/Coupon.js
// Define el esquema y el modelo para los cupones de descuento.
const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'El código del cupón es obligatorio'],
        unique: true,
        uppercase: true,
    },
    discountType: {
        type: String,
        required: [true, 'El tipo de descuento es obligatorio'],
        enum: ['percent', 'fixed'], // Porcentaje o cantidad fija
    },
    discountValue: {
        type: Number,
        required: [true, 'El valor del descuento es obligatorio'],
    },
    expiresAt: {
        type: Date,
        required: [true, 'La fecha de vencimiento es obligatoria'],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Coupon', CouponSchema);
