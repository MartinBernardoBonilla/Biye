// src/controllers/coupons.controller.js
// Lógica para las rutas de cupones.
const Coupon = require('../models/Coupon');

/**
 * @route   POST /api/v1/coupons
 * @desc    Crear un nuevo cupón (solo para administradores)
 * @access  Private/Admin
 */
const createCoupon = async (req, res) => {
    try {
        const { code, discountType, discountValue, expiresAt } = req.body;

        // Verificar si el cupón ya existe
        let coupon = await Coupon.findOne({ code });
        if (coupon) {
            return res.status(400).json({ success: false, error: 'El cupón ya existe' });
        }

        // Crear una instancia de cupón
        coupon = new Coupon({
            code,
            discountType,
            discountValue,
            expiresAt
        });

        await coupon.save();
        res.status(201).json({ success: true, data: coupon });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * @route   GET /api/v1/coupons/:code
 * @desc    Obtener un cupón por código
 * @access  Private
 */
const getCouponByCode = async (req, res) => {
    try {
        const coupon = await Coupon.findOne({ code: req.params.code.toUpperCase() });

        if (!coupon) {
            return res.status(404).json({ success: false, error: 'Cupón no encontrado o inválido' });
        }

        // Verificar si el cupón ha expirado
        if (coupon.expiresAt < new Date()) {
            return res.status(400).json({ success: false, error: 'El cupón ha expirado' });
        }

        res.status(200).json({ success: true, data: coupon });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * @route   GET /api/v1/coupons
 * @desc    Obtener todos los cupones (solo para administradores)
 * @access  Private/Admin
 */
const getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find({});
        res.status(200).json({ success: true, data: coupons });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * @route   DELETE /api/v1/coupons/:id
 * @desc    Eliminar un cupón (solo para administradores)
 * @access  Private/Admin
 */
const deleteCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.id);

        if (!coupon) {
            return res.status(404).json({ success: false, error: 'Cupón no encontrado' });
        }

        await coupon.deleteOne();
        res.status(200).json({ success: true, message: 'Cupón eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    createCoupon,
    getCouponByCode,
    getAllCoupons,
    deleteCoupon,
};
