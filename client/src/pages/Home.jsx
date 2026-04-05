import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
        <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border border-blue-100">
          AI-Powered • Free to Use • Instant Results
        </span>
        <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
          Know exactly why your resume<br />
          <span className="text-blue-600">isn't getting callbacks</span>
        </h1>
        <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Paste a job description, upload your resume, and get an instant AI analysis —
          match score, missing keywords, ATS issues, and rewritten bullet points in seconds.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/signup"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition shadow-sm">
            Analyze My Resume →
          </Link>
          <Link to="/login"
            className="text-gray-600 hover:text-gray-900 font-medium px-8 py-3.5 rounded-xl border border-gray-200 hover:border-gray-300 transition">
            Log In
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
            Everything you need to land the interview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: "🎯",
                title: "Match Score",
                desc: "Get a 0–100 score showing how well your resume fits the job description. Know instantly if you're a strong candidate."
              },
              {
                icon: "🔑",
                title: "Keyword Gap Analysis",
                desc: "See exactly which skills and terms the JD expects but your resume is missing — the #1 reason resumes get rejected."
              },
              {
                icon: "✅",
                title: "ATS Checklist",
                desc: "Check if your resume passes the 6 most common ATS filters — formatting, action verbs, contact info, and more."
              },
              {
                icon: "✍️",
                title: "AI Bullet Rewrites",
                desc: "Get stronger, tailored versions of your bullet points written by AI — optimized for the specific role you're applying to."
              },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to get more interviews?</h2>
        <p className="text-gray-500 mb-8">Free to use. No credit card required. Results in under 30 seconds.</p>
        <Link to="/signup"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition shadow-sm">
          Get Started Free →
        </Link>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 py-6 text-center text-sm text-gray-400">
        Built with React, Node.js, MongoDB & Groq AI
      </div>

    </div>
  );
}