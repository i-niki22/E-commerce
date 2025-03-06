import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../slices/ProductSlice";
import cartReducer from "../slices/CartSlice";

export const Store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
});

export default Store;
