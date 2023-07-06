import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  searchResults: [],
  selectedProduct: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cartItems.push(action.payload);
      console.log("Handling addToCart action:", action.payload);
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    setSearchResults(state, action) {
      state.searchResults = action.payload;
    },
    selectProduct(state, action) {
      state.selectedProduct = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, setSearchResults, selectProduct } =
  cartSlice.actions;

export default cartSlice.reducer;
