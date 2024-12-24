import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProductDetail = () => {
    const { id } = useParams();
    const { token } = useAuth(); // Obtener el token de autenticación
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error al obtener el producto:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const addToCart = async () => {
        if (!token) {
            alert('Por favor, inicie sesión para agregar al carrito.');
            return;
        }

        try {
            await axios.post('/api/cart/add', { productId: product._id, quantity: 1 }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Producto agregado al carrito.');
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
            alert('No se pudo agregar el producto al carrito.');
        }
    };

    if (!product) return <div>Cargando detalles del producto...</div>;

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Precio: ${product.price / 100}</p> {/* Asumir que el precio está en centavos */}
            <img src={product.imageUrl} alt={product.name} />
            <button onClick={addToCart}>Agregar al Carrito</button> {/* Botón para agregar al carrito */}
        </div>
    );
};

export default ProductDetail;