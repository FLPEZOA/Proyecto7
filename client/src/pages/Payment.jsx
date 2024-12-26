import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51QYIwvAVFYa7LJiI9yZe2xEbTMXV5wNpRDR4iKj5h0YEtMALpC8cBn1DdZvkXEXhHgNc2vw8E9tzoOMlQVdR0Ue500mEVaoBT0'); // Reemplaza con tu clave pública

const Payment = (cart) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        // Calcula el total a pagar sumando los precios de los productos en el carrito
        const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

        try {
            // Solicita crear un PaymentIntent al backend
            const { data: { clientSecret } } = await axios.post(`${import.meta.env.VITE_API_URL}/api/payments/create-payment-intent`, {
                amount: totalAmount, // Aquí se suman los precios
                currency: 'CLP', // Cambia según la moneda
            });

            const cardElement = elements.getElement(CardElement); // Obtiene el elemento de tarjeta

            // Confirma el pago con el cliente secreto obtenido
            const { error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (error) {
                setError(error.message); // Maneja el error
                setSuccess(false);
            } else {
                setSuccess(true); // El pago fue exitoso
                alert('¡Pago realizado exitosamente!');
                // Aquí puedes redirigir al usuario o actualizar el estado del carrito
            }
        } catch (err) {
            setError('Error al procesar el pago. Intenta de nuevo.');
            console.error('Error en el proceso de pago:', err);
        } finally {
            setIsLoading(false); // Termina el estado de carga
        }
    };

    return (
        <div style={{ backgroundColor: 'var(--color-bg)', padding: '2rem' }}> {/* Estilo de fondo */}
            <h2 style={{ color: 'var(--color-text)' }}>Proceso de Pago</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>} {/* Mensaje de error */}
            {success && <div style={{ color: 'green' }}>¡Pago exitoso!</div>} {/* Mensaje de éxito */}

            <form onSubmit={handleSubmit}>
                <div>
                    <label style={{ color: 'var(--color-text)' }}>Nombre del Titular:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoComplete="off"
                        style={{
                            width: '100%',
                            border: '1px solid gray',
                            borderRadius: '5px',
                            padding: '0.5em',
                            marginBottom: '1em'
                        }} 
                    />
                </div>
                <div>
                    <label style={{ color: 'var(--color-text)' }}>Información de la Tarjeta:</label>
                    <CardElement className="border border-gray-300 rounded p-2" /> {/* Clase para el CardElement */}
                </div>
                <button type="submit" disabled={!stripe || isLoading} style={{
                    backgroundColor: 'var(--color-button)',
                    color: 'white',
                    padding: '0.6em 1.2em',
                    borderRadius: '5px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.25s'
                }}>
                    {isLoading ? 'Cargando...' : 'Pagar'}
                </button>
            </form>
        </div>
    );
};

export default Payment;