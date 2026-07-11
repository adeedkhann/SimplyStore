import { createContext, useContext, useState, useEffect } from 'react';
import { cartItems as initialCart } from '../data/mockData';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(initialCart);
  const [wishlist, setWishlist] = useState([]);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal >= 150 ? 0 : 9.99;
  const tax = subtotal * 0.085;
  const total = subtotal + shipping + tax;
  const freeShippingThreshold = 150;
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  function addToCart(product) {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        brand: product.brand,
        color: product.colors?.[0] || '',
        price: product.price,
        qty: 1,
        image: product.image,
      }];
    });
  }

  function updateQty(id, delta) {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(item => item.id !== id));
  }

  function toggleWishlist(id) {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }

  function isWishlisted(id) {
    return wishlist.includes(id);
  }

  return (
    <CartContext.Provider value={{
      cart, totalItems, subtotal, shipping, tax, total,
      freeShippingThreshold, amountForFreeShipping,
      addToCart, updateQty, removeFromCart,
      wishlist, toggleWishlist, isWishlisted,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
