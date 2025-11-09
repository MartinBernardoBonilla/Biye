import { Router } from 'express';
// Asegúrate de que este controlador exista y tenga métodos exportados
// Por ejemplo: import { getAllProducts, getProductById, createProduct } from '../controllers/products.controller.js';

const router = Router();

// Ejemplo de rutas de productos (ajusta esto a tus necesidades reales)
// router.get('/', getAllProducts);
// router.get('/:id', getProductById);
// router.post('/', createProduct);

// De momento, dejo rutas de ejemplo que solo imprimen un mensaje para asegurar la compilación
router.get('/', (req, res) => {
    res.json({ message: 'Ruta de productos funcionando: obtener todos los productos' });
});

router.get('/:id', (req, res) => {
    res.json({ message: `Ruta de productos funcionando: obtener producto con ID: ${req.params.id}` });
});


// CORRECCIÓN CLAVE: Usamos export default
// Esto permite que el archivo app.js use 'import productRoutes from ...'
export default router;
