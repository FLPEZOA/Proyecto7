import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductItem from '../components/ProductItem';
import { useCart } from '../context/CartContext';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const { state: { cart }, dispatch } = useCart();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error al obtener productos:', error);
                setError('No se pudieron cargar los productos.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
        alert(`${product.name} ha sido agregado al carrito!`);
    };

    if (loading) return <p>Cargando productos...</p>; // Mensaje de carga
    if (error) return <p style={{ color: 'red' }}>{error}</p>; // Mostrar error

    return (
        <div className="container mx-auto px-4">
            <h1 className="my-4 text-center">Lista de Productos</h1>
            <div className="grid grild-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 -mx-4"> {/* Usa Flexbox */}
                {products.map(product => (
                    <ProductItem product={product} onAdd={handleAddToCart} key={product._id} />
                ))}
            </div>

            {/* Mostrar los productos en el carrito */}
            <h2 className="my-4">Productos en el Carrito:</h2>
            {cart.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>{item.name}</li> // Mostrar nombre de cada producto en el carrito
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProductList;
