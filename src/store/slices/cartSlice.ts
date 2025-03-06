import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  discountedPrice?: number;
  quantity: number;
  image: string;
  type: "package" | "product";
  addedAt: number; // Timestamp to track when item was added
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<Omit<CartItem, "quantity" | "addedAt">>
    ) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.addedAt = Date.now(); // Update the timestamp
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          addedAt: Date.now(),
        });
      }

      // Recalculate total
      state.total = state.items.reduce((sum, item) => {
        const itemPrice = item.discountedPrice || item.price;
        return sum + itemPrice * item.quantity;
      }, 0);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      // Recalculate total
      state.total = state.items.reduce((sum, item) => {
        const itemPrice = item.discountedPrice || item.price;
        return sum + itemPrice * item.quantity;
      }, 0);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        item.addedAt = Date.now(); // Update the timestamp when quantity changes
      }

      // Recalculate total
      state.total = state.items.reduce((sum, item) => {
        const itemPrice = item.discountedPrice || item.price;
        return sum + itemPrice * item.quantity;
      }, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
