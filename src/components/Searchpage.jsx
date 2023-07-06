import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

const SearchPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data;
  };

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery("products", fetchProducts);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchResults(filteredProducts);
  };

  const handleViewDetails = (product) => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const renderCards = () => {
    if (searchInput !== "" && searchResults.length === 0) {
      return <p>No search results found.</p>;
    }

    const productsToRender = searchInput !== "" ? searchResults : products;

    return productsToRender.map((product) => (
      <div className="col-md-3" key={product.id}>
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
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
          <button
            className="btn btn-light"
            onClick={() => handleViewDetails(product)}
          >
            View Details
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="container">
      <div className="mt-4 d-flex justify-content-center">
        <form
          onSubmit={handleFormSubmit}
          className="form-inline mb-4 justify-content-center"
        >
          <div
            className="input-group"
            style={{ maxWidth: "500px", width: "100%" }}
          >
            <input
              type="text"
              value={searchInput}
              className="form-control me-2"
              style={{ width: "50%" }}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Enter a product name"
            />
            <button className="btn btn-dark" type="submit">
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="row">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error: {error.message}</p>
        ) : (
          renderCards()
        )}
      </div>
    </div>
  );
};

export default SearchPage;
