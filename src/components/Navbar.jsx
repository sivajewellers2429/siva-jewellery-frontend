import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaMinus, FaPlus, FaWhatsapp, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ cartItems = [], onIncreaseQuantity, onDecreaseQuantity }) => {
  // Calculate total items in cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle send to WhatsApp
  const handleSendToWhatsApp = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items to cart first.');
      return;
    }
    
    // Format cart items for WhatsApp message
    let cartMessage = 'Hello! I would like to order the following items:\n';
    
    cartItems.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      cartMessage += `${index + 1}. ${item.name} (Qty: ${item.quantity}) - ₹${itemTotal.toLocaleString('en-IN')}\n`;
    });
    
    cartMessage += `\nTotal: ₹${totalPrice.toLocaleString('en-IN')}\n\nPlease confirm availability and provide payment details.`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(cartMessage);
    
    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/919505492525?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Close cart panel
    setIsCartOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-amber-800">
              Siva Jewellery
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-amber-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-amber-600 px-3 py-2 font-medium">
                Home
              </Link>
              <Link to="/collections" className="text-gray-700 hover:text-amber-600 px-3 py-2 font-medium">
                Collections
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-amber-600 px-3 py-2 font-medium">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-amber-600 px-3 py-2 font-medium">
                Contact
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-amber-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button 
              className="text-gray-700 hover:text-amber-600 relative"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <FaShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems > 4 ? '4+' : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/collections" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Collections
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
      
      {/* Cart Panel */}
      {isCartOpen && totalItems > 0 && (
        <div className="absolute right-4 top-16 bg-white rounded-lg shadow-xl p-4 w-80 z-50 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-800 font-semibold text-lg">Your Cart ({totalItems} items)</h3>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-3">
            {cartItems.map((item) => {
              const itemTotal = item.price * item.quantity;
              return (
                <div key={item.id} className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <div className="flex-1">
                    <h4 className="text-gray-800 font-medium text-sm">{item.name}</h4>
                    <p className="text-amber-600 font-semibold text-sm">₹{itemTotal.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => onDecreaseQuantity && onDecreaseQuantity(item.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-amber-600 hover:bg-amber-50 font-bold text-lg"
                      aria-label="Decrease quantity"
                    >
                      <FaMinus className="w-3 h-3" />
                    </button>
                    <span className="font-semibold text-gray-800 w-8 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => onIncreaseQuantity && onIncreaseQuantity(item.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-amber-600 hover:bg-amber-50 font-bold text-lg"
                      aria-label="Increase quantity"
                    >
                      <FaPlus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-gray-800">Total:</span>
              <span className="font-bold text-lg text-amber-700">₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
            <button
              onClick={handleSendToWhatsApp}
              className="w-full flex items-center justify-center px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all duration-300"
            >
              <FaWhatsapp className="w-5 h-5 mr-2" />
              Send Order
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;