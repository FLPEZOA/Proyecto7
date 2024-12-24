import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Acceder a información de usuario y token

const Checkout = () => {
    const [cart, setCart] = useState(null);
    const { token } = useAuth();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCart(response.data);
            } catch (error) {
                console.error('Error al obtener el carrito:', error);
            }
        };

        fetchCart();
    }, [token]);

    const handleCheckout = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/payments/checkout`, {
                items: cart.products.map(item => ({
                    productId: item.productId._id,
                    quantity: item.quantity
                })),
            });
            const { id } = response.data;
            // Aquí puedes redirigir al usuario a Stripe Checkout
            const stripe = window.Stripe('pk_test_51QYIwvAVFYa7LJiI9yZe2xEbTMXV5wNpRDR4iKj5h0YEtMALpC8cBn1DdZvkXEXhHgNc2vw8E9tzoOMlQVdR0Ue500mEVaoBT0'); // Usar tu clave pública de Stripe
            const { error } = await stripe.redirectToCheckout({ sessionId: id });
            if (error) console.error('Error redirigiendo a Stripe:', error);
        } catch (error) {
            console.error('Error al procesar el pago:', error);
        }
    };

    if (!cart) return <div>Cargando carrito...</div>;

    return (
        <div>
            <h1>Pagar</h1>
            {cart.products.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
                <div>
                    <h2>Productos en el carrito:</h2>
                    <ul>
                        {cart.products.map(item => (
                            <li key={item.productId._id}>
                                {item.productId.name} - Cantidad: {item.quantity}
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleCheckout}>Ir a Pagar</button>
                </div>
            )}
        </div>
    );
};

export default Checkout;