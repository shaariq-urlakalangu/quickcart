import React from 'react';
import ProductList from './ProductList';
import { useCart } from '../context/CartContext';

function HomePage({ products, searchTerm }) {
  const { addToCart } = useCart();

  // Filter products based on searchTerm
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      {searchTerm && (
        <p className="search-results">
          Found {filteredProducts.length} products
        </p>
      )}

      {filteredProducts.length === 0 ? (
        <p className="no-results">No products found</p>
      ) : (
        <ProductList
          products={filteredProducts}
          onAddToCart={addToCart}
        />
      )}
    </div>
  );
}

export default HomePage;
