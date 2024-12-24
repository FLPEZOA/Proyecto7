const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Asegúrate de tener la clave secreta de Stripe
const router = express.Router();

// Endpoint para crear una sesión de pago
router.post('/checkout', async (req, res) => {
    const { items } = req.body; // Obtener la lista de productos

    // Prepara el cuerpo de la solicitud para horas de productos
    const line_items = items.map(item => ({
        price_data: {
            currency: 'usd', // Cambia la moneda según sea necesario
            product_data: {
                name: item.productId,  // Asegúrate de tener acceso al nombre del producto
            },
            unit_amount: item.price * 100, // Stripe espera precios en centavos
        },
        quantity: item.quantity,
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: 'http://localhost:5000/success', // URL de éxito después del pago
            cancel_url: 'http://localhost:5000/cancel',   // URL si el pago se cancela
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la sesión de pago' });
    }
});

module.exports = router;