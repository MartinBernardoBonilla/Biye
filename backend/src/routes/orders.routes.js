import express from 'express';
// CRÍTICO: Usar 'import' y añadir la extensión '.js' en todos los archivos locales
import { protect, admin } from '../middleware/auth.middleware.js'; 
import { 
    getMyOrders, 
    getOrderById 
} from '../controllers/order.controller.js'; // <- CRÍTICO: Añadir .js

const router = express.Router();

// Rutas protegidas (solo para el usuario logueado)
// GET /api/v1/orders/myorders - Obtener todas mis órdenes
router.route('/myorders').get(protect, getMyOrders);

// GET /api/v1/orders/:id - Obtener una orden específica
router.route('/:id').get(protect, getOrderById);

// Si implementas rutas de administración (e.g., para ver todas las órdenes)
// router.route('/').get(protect, admin, getAllOrders); 

// CRÍTICO: Cambiar module.exports = router; a export default router;
export default router;
