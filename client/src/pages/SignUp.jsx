import React, { useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SignUp = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, { email, password, name });
            console.log(response.data);
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            navigate("/login");
        } catch (error) {
            console.error('Error al registrarse:', error);
            alert("Error al registrarse");
        }
    }, [email, password, name]);

    return (
        <div className='max-w-[340px] mx-auto'>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col'>
                        <label>Nombre</label>
                        <input type="text" className='border border-solid px-2 py-1 rounded-md' value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" required />
                    </div>
                    <div className='flex flex-col'>
                        <label>Email</label>
                        <input type="email" className='border border-solid px-2 py-1 rounded-md' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                    </div>
                    <div className='flex flex-col'>
                        <label>Password</label>
                        <input type="password" className='border border-solid px-2 py-1 rounded-md' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
                    </div>

                    <button type="submit" className='bg-[#1f7cf1] text-white rounded-md'>Registrarse</button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;