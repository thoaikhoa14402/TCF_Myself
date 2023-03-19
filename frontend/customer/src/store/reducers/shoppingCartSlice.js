import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productDetails: {},
  products: [],
  totalBill: "0đ",
};

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    setProductDetails: (state, action) => {
      state.productDetails.name = action.payload.name || "";
      state.productDetails.price = action.payload.price || "";
      state.productDetails.totalPrice = action.payload.totalPrice || "";
      state.productDetails.img = action.payload.img || "";
      state.productDetails.quantity = action.payload.quantity || "";
      state.productDetails.note = action.payload.note || "";
    },
    increaseQuantityAndPrice: (state, action) => {
      // HANDLE FOR CASE: ADDING TO CART
      if (!action.payload) {
        state.productDetails.quantity++;
        // convert from price (string) to number (ex: 100.000vnđ = 100000)
        let productPrice = +state.productDetails.price.replace(/[^\d]/g, "");
        // calculate the price
        let totalPrice = productPrice * state.productDetails.quantity;
        // convert from price (number) to string (ex: 100.000vnđ)
        state.productDetails.totalPrice =
          String(totalPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
        // update total bill (price)
        // state.totalBill += totalPrice;
        // state.totalBill =
        //   String(state.totalBill).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"; // convert to string
      }
      // HANDLE FOR CASE: PRODUCTS EXISTED IN CART
      else {
        const productIndex = action.payload.id;
        state.products[productIndex].quantity++;
        // update total bill (price)
        let initialValue = 0;
        state.totalBill = state.products.reduce(
          (accumulator, curValue) =>
            accumulator +
            curValue.quantity * +curValue.price.replace(/[^\d]/g, ""),
          initialValue
        );
        state.totalBill =
          String(state.totalBill).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"; // convert to string
      }
    },
    decreaseQuantityAndPrice: (state, action) => {
      // HANDLE FOR CART ADDING CASE
      if (!action.payload) {
        state.productDetails.quantity =
          state.productDetails.quantity > 1
            ? state.productDetails.quantity - 1
            : 1;
        // convert from price (string) to number (ex: 100.000vnđ = 100000)
        let productPrice = +state.productDetails.price.replace(/[^\d]/g, "");
        // calculate the price
        let totalPrice = productPrice * state.productDetails.quantity;
        // convert from price (number) to string (ex: 100.000vnđ)
        state.productDetails.totalPrice =
          String(totalPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
        // update total bill (price)
        // state.totalBill += totalPrice;
        // state.totalBill =
        //   String(state.totalBill).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"; // convert to string
      }
      // HANDLE FOR CASE: PRODUCTS EXISTED IN CART
      else {
        const productIndex = action.payload.id;
        state.products[productIndex].quantity =
          state.products[productIndex].quantity > 0
            ? state.products[productIndex].quantity - 1
            : 0;
        if (state.products[productIndex].quantity === 0)
          state.products.splice(productIndex, 1);
        // update total bill (price)
        let initialValue = 0;
        state.totalBill = state.products.reduce(
          (accumulator, curValue) =>
            accumulator +
            curValue.quantity * +curValue.price.replace(/[^\d]/g, ""),
          initialValue
        );
        state.totalBill =
          String(state.totalBill).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"; // convert to string
      }
    },
    addToCart: (state, action) => {
      state.products.push(state.productDetails);
      // update total bill (price)
      let initialValue = 0;
      state.totalBill = state.products.reduce(
        (accumulator, curValue) =>
          accumulator +
          curValue.quantity * +curValue.price.replace(/[^\d]/g, ""),
        initialValue
      );
      state.totalBill =
        String(state.totalBill).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"; // convert to string
    },
  },
});

export const {
  setProductDetails,
  increaseQuantityAndPrice,
  decreaseQuantityAndPrice,
  addToCart,
} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
