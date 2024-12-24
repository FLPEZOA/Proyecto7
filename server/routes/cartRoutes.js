const express = require('express');
const Cart = require('../models/Cart');
const auth = require('../middleware/authMiddleware'); // Middleware de autenticación
const router = express.Router();

// Obtener carrito de un usuario
router.get('/', auth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el carrito' });
    }
});

// Agregar producto al carrito
router.post('/add', auth, async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const cart = await Cart.findOneAndUpdate(
            { userId: req.user.id },
            { $addToSet: { products: { productId, quantity } } }, // Asegura que no se dupliquen productos
            { new: true, upsert: true } // Crear un nuevo carrito si no existe
        );
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar al carrito' });
    }
});

// Eliminar producto del carrito
router.post('/remove', auth, async (req, res) => {
    const { productId } = req.body;
    try {
        const cart = await Cart.findOneAndUpdate(
            { userId: req.user.id },
            { $pull: { products: { productId } } },
            { new: true }
        );
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar del carrito' });
    }
});

module.exports = router;