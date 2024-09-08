import { createSlice } from "@reduxjs/toolkit";

//Creating Slice
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: []
    },
    reducers: {
        additem: (state, action) => {
            let item = state.items.find(item => item.id == action.payload.id);

            const data = { ...action.payload, quantity: 1 };

            if (!item) {
                state.items.push(data);
            }
            else {
                item.quantity++;
            }
        },
        removeItem: (state, action) => {
            let item = state.items.find(item => item.id == action.payload.id);
            item.quantity--;
            if (item.quantity == 0) {
                const arr = state.items.filter((item) => item.id != action.payload.id);
                state.items = arr;
            }
        },
        clearCart: (state, action) => {
            state.items.length = 0;
        }
    }
})

export const { additem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;