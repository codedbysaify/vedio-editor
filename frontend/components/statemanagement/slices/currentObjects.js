import { createSlice } from "@reduxjs/toolkit";

const slice1=createSlice({
    name:"information oabout current video ",
    initialState:[],
    reducers:{
        addToCurrentVideo:(state,action)=>{
            if(action.payload.type !== "text" && action.payload.type !== "subtitles"){
            let obj={
                url:action.payload.url,
                title:action.payload.title,
                type:action.payload.type
            }
            state.unshift(obj);
        }else{
            let obj={
                //in this case the url will be text aor subtitle text
                url:action.payload.url,
                title:action.payload.title,
                type:action.payload.type
            }
            state.push(obj);
        }
        }
    }
})
export const {addToCurrentVideo}=slice1.actions;
export default slice1.reducer