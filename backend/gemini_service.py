import os
import json
import time
from google import genai
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini with the new google-genai SDK
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

# Use gemini-2.0-flash which has higher free-tier limits than gemini-2.5-flash
MODEL = "gemini-2.0-flash"


class GeminiQuotaError(Exception):
    pass


def _generate_with_retry(prompt: str, json_mode: bool = False, max_retries: int = 3) -> str:
    """
    Call the Gemini API with exponential backoff retry on 429 quota errors.
    Returns the raw response text.
    """
    config = {"response_mime_type": "application/json"} if json_mode else {}

    for attempt in range(max_retries):
        try:
            response = client.models.generate_content(
                model=MODEL,
                contents=prompt,
                config=config if json_mode else None
            )
            return response.text
        except Exception as e:
            error_str = str(e)
            if "429" in error_str or "quota" in error_str.lower():
                if attempt == max_retries - 1:
                    print(f"[Acharya] Gemini quota limit reached after {max_retries} attempts.")
                    raise GeminiQuotaError("The AI is currently clouded, quota limit reached.")
                wait = (2 ** attempt) * 5  # 5s, 10s, 20s
                print(f"[Acharya] Quota hit (attempt {attempt + 1}/{max_retries}). Retrying in {wait}s...")
                time.sleep(wait)
            else:
                print(f"[Acharya] Gemini error: {e}")
                raise e

    raise Exception("Max retries exceeded due to API quota limits.")


async def get_zodiac_description(sign_name: str, birth_date: str = None, birth_time: str = None):
    time_info = f" at {birth_time}" if birth_time else ""
    date_info = f"born on {birth_date}{time_info}" if birth_date else ""

    prompt = f"""
    Provide a deeply personalized, humanized, and natural-sounding astrological analysis for a {sign_name} {date_info}.
    
    Structure the response using only these rules:
    1. Use <h2> tags for the following four MAIN sections:
       - <h2>The Essence of You</h2> (Personality traits)
       - <h2>Cosmic Strengths & Challenges</h2> (Strengths and weaknesses)
       - <h2>Your Lucky Charms</h2> (Colors, numbers, or symbols that resonate)
       - <h2>Astronomical Horizon</h2> (What may occur in the future according to celestial alignments)
    2. Write in fluent, elegant English with a natural flow.
    3. DO NOT use markdown headers like '###' or '**'. Use plain text for the body.
    4. Keep the tone insightful, warm, and professional.
    """

    try:
        return _generate_with_retry(prompt)
    except GeminiQuotaError:
        raise
    except Exception as e:
        print(f"[Acharya] Zodiac description failed: {e}")
        raise


async def get_daily_horoscope(sign_name: str, day: str = "today"):
    prompt = f"""
    Provide a daily horoscope for the zodiac sign {sign_name} for the period '{day}' (yesterday, today, or tomorrow).
    Determine integer ratings between 1 and 5 for Love, Career, Health, and Luck.
    Also write an inspiring, descriptive daily message forecasting their cosmic energy for the day.

    Return ONLY valid JSON with these keys:
    {{
        "love_rating": integer (1-5),
        "career_rating": integer (1-5),
        "health_rating": integer (1-5),
        "luck_rating": integer (1-5),
        "horoscope_text": string
    }}
    """

    try:
        text = _generate_with_retry(prompt, json_mode=True)
        return json.loads(text)
    except Exception as e:
        print(f"[Acharya] Horoscope failed: {e}")
        return {
            "love_rating": 4,
            "career_rating": 3,
            "health_rating": 4,
            "luck_rating": 5,
            "horoscope_text": f"The stars align {day} for {sign_name}. Cosmic currents are shifting — bringing a surge of intuition and focus. Trust your path."
        }


async def get_compatibility_analysis(sign_a: str, sign_b: str):
    prompt = f"""
    Analyze the astrological compatibility between {sign_a} and {sign_b}.
    Assign integer compatibility percentages (0 to 100) for Love, Friendship, and Career.
    Write a detailed synthesis paragraph about their synergy, strengths, and friction points.

    Return ONLY valid JSON with these keys:
    {{
        "love_score": integer (0-100),
        "friendship_score": integer (0-100),
        "career_score": integer (0-100),
        "synthesis": string
    }}
    """

    try:
        text = _generate_with_retry(prompt, json_mode=True)
        return json.loads(text)
    except Exception as e:
        print(f"[Acharya] Compatibility failed: {e}")
        return {
            "love_score": 85,
            "friendship_score": 90,
            "career_score": 75,
            "synthesis": f"The connection between {sign_a} and {sign_b} is marked by dynamic energy. They share strong communication paths, though minor adjustments are needed to balance their varying rhythms."
        }


async def get_tarot_reading(card_past: str, orient_past: str, card_present: str, orient_present: str, card_future: str, orient_future: str):
    prompt = f"""
    You are a wise and intuitive Tarot Reader. Interpret this 3-card spread:
    1. Past: {card_past} ({orient_past})
    2. Present: {card_present} ({orient_present})
    3. Future: {card_future} ({orient_future})

    Provide individual card meanings and an overall synthesized guidance paragraph.

    Return ONLY valid JSON with these keys:
    {{
        "past_meaning": string,
        "present_meaning": string,
        "future_meaning": string,
        "overall_advice": string
    }}
    """

    try:
        text = _generate_with_retry(prompt, json_mode=True)
        return json.loads(text)
    except Exception as e:
        print(f"[Acharya] Tarot reading failed: {e}")
        return {
            "past_meaning": f"The {card_past} in the past position shows that prior forces are now settling, allowing you to reflect on lessons learned.",
            "present_meaning": f"The {card_present} signals a time of action and choice. Align your inner intentions with the present moment.",
            "future_meaning": f"The {card_future} in the future position suggests highly transformative energies ahead. Stay resilient.",
            "overall_advice": "A powerful transition is underway. Use lessons from your past to stabilize your present, paving the way for future growth."
        }
