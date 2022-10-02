import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./slices/navSlicer";

export const store = configureStore({
    reducer : {
        nav: navReducer,
    },
});