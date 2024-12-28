import dotenv from 'dotenv';
dotenv.config(); // Cargar las variables del archivo .env

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Inicializa Stripe con la clave secreta

import userRoutes from './routes/userRoutes.js'; // Importar rutas de usuario
import productRoutes from './routes/productRoutes.js'; // Importar rutas de productos
import paymentRoutes from './routes/paymentRoutes.js'; // Importar rutas de pagos
import cartRoutes from './routes/cartRoutes.js'; // Importar rutas de carrito// Importar rutas de carrito

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json()); // Permitir que el servidor entienda solicitudes JSON



// Conectar a MongoDB usando la URI proporcionada en el archivo .env
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Base de datos conectada')) // Mensaje de éxito al conectar
    .catch(err => console.error('Error de conexión a la base de datos', err)); // Mensaje de error al conectar

// Usar las rutas
router.use('/api/users', userRoutes); // Rutas para la gestión de usuarios
router.use('/api/products', productRoutes); // Rutas para la gestión de productos
router.use('/api/payments', paymentRoutes); // Rutas para la gestión de pagos
router.use('/api/cart', cartRoutes); // Rutas para la gestión del carrito

// Ruta para crear un Payment Intent
app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body; // Obtener la cantidad del cuerpo de la solicitud

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd', // Cambia la moneda según sea necesario
        });
        res.send({ clientSecret: paymentIntent.client_secret }); // Enviar el secreto del cliente como respuesta
    } catch (error) {
        console.error(error); // Mostrar el error en la consola para depuración
        res.status(500).send({ error: error.message }); // Enviar error al cliente
    }
});

export { app, router };