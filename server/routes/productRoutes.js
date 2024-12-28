import { Router } from 'express';
import Product from '../models/Product.js';

const router = Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); // Obtener todos los productos desde MongoDB
        res.json(products); // Devolver la lista de productos como respuesta
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error al obtener productos' });
    }
});

// Obtener un producto individual
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
});

export default router;