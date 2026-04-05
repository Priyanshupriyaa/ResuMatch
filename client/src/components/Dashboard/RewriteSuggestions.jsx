// RewriteSuggestions.jsx

import { useState } from "react";

export default function RewriteSuggestions({ rewrites }) {
  const [copied, setCopied] = useState(null);

  const copy = (text, i) => {
    navigator.clipboard.writeText(text);
    setCopied(i);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">AI Bullet Rewrites</h3>
      <div className="space-y-4">
        {rewrites.map((rw, i) => (
          <div key={i} className="rounded-lg border border-gray-100 overflow-hidden">
            <div className="bg-red-50 px-4 py-3">
              <p className="text-xs text-red-400 font-medium mb-1">ORIGINAL</p>
              <p className="text-sm text-gray-600">{rw.original}</p>
            </div>
            <div className="bg-green-50 px-4 py-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-green-500 font-medium mb-1">IMPROVED</p>
                <p className="text-sm text-gray-700">{rw.improved}</p>
              </div>
              <button onClick={() => copy(rw.improved, i)}
                className="shrink-0 text-xs bg-white border border-green-300 text-green-600 px-3 py-1 rounded-full hover:bg-green-100 transition">
                {copied === i ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}