// ScoreCard.jsx

export default function ScoreCard({ score, summary }) {
  const color = score >= 75 ? "text-green-500" : score >= 50 ? "text-yellow-500" : "text-red-500";
  const ring = score >= 75 ? "stroke-green-500" : score >= 50 ? "stroke-yellow-500" : "stroke-red-500";
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 flex flex-col sm:flex-row items-center gap-6">
      {/* Circle */}
      <div className="relative w-32 h-32 shrink-0">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10" />
          <circle cx="50" cy="50" r="45" fill="none" strokeWidth="10"
            strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round" className={`${ring} transition-all duration-700`} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${color}`}>{score}</span>
          <span className="text-xs text-gray-400">/ 100</span>
        </div>
      </div>

      {/* Summary */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">Match Score</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{summary}</p>
      </div>
    </div>
  );
}