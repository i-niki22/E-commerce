import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/ProductSlice";
import { addToCart } from "../redux/slices/CartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const ProductList = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = items.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-16">
      <ToastContainer />
      {/* Search  */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="🔍 Search Products..."
          className="border border-gray-300 p-3 w-full max-w-lg rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Loading Indicator */}
      {status === "loading" && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-600 text-lg mt-6">
          No products found
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <img
                className="w-full h-64 object-contain rounded-md"
                src={product.image}
                alt={product.title}
              />
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                  {product.description}
                </p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-blue-500 font-bold text-lg product-price">
                  ${product.price}
                </span>
                <button
                  onClick={() => {
                    dispatch(addToCart(product));
                    toast.success("Product added to cart", {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      theme: "colored",
                      style: { backgroundColor: "#1e2939", color: "#ffffff" },
                    });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all cart-btn"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Pagination */}
      <div className="mt-6 flex justify-center space-x-4 ">
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#1e2939] hover:bg-[#101826] text-white"
          }`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            indexOfLastProduct >= filteredProducts.length
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#1e2939] hover:bg-[#101826] text-white"
          }`}
          disabled={indexOfLastProduct >= filteredProducts.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
