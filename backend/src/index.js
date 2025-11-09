console.log('=== 🚀 INICIANDO SERVIDOR BIYE ===');
console.log('🔍 Variables cargadas via preload:');
console.log('   MERCADOPAGO_ACCESS_TOKEN:', process.env.MERCADOPAGO_ACCESS_TOKEN ? '✅ DEFINIDA' : '❌ FALTANTE');
console.log('   MONGODB_URI:', process.env.MONGODB_URI ? '✅ DEFINIDA' : '❌ FALTANTE');

import app from './app.js';
import { connectDB } from './config/database.js';

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, '0.0.0.0', () => {
      console.log('🎉 Servidor Biye activo en puerto ' + PORT);
      console.log('🌐 Modo: ' + process.env.NODE_ENV);
    });
  } catch (error) {
    console.error('Error al iniciar servidor:', error.message);
    process.exit(1);
  }
})();
