// Analyze.jsx

import { useState } from "react";
import axios from "axios";
import ScoreCard from "../components/Dashboard/ScoreCard";
import KeywordPanel from "../components/Dashboard/KeywordPanel";
import RewriteSuggestions from "../components/Dashboard/RewriteSuggestions";
import ATSChecklist from "../components/Dashboard/ATSChecklist";

export default function Analyze() {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!file || !jd) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jd);
    formData.append("jobTitle", jobTitle);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/analysis/analyze`,
        formData,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Analyze Your Resume</h1>

      <div className="space-y-4 mb-6">
        <input type="text" placeholder="Job Title (e.g. SDE-1 at Flipkart)"
          className="w-full border p-3 rounded" value={jobTitle}
          onChange={e => setJobTitle(e.target.value)} />
        <input type="file" accept=".pdf"
          className="w-full border p-3 rounded"
          onChange={e => setFile(e.target.files[0])} />
        <textarea placeholder="Paste the Job Description here..."
          className="w-full border p-3 rounded h-48"
          value={jd} onChange={e => setJd(e.target.value)} />
        <button onClick={handleSubmit} disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded w-full font-semibold">
          {loading ? "Analyzing..." : "Analyze →"}
        </button>
      </div>

      {result && (
        <div className="space-y-6">
          <ScoreCard score={result.matchScore} summary={result.summary} />
          <KeywordPanel matched={result.matchedKeywords} missing={result.missingKeywords} />
          <ATSChecklist checklist={result.atsChecklist} />
          <RewriteSuggestions rewrites={result.bulletRewrites} />
        </div>
      )}
    </div>
  );
}