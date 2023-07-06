import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery(["product", id], async () => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    return data;
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        Product Details
      </h1>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "contain",
              }}
            />
          </div>
          <div className="col-md-6 p-3">
            <div className="border rounded p-3 shadow-sm mt-3">
              <h2>{product.title}</h2>
              <p className="fw-bold">Price: Rs. {product.price}</p>
              <p className="fw-bold">Description:</p>
              <p>{product.description}</p>
              <button className="btn btn-success" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsPage;
