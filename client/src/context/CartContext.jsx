import React, { createContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
    cart: JSON.parse(localStorage.getItem('carrito') ?? "[]"),
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const value = { ...state, cart: [...state.cart, action.payload] };
            localStorage.setItem('carrito', JSON.stringify(value.cart));
            return value;
        }
        case 'REMOVE_FROM_CART': {
            const value = {
                ...state,
                cart: state.cart.filter(item => item._id !== action.payload)
            };
            localStorage.setItem('carrito', JSON.stringify(value.cart));
            return value;
        }
        case 'CLEAR_CART': {

            const value = { ...state, cart: [] };
            localStorage.setItem('carrito', JSON.stringify(value.cart));
            return value;
        }
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return React.useContext(CartContext);
};