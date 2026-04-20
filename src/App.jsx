import React from 'react';
import { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import { products } from './data/products';
import './styles/App.css';

function App() {

    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart=(product)=>{
        console.log('Adding to cart:', product);
        const existingItem=cart.find((item)=>{
            return item.id==product.id;
        })
        if(existingItem){
            setCart(cart.map((item)=>{
                return item.id==product.id ? {...item, quantity: item.quantity+1} : item;
            }));
        }
        else{
            setCart([...cart,{...product,quantity: 1}]);
        }
    }

    const removeFromCart=(productId)=>{
        console.log("Removing from cart:",productId);
        setCart(cart.filter((item)=>{
            return item.id!==productId;
        }));
    }

    const updateQuantity=(productId, newQuantity)=>{
        console.log("Updating item quantity from cart:",productId);
        if(newQuantity<=0){
            removeFromCart(productId);
        }
        else{
            setCart(cart.map((item)=>{
                return item.id==productId ? {...item,quantity: newQuantity} : item;
            }));
        }
    }

    const toggleCart=()=>{
        console.log("Toggling cart");
        setIsCartOpen(!isCartOpen);
    }

    const getTotalItems=()=>{
        return cart.reduce((total,item)=>{
            return total+item.quantity;
        },0);
    }

    return (
        <div className="app">
            <Header cartItemCount={getTotalItems()} onCartClick={toggleCart} />
            <main className="main-content">
                <ProductList products={products} onAddToCart={addToCart} />
            </main>

            <CartSidebar isOpen={isCartOpen} onClose={toggleCart} cart={cart} onUpdateQuantity={updateQuantity} onRemoveItem={removeFromCart} />
        </div>
    );
}

export default App;