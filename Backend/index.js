import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import staticData from "./routes/staticData.js";
import uploaddata from "./routes/uploadData.js"
const app=express();
const port=process.env.PORT || 3000;

if(process.env.NODE_ENV === 'production'){
    dotenv.config({path:".env.production"})
}else{
    dotenv.config();
}
app.use(cors());
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Hello From the backend");
})
app.use("/api",staticData);
app.use("/api",uploaddata)
app.listen(port,()=>{
    console.log(`Backend is up \nPORT:${port}`);
})
