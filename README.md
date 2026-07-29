# ResuMatch — AI Resume Analyzer

A full-stack AI-powered resume analyzer that helps job seekers optimize their resumes for specific job descriptions. Upload your resume, paste a job description, and receive AI-generated feedback, ATS insights, keyword analysis, and resume improvements tailored to the job role.

---

## Features

- **AI Match Score** — AI-generated score (0–100) indicating how well your resume matches the job description.
- **Keyword Gap Analysis** — Identifies matched and missing keywords to improve ATS compatibility.
- **ATS Resume Checklist** — Evaluates your resume against six common ATS formatting and content checks.
- **AI Bullet Rewrites** — Generates stronger, action-oriented resume bullet points tailored to the target role.
- **Analysis History** — Stores previous resume analyses for future reference.
- **Secure Authentication** — JWT-based authentication using short-lived access tokens and secure HttpOnly refresh tokens.
- **Automatic Session Management** — Seamlessly refreshes expired access tokens without requiring users to log in again.
- **Protected Routes** — Authenticated users can securely access analysis history and saved reports.

---

## Tech Stack

### Frontend
- React.js
- Vite
- Redux Toolkit
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication (Access & Refresh Tokens)
- Cookie Parser
- Multer
- pdfreader
- Groq SDK (LLaMA 3.3 70B)

### Deployment
- Frontend — Vercel
- Backend — Render
- Database — MongoDB Atlas

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Groq API Key

---

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
GROQ_API_KEY=your_groq_api_key
CLIENT_URL=http://localhost:5173
PORT=5000
```

Start the backend:

```bash
npm run dev
```

or

```bash
node index.js
```

---

### Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file inside the `client` folder.

```env
VITE_API_URL=http://localhost:5000
```

Run the frontend:

```bash
npm run dev
```

---

## API Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/api/auth/signup` | Register a new user | No |
| POST | `/api/auth/login` | Login and generate access & refresh tokens | No |
| POST | `/api/auth/refresh` | Generate a new access token using refresh token | Refresh Token |
| POST | `/api/auth/logout` | Logout and invalidate refresh token | Yes |
| POST | `/api/analysis/analyze` | Analyze resume against a job description | Yes |
| GET | `/api/analysis/history` | Retrieve user's analysis history | Yes |
| GET | `/api/analysis/:id` | Retrieve a specific saved analysis | Yes |

---

## Application Workflow

### Authentication

1. User signs up or logs in.
2. Backend generates:
   - Short-lived JWT Access Token
   - Long-lived Refresh Token
3. Refresh token is stored securely as an HttpOnly cookie and persisted in MongoDB.
4. Access token is used for protected API requests.
5. When the access token expires, the frontend automatically requests a new one using the refresh token.
6. On logout, the refresh token is removed from both the browser and the database.

### Resume Analysis

1. User uploads a PDF resume.
2. User pastes a target job description.
3. Backend extracts resume text using **pdfreader**.
4. Resume text and job description are sent to **Groq LLaMA 3.3 70B**.
5. The AI generates:
   - Match Score
   - Keyword Analysis
   - ATS Checklist
   - Resume Bullet Improvements
6. Analysis is saved in MongoDB.
7. Results are displayed on the React dashboard.

---

## Architecture

```
                React + Redux
                      │
                      ▼
            Express REST API
            /             \
           ▼               ▼
    MongoDB Atlas      Groq LLM
           │               │
           └──────► Resume Analysis
                      │
                      ▼
                React Dashboard
```

---

## Security

- JWT Access & Refresh Token Authentication
- HttpOnly Refresh Token Cookies
- Password Hashing using bcrypt
- Protected API Routes
- Refresh Token Validation
- Secure CORS Configuration
- Persistent Session Management

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret used to sign access tokens |
| `JWT_REFRESH_SECRET` | Secret used to sign refresh tokens |
| `GROQ_API_KEY` | Groq API key |
| `CLIENT_URL` | Frontend URL used for CORS |
| `PORT` | Backend server port |
| `VITE_API_URL` | Backend API URL |

---

## Future Improvements

- AI Resume Copilot (interactive chatbot)
- AI-generated Cover Letter
- Multi-Resume Comparison
- Resume Version Tracking
- Resume Score Progress Graph
- Chrome Extension for LinkedIn/Naukri
- Bulk Resume Analysis
- Interview Question Generator based on Resume & JD

---

## Author

**Priyanshu**

If you found this project useful, consider giving it a ⭐ on GitHub.
