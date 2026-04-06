# ResuMatch — AI Resume Analyzer

A full-stack AI-powered resume analyzer that helps job seekers optimize their resumes for specific job descriptions. Upload your resume, paste a job description, and get instant feedback.


## Features

- **Match Score** — AI-generated 0-100 score showing how well your resume fits the JD
- **Keyword Gap Analysis** — See matched and missing keywords from the job description
- **ATS Checklist** — 6-point check for common ATS formatting issues
- **AI Bullet Rewrites** — Get stronger, JD-tailored versions of your resume bullets
- **Analysis History** — All past analyses saved and accessible anytime
- **JWT Authentication** — Secure login/signup with token-based access control

## Tech Stack

**Frontend**
- React.js + Vite
- Redux Toolkit (state management)
- Tailwind CSS (styling)
- Axios (HTTP requests)

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT (authentication)
- Multer (file upload)
- pdfreader (PDF text extraction)
- Groq SDK — LLaMA 3.3 70B (AI analysis)

**Deployment**
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Groq API key (free at console.groq.com)

### Backend Setup
```bash
cd server
npm install
```

Create `server/.env`:

```env
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
CLIENT_URL=http://localhost:5173
PORT=5000
```

```bash
node index.js
```

### Frontend Setup
```bash
cd client
npm install
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000
```

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/signup | Register new user | No |
| POST | /api/auth/login | Login user | No |
| POST | /api/analysis/analyze | Analyze resume vs JD | Yes |
| GET | /api/analysis/history | Get user's analysis history | Yes |
| GET | /api/analysis/:id | Get single analysis | Yes |

## How It Works

1. User uploads a PDF resume and pastes a job description
2. Backend extracts text from PDF using pdfreader
3. Resume text + JD sent to Groq's LLaMA 3.3 70B model
4. AI returns structured JSON — score, keywords, checklist, rewrites
5. Result saved to MongoDB and returned to frontend
6. React dashboard renders the analysis

## Environment Variables

| Variable | Description |
|----------|-------------|
| MONGO_URI | MongoDB Atlas connection string |
| JWT_SECRET | Secret key for JWT signing |
| GROQ_API_KEY | Groq API key for LLaMA model |
| CLIENT_URL | Frontend URL (for CORS) |
| PORT | Backend port (default 5000) |
| VITE_API_URL | Backend URL (frontend env) |

## Future Improvements

- Cover letter generator based on resume + JD
- Resume score history graph over time
- Multi-resume comparison against one JD
- Chrome extension for LinkedIn/Naukri
- Bulk JD analysis
