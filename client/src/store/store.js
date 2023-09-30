import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./StoreSlices/userSlice";

const store = configureStore({
    reducer:{
        user:userSlice,
    }
})

export default store;