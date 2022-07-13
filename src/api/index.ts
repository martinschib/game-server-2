import express from "express";

const router = express.Router();

import wordnett from "./wordnett"

router.use("/api/wordnett", wordnett);

export default router;
