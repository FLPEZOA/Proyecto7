import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
    const [cart, setCart] = useState(null);
    const { token } = useAuth(); // Obtener el token de autenticación

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart`); // Verifica que la ruta sea correcta
                setCart(response.data); // Asumimos que la respuesta es la lista del carrito
            } catch (error) {
                console.error('Error al obtener el carrito:', error.response ? error.response.data : error.message);
                setError('No se pudo obtener el carrito.');
            }
        };

        fetchCart();
    }, [token]);

    const removeFromCart = async (productId) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/cart/remove`, { productId }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // Actualizar el carrito después de eliminar
            setCart(prevCart => ({
                ...prevCart,
                products: prevCart.products.filter(item => item.productId._id !== productId),
            }));
        } catch (error) {
            console.error('Error al eliminar del carrito:', error);
        }
    };

    if (!cart) return <div>Cargando carrito...</div>;

    return (
        <div>
            <h1>Tu Carrito</h1>
            {cart.products.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
                <ul>
                    {cart.products.map(item => (
                        <li key={item.productId._id}>
                            <h3>{item.productId.name}</h3>
                            <p>Precio: ${item.productId.price / 100}</p>
                            <p>Cantidad: {item.quantity}</p>
                            <button onClick={() => removeFromCart(item.productId._id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;