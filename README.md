Acharya Zodiac Calculator

A lightweight astrology web app that calculates Sun, Moon, and Ascendant placements, and offers AI-generated deep-dive analysis powered by Google Gemini.

Short description for GitHub (use this in the repo description field):
"Acharya Zodiac Calculator — calculate natal placements and generate AI-powered astrological deep-dives using Google Gemini. Includes horoscope, compatibility, and tarot features."

Quick start (development):

Backend (Python/FastAPI):

1. Create a Python environment and install dependencies:

```bash
python -m venv .venv
.venv\Scripts\activate  # Windows
pip install -r backend/requirements.txt
```

2. Set your Gemini API key in `backend/.env`:

```
GEMINI_API_KEY=your_api_key_here
```

3. Run the backend:

```bash
cd backend
env\Scripts\activate  # if not already activated
uvicorn main:app --reload --port 8000
```

Frontend (Vite + React):

1. Install dependencies and run dev server:

```bash
cd frontend
npm install
npm run dev
```

2. The frontend dev server proxies `/api` to `http://localhost:8000` per `vite.config.js`.

Deployment notes:

- Backend (Render):
  - Create a new Render Web Service from the `backend/` folder.
  - Use the `uvicorn main:app --host 0.0.0.0 --port $PORT` start command in Render.
  - Add `GEMINI_API_KEY` as an environment variable in Render.
  - Ensure `requirements.txt` is used for dependencies.
  - This repo includes `render.yaml` and `backend/Procfile` to help Render detect and start the backend service.

- Frontend (Vercel):
  - Deploy the `frontend/` directory to Vercel as a static site.
  - Build command: `npm run build`.
  - Output directory: `dist`.
  - In Vercel project settings, add an Environment Variable:
    - `VITE_API_URL=https://your-backend.onrender.com`
  - The frontend will use `VITE_API_URL` to call the API in production, or fallback to the same origin when unset.
  - This repo includes `vercel.json` so Vercel can build the frontend from the monorepo `frontend/` folder correctly.

Render & Vercel environment guidance:

- `GEMINI_API_KEY` belongs only on the backend and should never be committed.
- `backend/.env` is ignored by `.gitignore`; use `backend/.env.example` as a template instead.
- `VITE_API_URL` should be configured in Vercel if the frontend and backend are deployed separately.
- For local development, the frontend can continue using relative `/api` URLs through the Vite dev proxy in `frontend/vite.config.js`.

Cleaning performed before publishing:

- Removed generated build files and temporary AI output logs.
- Added a `.gitignore` to exclude virtual environments, build artifacts, and secrets.

Tips before publishing:

- Remove or rotate any secrets in `backend/.env` before committing.
- Consider adding a `Procfile` or start script for Render if needed.
- Add a `LICENSE` file if you want to define repo licensing.

Contact

If you want, I can also:
- Create a `Procfile` for Render.
- Add a small GitHub Actions workflow to run linting or tests on push.
- Prepare environment variable integration examples for Vercel and Render.
