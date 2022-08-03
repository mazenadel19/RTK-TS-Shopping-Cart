import {
  createSelector,
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { checkout } from "../../app/api";
import { RootState } from "..";

export type ICheckoutState = "LOADING" | "READY" | "ERROR";

export interface ICartState {
  items: { [productID: string]: number };
  checkoutState: ICheckoutState;
  errorMessage: string;
}

const initialState: ICartState = {
  items: {},
  checkoutState: "READY",
  errorMessage: "",
};

export const checkoutCart = createAsyncThunk(
  "cart/checkout",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const items = state.cart.items;
    const response = await checkout(items);
    return response;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<string>) {
      state.checkoutState = "READY";
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      // if (state.items[id] > 1) {
      //   state.items[id]--;
      // } else {
      delete state.items[id];
      // }
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      state.items[id] = quantity;
    },
  },
  extraReducers: function (builder) {
    builder.addCase(checkoutCart.pending, (state, action) => {
      state.checkoutState = "LOADING";
    });
    builder.addCase(
      checkoutCart.fulfilled,
      (state, action: PayloadAction<{ success: boolean }>) => {
        const { success } = action.payload;
        if (success) {
          state.checkoutState = "READY";
          state.items = {};
        } else {
          state.checkoutState = "ERROR";
        }
      }
    );
    builder.addCase(checkoutCart.rejected, (state, action) => {
      state.checkoutState = "ERROR";
      state.errorMessage = action.error.message || "";
    });
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;

// selector
export const cartState = (state: RootState) => state.cart;

export const getNumItems = (state: RootState) => {
  let numItems = 0;
  const { items } = state.cart;
  //   numItems = Object.keys(items).length
  for (const id in items) {
    numItems += items[id];
  }
  return numItems;
};

/***
 * createSelector takes two types of arguments.
 * There are "Input Selectors" (and there can be more than one of these)
 * and then there's the "Result Function".
 *
 * You pass in these input selectors and then the result function
 * processes the data that gets returned.
 *
 * As long as the input values did't change, the generated selector
 * won't re-run the result function.
 */

export const getMemoizedNumItems = createSelector(
  (state: RootState) => state.cart.items, // Input Selectors
  (items) => {
    // Result Function
    console.log("getMemoizedNumItems called");
    let numItems = 0;
    for (const id in items) {
      numItems += items[id];
    }
    return numItems;
  }
);

// createSelector will take the items from the input Selector
// and pass it down to result function

export const getTotalPrice = createSelector(
  (state: RootState) => state.cart.items, // Input Selectors
  (state: RootState) => state.products.products, // Input Selectors
  (items, products) => {
    // Result Function
    let totalPrice = 0;
    for (const id in items) {
      totalPrice += products[id].price * items[id]; // price * quantity
    }
    return totalPrice.toFixed(2);
  }
);
