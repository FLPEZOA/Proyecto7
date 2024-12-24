// src/pages/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
    const { token } = useAuth();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null); // Agregar estado de error

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!token) return; // Verificar que haya un token

            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error al obtener el perfil:', error);
                setError('No se pudo obtener el perfil del usuario.'); // Establecer mensaje de error para la UI
            }
        };

        fetchUserProfile();
    }, [token]);

    if (error) {
        return <div>{error}</div>; // Manejar el error en la UI
    }

    if (!user) {
        return <div>Cargando perfil...</div>; // Cargar mientras se espera la respuesta
    }

    return (
        <div>
            <h1>Perfil de Usuario</h1>
            <p>Email: {user.email}</p>
            <p>Nombre: {user.name}</p>
        </div>
    );
};

export default UserProfile;