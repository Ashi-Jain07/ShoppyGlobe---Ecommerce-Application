import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

//Creating a store using redux
const appStore = configureStore({
    reducer: {
        cart: cartSlice
    }
})

export default appStore;