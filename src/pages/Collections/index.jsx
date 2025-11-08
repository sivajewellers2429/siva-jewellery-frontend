import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FeaturedCollections from '../../components/FeaturedCollections';

const CollectionsPage = ({ updateCartItems, cartItems }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search collections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-12 text-gray-700 bg-gray-50 rounded-l-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-sm transition-all"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <button 
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-4 rounded-r-2xl font-semibold transition-colors duration-300 shadow-sm"
                onClick={() => {}}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedCollections 
            updateCartItems={updateCartItems} 
            cartItems={cartItems} 
            searchTerm={searchTerm}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-amber-500 to-amber-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Need Help Choosing?
            </h2>
            <p className="text-lg text-amber-50 mb-8 leading-relaxed">
              Our expert consultants are here to guide you in selecting the perfect piece that matches your style and occasion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors duration-300 shadow-lg">
                Schedule Consultation
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-600 transition-all duration-300">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CollectionsPage;