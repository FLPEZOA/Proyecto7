require('dotenv').config(); // Cargar las variables del archivo .env

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Inicializa Stripe con la clave secreta

const userRoutes = require('./routes/userRoutes'); // Importar rutas de usuario
const productRoutes = require('./routes/productRoutes'); // Importar rutas de productos
const paymentRoutes = require('./routes/paymentRoutes'); // Importar rutas de pagos
const cartRoutes = require('./routes/cartRoutes'); // Importar rutas de carrito

const app = express();

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
app.use('/api/users', userRoutes); // Rutas para la gestión de usuarios
app.use('/api/products', productRoutes); // Rutas para la gestión de productos
app.use('/api/payments', paymentRoutes); // Rutas para la gestión de pagos
app.use('/api/cart', cartRoutes); // Rutas para la gestión del carrito

// Configurar el puerto del servidor
const PORT = process.env.PORT || 5000; // Usar el puerto definido en las variables de entorno o 5000 por defecto.
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`); // Mensaje al iniciar el servidor
});

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