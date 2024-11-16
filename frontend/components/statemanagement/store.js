import { configureStore } from "@reduxjs/toolkit";

import currentVideo from "./slices/currentObjects";
export const store=configureStore({
    reducer:{
        currentVideo:currentVideo   
    }
})