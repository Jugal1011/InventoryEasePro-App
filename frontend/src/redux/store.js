import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";
import authReducer from "./features/authSlice";
import filterReducer from "./features/filterSlice";

export const store = configureStore({
    reducer:{
        auth: authReducer,
        product: productReducer,
        filter: filterReducer
    }
})
