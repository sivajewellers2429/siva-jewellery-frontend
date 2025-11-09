import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';

// Page Components
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Collections from './pages/Collections';

function App() {
  const [cartItems, setCartItems] = useState([]);

  // Function to update cart items - will be passed to components that need it
  const updateCartItems = (newCartItems) => {
    setCartItems(newCartItems);
  };

  // Handle quantity increase
  const handleIncreaseQuantity = (itemId) => {
    setCartItems(cartItems.map(item => 
      item.id === itemId 
        ? { ...item, quantity: item.quantity + 1 } 
        : item
    ));
  };

  // Handle quantity decrease
  const handleDecreaseQuantity = (itemId) => {
    setCartItems(cartItems.map(item => {
      if (item.id === itemId) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          // If quantity is 1, remove item from cart
          return null;
        }
      }
      return item;
    }).filter(Boolean)); // Remove null items
  };

  // Handle remove item
  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <ScrollToTop />
      <Navbar 
        cartItems={cartItems} 
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
      />
      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<Home updateCartItems={updateCartItems} cartItems={cartItems} />} />
          <Route path="/home" element={<Home updateCartItems={updateCartItems} cartItems={cartItems} />} />
          <Route path="/collections" element={<Collections updateCartItems={updateCartItems} cartItems={cartItems} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton 
        phoneNumber="919505492525"
        message="Hello! I'm interested in your jewelry collection."
        cartItems={cartItems}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}

export default App;