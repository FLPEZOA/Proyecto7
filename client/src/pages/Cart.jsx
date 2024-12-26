import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { state: { cart }, dispatch } = useCart();
    const navigate = useNavigate();
    const { token } = useAuth(); // Obtener el token de autenticación

    const removeFromCart = async (productId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
    };

    const handleCheckout = () => {
        navigate('/payment'); // Redirigir al componente de pago
    };

    if (!cart) return <div>Cargando carrito...</div>;

    return (
        <div style={{ backgroundColor: 'var(--color-bg)', padding: '1rem' }}>
            <h1>Tu Carrito</h1>
            {cart.length === 0 ? (
                <p style={{ color: 'var(--color-text)' }}>El carrito está vacío.</p>
            ) : (
                <>
                    <ul>
                        {cart.map(item => (
                            <li key={item._id} style={{ color: 'var(--color-text)' }}>
                                <h3>{item.name}</h3>
                                <p>Precio: ${(item.price)}</p>
                                <p>Cantidad: {item.quantity}</p>
                                <button onClick={() => removeFromCart(item._id)}>Eliminar</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleCheckout} className="btn btn-primary">Proceder a Pagar</button> {/* Botón de Checkout */}
                </>
            )
            }
        </div >
    );
};

export default Cart;