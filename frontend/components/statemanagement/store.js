import { configureStore } from "@reduxjs/toolkit";
import reducer1 from "./slices/slice";
export const store=configureStore({
    reducer:{
        s1reducer:reducer1
    }
})