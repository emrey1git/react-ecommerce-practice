import { configureStore } from '@reduxjs/toolkit'
import appReducer from "./slices/appSlice.jsx";
import productReducer from "./slices/productSlice.jsx";
import basketReducer from "./slices/basketSlice.jsx";

export const store = configureStore({
  reducer: {
    app: appReducer,
    products: productReducer,
    basket: basketReducer,
  },
})