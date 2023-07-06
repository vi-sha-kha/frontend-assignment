import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../store/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const renderCartItems = cartItems.map((item) => (
    <div className="col-md-4" key={item.id}>
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={item.image}
          className="card-img-top"
          alt={item.title}
          style={{ height: "300px" }}
        />
        <div className="card-body" style={{ height: "200px" }}>
          <div className="card-content">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">Rs. {item.price}</p>
          </div>
          <div className="card-footer" style={{ height: "90px" }}>
            <button
              className="btn btn-danger"
              onClick={() => handleRemoveFromCart(item.id)}
            >
              Remove Item
            </button>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Cart Items</h1>
      <div className="row">{renderCartItems}</div>
    </div>
  );
};

export default Cart;
