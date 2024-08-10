import { PRODUCTS } from "./products";
import { useState } from "react";
import "./style.css";

function getDefaultCart() {
  let cart = {};
  for (let i = 1; i < PRODUCTS.length +1; i++) {
    cart[i] = 0;
  }
  return cart;
}

export default function App() {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  // console.log(cartItems);

  function addToCart(itemId) {
    setCartItems((prev) => ({...prev, [itemId]: prev[itemId]+1}));
  }

  function removeFromCart(itemId) {
    setCartItems((prev) => ({...prev, [itemId]: prev[itemId]-1}));
  }

  function updateCartItemCount(newAmount, itemId) {
    setCartItems((prev) => ({...prev, [itemId]: newAmount}));
  }

  function getTotalCartAmount() {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  }

  return (
    <div>
        <div className="shopTitle">
          <h1>Christian's Shop</h1>
        </div>
        <div className="container">
          <Shop cartItems={cartItems} addToCart={addToCart}/>
          <Cart cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} updateCartItemCount={updateCartItemCount} getTotalCartAmount={getTotalCartAmount} />
        </div>
    </div>
  );
}

function Shop({ cartItems, addToCart }) {
  return (
    <div className="products">
      {PRODUCTS.map((product) => (<Product product={product} cartItems={cartItems} addToCart={addToCart} key={product.id} />))}
    </div>
  );
}

function Product({ product, cartItems, addToCart }) {
  const cartItemAmount = cartItems[product.id];

  return (
    <div className="product">
      <img src={product.productImage} alt={product.productName} />
      <div className="description">
        <h3>{product.productName}</h3>
        <p>${product.price}</p>
      </div>
      <button className="addToCartBttn" onClick={() => addToCart(product.id)}>
        Add to cart {cartItemAmount > 0 && <>({cartItemAmount})</>}
      </button>
    </div>
  )
}

function Cart({ cartItems, addToCart, removeFromCart, updateCartItemCount, getTotalCartAmount }) {
  const totalAmount = getTotalCartAmount();

  return (
    <div className={totalAmount > 0 ? "cartNotEmpty" : "cart"}>
      <h3>Your cart</h3>
      {PRODUCTS.map((product) => {
        if (cartItems[product.id] !== 0) {
          return <CartItem product={product} cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} updateCartItemCount={updateCartItemCount} />
        }
      })}
      {totalAmount > 0 ? (
        <div className="checkout">
        <p>Subtotal: ${getTotalCartAmount()}</p>
        <button>Checkout</button>
      </div>
      ) : (<h4>Your cart is empty</h4>)}
    </div>
  );
}

function CartItem({ product, cartItems, addToCart, removeFromCart, updateCartItemCount }) {
  return (
    <div className="cartItem">
      <img src={product.productImage} alt={product.productName} />
      <div className="description">
        <h4>{product.productName}</h4>
        <p>${product.price}</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(product.id)}> - </button>
          <input value={cartItems[product.id]} onChange={(e) => updateCartItemCount(Number(e.target.value),product.id)} />
          <button onClick={() => addToCart(product.id)}> + </button>
        </div>
      </div>
    </div>
  );
}

