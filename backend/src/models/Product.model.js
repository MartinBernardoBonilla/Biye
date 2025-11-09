import mongoose from 'mongoose';

// ----------------------------------------------------
// 1. Definición del Esquema
// ----------------------------------------------------
const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Referencia al modelo de usuario
    },
    name: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    price: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        default: 0
    },
    countInStock: {
        type: Number,
        required: [true, 'El stock es obligatorio'],
        default: 0
    },
    category: {
        type: String,
        required: [true, 'La categoría es obligatoria']
    },
    image: {
        type: String, // URL o path de la imagen
        required: false,
    },
    // Este campo se usa para la eliminación suave (soft delete)
    isActive: { 
        type: Boolean,
        default: true
    }
}, {
    timestamps: true // Añade createdAt y updatedAt
});

// ----------------------------------------------------
// 2. Creación del Modelo y Exportación
// ----------------------------------------------------
const Product = mongoose.model('Product', productSchema);

// 💡 Utilizamos la exportación por defecto (export default)
// Esta es la forma más limpia para la importación 'import Product from ...'
export default Product;
