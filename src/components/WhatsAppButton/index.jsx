import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaWhatsapp, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';

const WhatsAppButton = ({ 
  phoneNumber = '1234567890', 
  message = 'Hello! I would like to inquire about your jewelry collection.',
  cartItems = [],
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Calculate total items in cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

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
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
      {/* Cart Summary Panel */}
      {isOpen && cartItems.length > 0 && (
        <div className="bg-white rounded-lg shadow-xl p-4 mb-4 flex flex-col space-y-3 w-80 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-800 font-semibold text-lg">Your Cart ({totalItems} items)</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-red-500 transition-colors p-1 -mr-1"
              aria-label="Close cart"
            >
              <FaTrash className="w-5 h-5" />
            </button>
          </div>
          
          {/* Cart Items */}
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
          
          {/* Total and Send Button */}
          <div className="pt-2">
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
      
      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500 hover:bg-blue-600 text-white shadow-2xl transition-all duration-300 relative"
        aria-label={isOpen ? 'Close cart' : 'View cart'}
      >
        <FaWhatsapp className="w-9 h-9" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
            {totalItems > 4 ? '4+' : totalItems}
          </span>
        )}
      </button>
    </div>
  );
};

WhatsAppButton.propTypes = {
  phoneNumber: PropTypes.string,
  message: PropTypes.string,
  cartItems: PropTypes.array,
  onIncreaseQuantity: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onRemoveItem: PropTypes.func
};

export default WhatsAppButton;