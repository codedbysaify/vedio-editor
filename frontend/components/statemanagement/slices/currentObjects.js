import { createSlice } from "@reduxjs/toolkit";

const slice1=createSlice({
    name:"information oabout current video ",
    initialState:[],
    reducers:{
        addToCurrentVideo:(state,action)=>{
            let obj={
                url:action.payload.url,
                title:action.payload.title,
                type:action.payload.type
            }
            state.unshift(obj);
        }
    }
})
export const {addToCurrentVideo}=slice1.actions;
export default slice1.reducer