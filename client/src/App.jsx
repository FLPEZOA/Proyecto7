import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext'; // Importa el AuthProvider
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import UserProfile from './pages/UserProfile';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import { Layout } from './components/Layout';
import Navbar from './components/Navbar'; // Navbar puede ser utilizado en Layout si es necesario
import Cart from './pages/Cart';
import Payment from './pages/Payment'; // Asegúrate de que este componente exista
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import './styles/custom.css';
import { CartProvider } from './context/CartContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe('pk_test_51QYIwvAVFYa7LJiI9yZe2xEbTMXV5wNpRDR4iKj5h0YEtMALpC8cBn1DdZvkXEXhHgNc2vw8E9tzoOMlQVdR0Ue500mEVaoBT0');

const App = () => {
  return (
    <AuthProvider> {/* Envuelve con el AuthProvider */}
      <CartProvider>
        <Router>
          <Elements stripe={stripePromise}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/payment" element={<Payment />} /> {/* Cambiado de component a element */}
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/success" element={<Success />} />
                <Route path="/cancel" element={<Cancel />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetail />} />
              </Route>
            </Routes>
          </Elements>
        </Router>
      </CartProvider>
    </AuthProvider >
  );
};

export default App;