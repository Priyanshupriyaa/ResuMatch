// History.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ScoreCard from "../components/Dashboard/ScoreCard";
import KeywordPanel from "../components/Dashboard/KeywordPanel";
import ATSChecklist from "../components/Dashboard/ATSChecklist";
import RewriteSuggestions from "../components/Dashboard/RewriteSuggestions";

export default function History() {
  const [analyses, setAnalyses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/analysis/history`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setAnalyses(data);
      } catch {
        navigate("/login");
      }
    };
    fetch();
  }, []);

  const loadDetail = async (id) => {
    setSelected(id);
    setLoading(true);
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/analysis/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    setDetail(data);
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Analysis History</h1>

      {analyses.length === 0 && (
        <p className="text-gray-400 text-center py-12">No analyses yet. <a href="/analyze" className="text-blue-500 underline">Run your first one →</a></p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {analyses.map(a => (
          <div key={a._id} onClick={() => loadDetail(a._id)}
            className={`cursor-pointer rounded-xl border p-4 transition hover:shadow-md
              ${selected === a._id ? "border-blue-400 bg-blue-50" : "border-gray-200 bg-white"}`}>
            <p className="font-semibold text-gray-800 truncate">{a.jobTitle}</p>
            <p className="text-xs text-gray-400 mt-1">{new Date(a.createdAt).toLocaleDateString()}</p>
            <div className={`mt-3 text-2xl font-bold
              ${a.matchScore >= 75 ? "text-green-500" : a.matchScore >= 50 ? "text-yellow-500" : "text-red-500"}`}>
              {a.matchScore}<span className="text-sm text-gray-400 font-normal"> / 100</span>
            </div>
          </div>
        ))}
      </div>

      {loading && <p className="text-center text-gray-400">Loading...</p>}

      {detail && !loading && (
        <div className="space-y-6">
          <hr className="border-gray-200" />
          <h2 className="text-xl font-semibold text-gray-700">{detail.jobTitle}</h2>
          <ScoreCard score={detail.matchScore} summary={detail.summary} />
          <KeywordPanel matched={detail.matchedKeywords} missing={detail.missingKeywords} />
          <ATSChecklist checklist={detail.atsChecklist} />
          <RewriteSuggestions rewrites={detail.bulletRewrites} />
        </div>
      )}
    </div>
  );
}