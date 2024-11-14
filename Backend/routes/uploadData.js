import express from 'express'
import { uploadDatacontroller } from '../controllers/uploadDatacontroller.js'
const router=express.Router();
router.post("/uploadDataUrl",uploadDatacontroller);
export default router;