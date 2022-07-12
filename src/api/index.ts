const express = require("express");

const { Router } = express;
const router = new Router();

const wordnett = require("./wordnett");

router.use("/api/wordnett", wordnett);

export default router;
