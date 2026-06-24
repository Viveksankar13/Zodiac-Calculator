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

- Frontend (Vercel):
  - Deploy the `frontend/` directory to Vercel as a static site.
  - Build command: `npm run build`.
  - Output directory: `dist`.
  - Set up an environment variable for the backend URL if you deploy backend separately (e.g., `VITE_API_URL=https://your-backend.onrender.com`) and update `vite.config.js` or the frontend's fetch calls to use it.

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
