import { createSlice } from "@reduxjs/toolkit";

const slice1=createSlice({
    name:"To be decided",
    initialState:[],
    reducers:{
        increaseWidth:(state,action)=>{
            state.push("Hello world")
        }
    }
})
export const {increaseWidth}=slice1.actions;
export default slice1.reducer