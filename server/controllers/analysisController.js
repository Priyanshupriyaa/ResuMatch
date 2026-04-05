// analysisController.js

const multer = require("multer");
const { extractTextFromPDF } = require("../utils/pdfParser");
const { analyzeResume } = require("../utils/groqClient");
const Analysis = require("../models/Analysis");

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

const analyze = async (req, res) => {
  try {
    const { jobDescription, jobTitle } = req.body;
    if (!req.file || !jobDescription)
      return res.status(400).json({ error: "Resume file and job description are required" });

    const resumeText = await extractTextFromPDF(req.file.buffer);
    const result = await analyzeResume(resumeText, jobDescription);

    const saved = await Analysis.create({
      userId: req.user.id,
      jobTitle: jobTitle || "Untitled",
      ...result
    });

    res.json({ analysisId: saved._id, ...result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Analysis failed" });
  }
};

const getHistory = async (req, res) => {
  const analyses = await Analysis.find({ userId: req.user.id })
    .sort({ createdAt: -1 })
    .select("jobTitle matchScore createdAt _id");
  res.json(analyses);
};

const getOne = async (req, res) => {
  const analysis = await Analysis.findOne({ _id: req.params.id, userId: req.user.id });
  if (!analysis) return res.status(404).json({ error: "Not found" });
  res.json(analysis);
};

module.exports = { upload, analyze, getHistory, getOne };