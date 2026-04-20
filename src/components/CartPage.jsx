import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/CartPage.css';

function CartPage() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart-page">
          <p className="empty-message">Your cart is empty</p>
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-page-content">
          <div className="cart-items-list">
            {cart.map(item => (
              <div key={item.id} className="cart-page-item">
                <img src={item.image} alt={item.name} className="cart-page-item-image" />
                
                <div className="cart-page-item-details">
                  <h3 className="cart-page-item-name">{item.name}</h3>
                  <p className="cart-page-item-price">${item.price.toFixed(2)}</p>
                  
                  <div className="cart-page-quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-page-item-actions">
                  <p className="item-subtotal">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    className="remove-item-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            
            <div className="summary-row">
              <span>Tax:</span>
              <span>${(calculateTotal() * 0.1).toFixed(2)}</span>
            </div>

            <div className="summary-total">
              <span>Total:</span>
              <span>${(calculateTotal() * 1.1).toFixed(2)}</span>
            </div>

            <button className="checkout-btn">Proceed to Checkout</button>
            
            <Link to="/" className="continue-shopping-link">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
