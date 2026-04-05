// ATSChecklist.jsx

export default function ATSChecklist({ checklist }) {
  const passed = checklist.filter(c => c.passed).length;

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">ATS Checklist</h3>
        <span className="text-sm text-gray-500">{passed}/{checklist.length} passed</span>
      </div>
      <ul className="space-y-3">
        {checklist.map((item, i) => (
          <li key={i} className="flex items-center gap-3">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0
              ${item.passed ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
              {item.passed ? "✓" : "✗"}
            </span>
            <span className={`text-sm ${item.passed ? "text-gray-700" : "text-gray-400 line-through"}`}>
              {item.item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}