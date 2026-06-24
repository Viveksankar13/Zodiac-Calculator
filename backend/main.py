from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from gemini_service import (
    get_zodiac_description, 
    get_daily_horoscope, 
    get_compatibility_analysis, 
    get_tarot_reading,
    GeminiQuotaError
)

app = FastAPI()

# Enable CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class TarotRequest(BaseModel):
    card_past: str
    orient_past: str
    card_present: str
    orient_present: str
    card_future: str
    orient_future: str

@app.get("/api/zodiac/{sign}")
async def get_zodiac(sign: str, date: str = None, time: str = None):
    try:
        description = await get_zodiac_description(sign, date, time)
        return {"sign": sign, "detailed_description": description}
    except GeminiQuotaError as e:
        raise HTTPException(status_code=429, detail=str(e))
    except Exception:
        raise HTTPException(status_code=503, detail="The AI is currently clouded.")

@app.get("/api/horoscope/{sign}")
async def get_horoscope(sign: str, day: str = "today"):
    result = await get_daily_horoscope(sign, day)
    return result

@app.get("/api/compatibility/{sign_a}/{sign_b}")
async def get_compatibility(sign_a: str, sign_b: str):
    result = await get_compatibility_analysis(sign_a, sign_b)
    return result

@app.post("/api/tarot/reading")
async def get_tarot(request: TarotRequest):
    result = await get_tarot_reading(
        card_past=request.card_past,
        orient_past=request.orient_past,
        card_present=request.card_present,
        orient_present=request.orient_present,
        card_future=request.card_future,
        orient_future=request.orient_future
    )
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
