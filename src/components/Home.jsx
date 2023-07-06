import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addtoCart = (product) => {
    dispatch(addToCart(product));
  };

  const renderCards = () => {
    return products.map((product) => (
      <div className="col-md-3 mb-4" key={product.id}>
        <div className="card" style={{ width: "18rem", minHeight: "400px" }}>
          <img
            src={product.image}
            className="card-img-top"
            alt={product.title}
            style={{ objectFit: "contain", height: "200px" }}
          />
          <div className="card-body d-flex flex-column justify-content-between">
            <div>
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">Price: Rs. {product.price}</p>
            </div>
            <div>
              <button
                className="btn btn-success"
                onClick={() => addtoCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
          <Link to={`/product/${product.id}`}>
            <button className="btn btn-light">View Details</button>
          </Link>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Products</h1>
      <div className="row">{renderCards()}</div>
    </div>
  );
}

export default Products;
