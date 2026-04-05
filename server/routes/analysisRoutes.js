// analysisRoutes.js

const express = require("express");
const router = express.Router();
const { upload, analyze, getHistory, getOne } = require("../controllers/analysisController");
const protect = require("../middleware/authMiddleware");

router.post("/analyze", protect, upload.single("resume"), analyze);
router.get("/history", protect, getHistory);
router.get("/:id", protect, getOne);

module.exports = router;