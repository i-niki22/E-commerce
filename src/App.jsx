import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./style/index.css";
import Checkout from "./components/Checkout";
function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-800 text-white flex justify-between fixed top-0 left-0 w-full shadow-md z-50">
        <Link to="/">Product List</Link>
        <Link to="/cart">🛒Cart</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
