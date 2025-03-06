import React from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4 mt-16">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Details
          </h2>
          <p className="text-gray-500">Complete your purchase securely</p>
        </div>

        {/* Card Preview */}
        <div className="relative h-48 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white float-animation">
          <div className="mt-16">
            <div
              className="text-xl tracking-widest mb-2"
              id="cardNumberPreview"
            >
              •••• •••• •••• ••••
            </div>
            <div className="flex justify-between">
              <div>
                <div className="text-xs opacity-75">Card Holder</div>
                <div className="text-sm" id="cardHolderPreview">
                  YOUR NAME
                </div>
              </div>
              <div>
                <div className="text-xs opacity-75">Expires</div>
                <div className="text-sm" id="expiryPreview">
                  MM/YY
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <form className="mt-8 space-y-6">
          <div className="relative">
            <input
              type="text"
              id="cardHolder"
              className="card-input block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none placeholder-transparent"
              placeholder="Card Holder Name"
              required
              onInput={(e) =>
                (document.getElementById("cardHolderPreview").textContent =
                  e.target.value || "YOUR NAME")
              }
            />
            <label className="card-label absolute left-4 top-3 text-gray-500 transition-all duration-200">
              Card Holder Name
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              id="cardNumber"
              className="card-input block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none placeholder-transparent"
              placeholder="Card Number"
              maxLength="19"
              required
              onInput={(e) => {
                let value = e.target.value
                  .replace(/\W/gi, "")
                  .replace(/(.{4})/g, "$1 ");
                e.target.value = value;
                document.getElementById("cardNumberPreview").textContent =
                  value || "•••• •••• •••• ••••";
              }}
            />
            <label className="card-label absolute left-4 top-3 text-gray-500 transition-all duration-200">
              Card Number
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                id="expiry"
                className="card-input block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none placeholder-transparent"
                placeholder="MM/YY"
                maxLength="5"
                required
                onInput={(e) => {
                  let value = e.target.value.replace(/\D/g, "");
                  if (value.length > 4) value = value.slice(0, 4);
                  if (value.length > 2)
                    value = value.slice(0, 2) + "/" + value.slice(2);
                  e.target.value = value;
                  document.getElementById("expiryPreview").textContent =
                    value || "MM/YY";
                }}
              />
              <label className="card-label absolute left-4 top-3 text-gray-500 transition-all duration-200">
                Expiry Date
              </label>
            </div>
            <div className="relative">
              <input
                type="password"
                id="cvv"
                className="card-input block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none placeholder-transparent"
                placeholder="CVV"
                maxLength="3"
                required
              />
              <label className="card-label absolute left-4 top-3 text-gray-500 transition-all duration-200">
                CVV
              </label>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-[#1e2939] hover:bg-[#253143] text-white font-bold py-2 px-6 rounded-md"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-[#1e2939] hover:bg-[#253143] text-white font-bold py-2 px-6 rounded-md"
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
