import express from 'express'
import { getStaticData } from '../controllers/staticDatacontroller.js';
const router=express.Router();

router.get("/getStaticVideos",getStaticData);
export default router;
