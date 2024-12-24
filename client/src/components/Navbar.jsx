import React from 'react';
import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    // const { user, logout } = useAuth();  // Descomenta cuando uses el contexto


    const user = null; // Cambia esto por tu lógica de autenticación real

    return (
        <nav className='flex flex-row justify-between'>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Productos</Link></li>
                <li><Link to="/cart">Carrito</Link></li>
            </ul>
            <ul>
                {user ? ( // Corregido la sintaxis de los condicionales
                    <>
                        <li><Link to="/profile">Mi Perfil</Link></li>
                        <li>
                            <button
                                onClick={() => {
                                    // Aquí debes llamar a tu función de logout
                                    // logout();
                                    console.log('Cerrar sesión'); // Solo para el ejemplo
                                }}
                            >
                                Cerrar Sesión
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li><Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/login">Log In</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;