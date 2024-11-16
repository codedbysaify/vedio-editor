import express from "express";
import { getRecentItems } from "../controllers/rectentItemsController.js";

const router = express.Router();

router.get("/recentitems", getRecentItems);

export default router;
