# AI Legal Advisor

An AI-powered legal assistant for Indian citizens, built with an Express backend and a React (Vite) frontend.

## Project Structure

```
.
├── backend/       # Express API (deploy to Render)
│   ├── server.js
│   ├── systemPrompt.js
│   ├── package.json
│   └── .env.example
├── frontend/      # React + Vite app (deploy to Vercel)
│   ├── src/
│   ├── package.json
│   ├── vercel.json
│   └── .env.example
└── render.yaml    # Render service definition (optional, for one-click deploy)
```

## Local Development

### Backend

```bash
cd backend
cp .env.example .env   # add your real GROQ_API_KEY
npm install
npm start
```

Runs on `http://localhost:3000` by default.

### Frontend

```bash
cd frontend
cp .env.example .env   # VITE_API_URL=http://localhost:3000 for local dev
npm install
npm run dev
```

Runs on `http://localhost:5173` by default.

## Deployment

### 1. Backend → Render

1. Push this repo to GitHub.
2. In Render, create a **New Web Service** and connect the repo.
3. Set **Root Directory** to `backend`.
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables:
   - `GROQ_API_KEY` — your Groq API key
   - `FRONTEND_URL` — your Vercel frontend URL (add this after step 2 below; you can leave it blank or `*` initially and update it once you have the Vercel URL)
7. Deploy. Note the resulting URL, e.g. `https://ai-legal-advisor-backend.onrender.com`.

(If you prefer, `render.yaml` at the repo root lets Render auto-configure this service via "New > Blueprint".)

### 2. Frontend → Vercel

1. In Vercel, create a **New Project** and import the same repo.
2. Set **Root Directory** to `frontend`.
3. Framework preset: Vite (auto-detected; `vercel.json` inside `frontend/` also pins this).
4. Add environment variable:
   - `VITE_API_URL` — your Render backend URL from above, e.g. `https://ai-legal-advisor-backend.onrender.com`
5. Deploy.

### 3. Connect them

Once the frontend is deployed, copy its Vercel URL and set it as `FRONTEND_URL` in Render's environment variables, then redeploy the backend so CORS only allows requests from your actual frontend (instead of `*`).

## Security Note

The original `Back-End/.env` file previously committed to this repo contained a real Groq API key and MongoDB connection string. Both should be **rotated immediately** if they haven't been already, and `.env` files should never be committed — they're now excluded via `.gitignore`.
