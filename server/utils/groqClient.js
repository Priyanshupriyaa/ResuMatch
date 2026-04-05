const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const analyzeResume = async (resumeText, jobDescription) => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: `You are an expert ATS resume analyzer. Analyze the resume against the job description and return ONLY a valid JSON object with no extra text, no markdown, no backticks.

Resume:
${resumeText}

Job Description:
${jobDescription}

Return this exact JSON structure:
{
  "matchScore": <0-100 integer>,
  "matchedKeywords": ["keyword1", "keyword2"],
  "missingKeywords": ["keyword1", "keyword2"],
  "bulletRewrites": [
    {
      "original": "original bullet text from resume",
      "improved": "improved version tailored to the job description"
    }
  ],
  "atsChecklist": [
    { "item": "Has clear contact info", "passed": true },
    { "item": "Uses strong action verbs", "passed": false },
    { "item": "Quantified achievements present", "passed": true },
    { "item": "No tables or columns", "passed": true },
    { "item": "Education section present", "passed": true },
    { "item": "Skills section present", "passed": true }
  ],
  "summary": "2-3 sentence overall assessment"
}`
      }
    ],
    temperature: 1,
    max_tokens: 2048,
  });

  const raw = completion.choices[0].message.content;
  const clean = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
};

module.exports = { analyzeResume };