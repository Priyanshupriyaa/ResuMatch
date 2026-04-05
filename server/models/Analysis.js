// Analysis.js

const mongoose = require("mongoose");

const AnalysisSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  jobTitle: { type: String },
  matchScore: { type: Number },
  matchedKeywords: [String],
  missingKeywords: [String],
  bulletRewrites: [{ original: String, improved: String }],
  atsChecklist: [{ item: String, passed: Boolean }],
  summary: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Analysis", AnalysisSchema);