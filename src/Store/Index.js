import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./UiSlice";
import cartSlice from "./CartSlice";

const Store = configureStore({
    reducer:{ui: uiSlice.reducer, cart:cartSlice.reducer}
})

export default Store;