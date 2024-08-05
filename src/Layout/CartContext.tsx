import axios from 'axios';
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { base_url } from '../utils';

// Define a type for the context value
interface CartContextType {
    cartCount: number;
    setCartCount: (count: number) => void;
}

// Create the context with a default value of type CartContextType
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to use the cart context
export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

// Define the provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartCount, setCartCount] = useState<number>(0);

    useEffect(() => {
        // Function to fetch the initial cart count from an API or other data source
        const fetchInitialCartCount = async () => {
            const token: string | null = localStorage.getItem('_token') ?? null;
            try {
                // Replace with your API call
                const response = await axios.get(base_url + 'cart/cart_count', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }) // Example API endpoint

                setCartCount(response.data.data);
            } catch (error) {
                console.error('Failed to fetch initial cart count:', error);
                // Optionally, handle error
            }
        };

        fetchInitialCartCount();
    }, []); // Empty dependency array to run only once on mount

    return (
        <CartContext.Provider value={{ cartCount, setCartCount }}>
            {children}
        </CartContext.Provider>
    );
};
