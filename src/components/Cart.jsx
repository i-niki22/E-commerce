import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/slices/CartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * (item.quantity || 1), 0)
      .toFixed(2);
  };
  const proceedToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 mt-16">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        🛒 Shopping Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-md"
              />

              {/* Product Name */}
              <div className="flex-1 ml-4">
                <p className="font-medium text-gray-700">{item.title}</p>
              </div>

              {/* Price */}
              <p className="text-sm text-gray-500 mr-4">
                ${item.price.toFixed(2)}
              </p>

              {/* Remove  */}
              <button
                onClick={() => {
                  dispatch(removeFromCart(item.id));
                  toast.success("Product removed", {
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
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total & Checkout */}
          <div className="flex justify-between items-center mt-6 bg-white p-4 rounded-lg shadow-md">
            <span className="text-xl font-bold text-gray-800">
              Total: ${calculateTotal()}
            </span>
            <button
              onClick={proceedToCheckout}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-md"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
