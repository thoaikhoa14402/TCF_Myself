import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import shoppingCartReducer from "./reducers/shoppingCartSlice";
import paymentReducer from "./reducers/paymentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    shoppingCart: shoppingCartReducer,
    paymentInformation: paymentReducer,
  },
});
