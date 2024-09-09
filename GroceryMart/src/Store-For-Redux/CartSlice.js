import { createSlice } from '@reduxjs/toolkit';


const CartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addtocart(state, action) {
      let find = state.findIndex(item => item.item === action.payload._id);
      if (find >= 0) {
        state[find].quantity += 1;
      } else {
        state.push({ item: action.payload._id, quantity: 1 });
        console.log(action.payload._id);
      }
    },
    addMultipleItemsToCart(state, action) {
      action.payload.forEach(item => {
        let find = state.findIndex(cartItem => cartItem.item === item.item);
        if (find >= 0) {
          state[find].quantity = item.quantity;
        } else {
          state.push({ item: item.item, quantity: item.quantity });
        }
      });
    },
    decrement(state, action) {
      let find = state.findIndex(item => item.item === action.payload._id);
      if (state[find].quantity > 1) {
        state[find].quantity -= 1;
      } else {
        return state.filter(items => items.item !== action.payload._id);
      }
    },
    increment(state, action) {
      let find = state.findIndex(item => item.item === action.payload._id);
      state[find].quantity += 1;
    },
    deleteitem(state, action) {
      return state.filter(items => items.item !== action.payload._id);
    },
    emptyCart() {
      return [];
    }
  },
});

export const { addtocart, decrement, increment, deleteitem ,addMultipleItemsToCart,emptyCart} = CartSlice.actions;
export default CartSlice.reducer;