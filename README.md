# ResuMatch — AI Resume Analyzer 🚀

ResuMatch is a full-stack AI-powered platform designed to bridge the gap between job seekers and Applicant Tracking Systems (ATS). It evaluates resumes against specific job descriptions, providing data-driven insights, keyword gap analysis, and AI-generated rewrite recommendations.

## 🌟 Key Features

- **Deep PDF Parsing:** High-accuracy text extraction from resume uploads.
- **Smart Job Matching:** Compares resume content against JDs to calculate an ATS compatibility score.
- **AI-Powered Suggestions:** Leverages **Groq LLM** to provide specific, actionable feedback on how to improve resume bullet points.
- **Keyword Gap Analysis:** Identifies missing industry-specific keywords essential for passing automated filters.
- **Full Auth System:** Secure user registration and login to save and track analysis history.
- **Personal Dashboard:** A centralized view for users to manage their previous resume evaluations.

## 🛠 Tech Stack

**Frontend:**
- **React (Vite)** – For a lightning-fast, modern development experience.
- **Tailwind CSS** – For a responsive, "clean-room" UI design.
- **Redux Toolkit** – For robust global state management (auth, analysis data).

**Backend:**
- **Node.js & Express.js** – Scalable server-side logic.
- **MongoDB & Mongoose** – NoSQL database for flexible storage of user profiles and reports.

**AI & Intelligence:**
- **Groq LLM API** – High-speed inference for resume rewriting and analysis.
- **NLP Algorithms** – For keyword similarity scoring and relevance mapping.

## 📂 Project Structure

```text
ResuMatch
├── client/          # React + Vite frontend
└── server/          # Node.js + Express backend

## 🚀 Run Locally

Clone repository:

git clone https://github.com/Priyanshupriyaa/ResuMatch.git

### Backend

cd server
npm install
npm start

### Frontend

cd client
npm install
npm run dev


## 🔐 Environment Variables

Create a `.env` file inside the server folder:

GROQ_API_KEY=your_api_key_here
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


## 📌 Future Improvements

- Deploy live ATS scoring dashboard
- Multi-resume comparison support
- Resume ranking across multiple job roles
- Export analysis reports as PDF