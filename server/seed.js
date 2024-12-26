const mongoose = require('mongoose');
const Product = require('./models/Product'); // Ajusta la ruta según tu estructura
require('dotenv').config(); // Cargar variables de entorno


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(async () => {
        console.log('Conectado a la base de datos');


        const products = [
            {
                name: 'Donut chocolate rellena con chocolate',
                description: 'Deliciosa donut de chocolate con un rico relleno de chocolate.',
                price: 2500,
                imageUrl: '/images/chocodona.png',
                category: 'Donuts', // Categorización opcional
            },
            {
                name: 'Donut frutilla rellena con manjar',
                description: 'Dulce donut de frutilla con un suave manjar en su interior.',
                price: 2000,
                imageUrl: '/images/frutidona.jpg',
                category: 'Donuts',
            }
        ];


        await Product.deleteMany({}); // Elimina todos los productos existentes

        const result = await Product.insertMany(products);
        console.log('Productos añadidos:', result);

        mongoose.disconnect();
    })
    .catch(err => {
        console.error('Error de conexión a MongoDB:', err);
    });