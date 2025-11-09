// Ejemplo asumiendo que el cliente es 'redisClient'
import { createClient } from 'redis';

const redisClient = createClient({
    url: 'redis://redis:6379' // Usando 'redis' como hostname para Docker Compose
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

// Función para inicializar
export const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Redis connected successfully.');
    } catch (err) {
        console.error('Failed to connect to Redis', err);
    }
};

// **IMPORTANTE: Esta función debe exportarse con el nombre correcto**
export const closeRedis = async () => {
    if (redisClient.isOpen) {
        await redisClient.quit();
        console.log('Redis connection closed.');
    }
};

// También puedes exportar el cliente directamente
export default redisClient;
