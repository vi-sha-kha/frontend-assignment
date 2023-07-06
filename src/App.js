import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import SearchPage from "./components/Searchpage";
import ProductDetailsPage from "./components/ProductDetails";

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Dashboard />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
          </Routes>
        </div>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
