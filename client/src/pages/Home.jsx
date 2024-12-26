import React from 'react';
import donutIcon from '../assets/iconodonut.avif';

const Home = () => {
    return (
        <div className="home-container" style={{ backgroundColor: 'var(--color-bg)', padding: '2rem' }}>
            <h1 className="home-title" style={{ color: 'var(--color-text)' }}>Bienvenido a la Tienda de Donuts</h1>
            <img src={donutIcon} alt="Icono de Donut" className="donut-icon" style={{ display: 'block', margin: '0 auto', width: '150px' }} />
        </div>
    );
};

export default Home;