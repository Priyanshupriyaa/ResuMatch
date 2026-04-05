// AnalyzeForm.jsx

import { useState } from "react";
import axios from "axios";

export default function AnalyzeForm({ onResult }) {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!file || !jd) {
      setError("Please upload a resume and paste a job description.");
      return;
    }
    setError("");
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
      onResult(data);
    } catch (err) {
      setError(err.response?.data?.error || "Analysis failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
        <input type="text" placeholder="e.g. SDE-1 at Google"
          className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Resume (PDF only)</label>
        <div className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition
          ${file ? "border-blue-400 bg-blue-50" : "border-gray-200 hover:border-blue-300"}`}
          onClick={() => document.getElementById("resume-input").click()}>
          <input id="resume-input" type="file" accept=".pdf" className="hidden"
            onChange={e => setFile(e.target.files[0])} />
          {file
            ? <p className="text-sm text-blue-600 font-medium">📄 {file.name}</p>
            : <p className="text-sm text-gray-400">Click to upload your resume PDF</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
        <textarea placeholder="Paste the full job description here..."
          className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-48 resize-none"
          value={jd} onChange={e => setJd(e.target.value)} />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button onClick={handleSubmit} disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 rounded-lg transition">
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Analyzing...
          </span>
        ) : "Analyze Resume →"}
      </button>
    </div>
  );
}