import React, { useState } from "react";
import "./MenuItemCard.css";

const MenuCard = ({ item, onAddToCart }) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => (c > 0 ? c - 1 : 0));

  const addCart = () => {
    if (count > 0) {
      onAddToCart(item._id, count);
      setCount(0);
    }
  };

  return (
    <div className="menu-card">
      <img src={item.image} alt={item.name} />
      <div className="menu-details">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <span className="price">₹{item.price}</span>
        <div className="cart-controls">
          <div className="incre"> {count}</div>
          <button className="order-button" onClick={addCart}>
            Add
          </button>
          <button className="plus" onClick={decrement}>
            -
          </button>
          <button className="plus" onClick={increment}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
