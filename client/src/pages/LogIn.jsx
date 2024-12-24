import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'; // Importar el hook de autenticación

const LogIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, { email, password });
            login(response.data); 
            navigate('/profile'); 
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error al iniciar sesión');
        }
    };

    return (
        <div className='max-w-[340px] mx-auto'>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col'>
                        <label>Email</label>
                        <input
                            type="email"
                            className='border border-solid px-2 py-1 rounded-md'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label>Password</label>
                        <input
                            type="password"
                            className='border border-solid px-2 py-1 rounded-md'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña"
                            required
                        />
                    </div>
                    <button type="submit" className='bg-[#1f7cf1] text-white rounded-md'>Iniciar Sesión</button>
                </div>
            </form>
        </div>
    );
};

export default LogIn;