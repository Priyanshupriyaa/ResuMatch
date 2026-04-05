// KeywordPanel.jsx

export default function KeywordPanel({ matched, missing }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Keyword Analysis</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        <div>
          <p className="text-sm font-medium text-green-600 mb-2">
            ✅ Matched ({matched.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {matched.map((kw, i) => (
              <span key={i} className="bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full border border-green-200">
                {kw}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-red-500 mb-2">
            ❌ Missing ({missing.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {missing.map((kw, i) => (
              <span key={i} className="bg-red-50 text-red-600 text-xs font-medium px-3 py-1 rounded-full border border-red-200">
                {kw}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}