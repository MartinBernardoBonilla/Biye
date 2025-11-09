import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { MercadoPagoConfig } from 'mercadopago';
import paymentRoutes from './routes/payments.routes.js';
import errorHandler from './middleware/errorHandler.middleware.js';

const app = express();

// Configuración básica
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Inicialización de Mercado Pago
const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
if (!accessToken) {
  console.error('❌ Error crítico: MERCADOPAGO_ACCESS_TOKEN no está definido en el .env');
  process.exit(1);
} else {
  const mpClient = new MercadoPagoConfig({
    accessToken,
    options: { timeout: 5000 },
  });
  app.locals.mpClient = mpClient;
  console.log('✅ Mercado Pago inicializado correctamente.');
}

// Rutas
app.use('/api/v1/payments', paymentRoutes);

// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.json({ message: '✅ Servidor Biye activo y funcionando.' });
});

// Middleware de errores
app.use(errorHandler);

export default app;
