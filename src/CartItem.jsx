import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";
import { useNavigate } from "react-router-dom";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce(
      (total, item) =>
        total + parseFloat(item.cost.replace("$", "")) * item.quantity,
      0
    );
  };

  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    } else {
      navigate("/product-list", { replace: true });
    }
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: Math.max(1, item.quantity - 1),
      })
    );
  };

  // Handle remove item
  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return parseFloat(item.cost.replace("$", "")) * item.quantity;
  };

  // Handle checkout
  const handleCheckout = () => {
    alert("Coming soon!");
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount().toFixed(2)}
      </h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item).toFixed(2)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      ></div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
