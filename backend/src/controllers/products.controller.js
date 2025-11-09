// ⭐️ Importaciones con sintaxis ES Modules (ahora que package.json fue actualizado)
import Product from '../models/Product.model.js'; 
import asyncHandler from '../middleware/asyncHandler.middleware.js';
import redisClient from '../config/redis.js'; 

// Nombre de la clave de caché para la lista de productos
const CACHE_KEY = 'all_products'; 
const CACHE_EXPIRY = 3600; // 1 hora en segundos

// @desc    Obtener todos los productos
// @route   GET /api/v1/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    
    // 1. Intentar obtener datos de Redis
    const cachedProducts = await redisClient.get(CACHE_KEY);

    if (cachedProducts) {
        console.log('[CACHE HIT] Productos servidos desde Redis');
        const products = JSON.parse(cachedProducts);

        return res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    }

    // 2. Si no hay caché (CACHE MISS): Buscar en MongoDB
    console.log('[CACHE MISS] Buscando productos en MongoDB');
    // ✅ Product.find() funcionará perfectamente con el módulo ESM
    const products = await Product.find({ isActive: true }); 

    // 3. Guardar en caché antes de responder
    await redisClient.set(CACHE_KEY, JSON.stringify(products), 'EX', CACHE_EXPIRY);
    
    // 4. Responder al cliente
    res.status(200).json({
        success: true,
        count: products.length,
        data: products
    });
});

// @desc    Obtener un producto por ID
// @route   GET /api/v1/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.status(200).json({
            success: true,
            data: product
        });
    } else {
        res.status(404).json({ 
            success: false,
            message: 'Producto no encontrado'
        });
    }
});

// --- RUTAS DE ADMINISTRACIÓN ---

// @desc    Crear un nuevo producto
// @route   POST /api/v1/products
// @access  Private/Admin 
const createProduct = asyncHandler(async (req, res) => {
    req.body.user = req.user.id; 
    
    const newProduct = await Product.create(req.body);
    
    // ⚠️ CRÍTICO: Invalidamos la caché después de crear un producto
    await redisClient.del(CACHE_KEY);
    console.log('[CACHE INVALIDATED] La lista de productos ha sido invalidada.');

    res.status(201).json({
        success: true,
        message: 'Producto creado exitosamente',
        data: newProduct
    });
});

// @desc    Actualizar un producto
// @route   PUT /api/v1/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true, 
        runValidators: true 
    });

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Producto no encontrado para actualizar'
        });
    }

    // ⚠️ CRÍTICO: Invalidamos la caché después de actualizar un producto
    await redisClient.del(CACHE_KEY);
    console.log('[CACHE INVALIDATED] La lista de productos ha sido invalidada.');

    res.status(200).json({
        success: true,
        message: 'Producto actualizado exitosamente',
        data: product
    });
});

// @desc    Eliminar un producto (eliminación suave)
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Producto no encontrado para eliminar'
        });
    }

    product.isActive = false; 
    await product.save();

    // ⚠️ CRÍTICO: Invalidamos la caché después de eliminar un producto
    await redisClient.del(CACHE_KEY);
    console.log('[CACHE INVALIDATED] La lista de productos ha sido invalidada.');

    res.status(200).json({
        success: true,
        message: 'Producto marcado como inactivo (eliminación suave)'
    });
});

// ⭐️ Exportaciones con sintaxis ES Modules
export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
