from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from mistralai import Mistral

load_dotenv()

app = FastAPI()

# CORS (ton front est sur localhost:5175)
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1):51\d{2}",
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mistral
api_key = os.getenv("MISTRAL_API_KEY")
if not api_key:
    raise RuntimeError("MISTRAL_API_KEY manquant. Mets-le dans backend/.env")

client = Mistral(api_key=api_key)


class ChatRequest(BaseModel):
    message: str
    mode: str = "chat"                 # chat | correction | roleplay
    history: list[dict] | None = None  # [{role:'user'|'assistant', text:'...'}]


def get_system_prompt(mode: str) -> str:
    mode = (mode or "chat").lower()

    if mode == "correction":
        return (
            "Tu es EyaLernenBot, coach d’allemand A1/A2.\n"
            "L’utilisateur écrit une phrase (souvent en allemand).\n"
            "Corrige doucement et explique simplement.\n"
            "Format EXACT (3 lignes):\n"
            "Correction: ...\n"
            "Français: ...\n"
            "Relance: ...\n"
        )

    if mode == "roleplay":
        return (
            "Tu es EyaLernenBot. Fais un mini dialogue réaliste A1/A2 (très court).\n"
            "Format EXACT (3 lignes):\n"
            "Allemand: ...\n"
            "Français: ...\n"
            "Relance: ...\n"
        )

    # IMPORTANT: il manquait le return pour le mode "chat"
    return (
        "Tu es EyaLernenBot, un coach d’allemand A1/A2 sympa et naturel.\n"
        "Réponds comme un humain: court, chaleureux, simple.\n"
        "Format EXACT (3 lignes):\n"
        "Allemand: ...\n"
        "Français: ...\n"
        "Relance: ...\n"
    )


@app.get("/")
def home():
    return {"status": "ok"}


@app.post("/chat")
def chat(req: ChatRequest):
    user_msg = (req.message or "").strip()
    if not user_msg:
        raise HTTPException(status_code=400, detail="Message vide")

    system = get_system_prompt(req.mode)
    chat_messages = [{"role": "system", "content": system}]

    # Historique (mémoire) avant le message courant
    if req.history:
        for m in req.history[-10:]:
            role = "user" if m.get("role") == "user" else "assistant"
            content = (m.get("text") or "").strip()
            if content:
                chat_messages.append({"role": role, "content": content})

    # Message actuel (une seule fois)
    chat_messages.append({"role": "user", "content": user_msg})

    try:
        resp = client.chat.complete(
            model="mistral-small-latest",
            messages=chat_messages,
            temperature=0.7,
        )

        reply = (resp.choices[0].message.content or "").strip()
        if not reply:
            raise HTTPException(status_code=502, detail="Réponse vide du modèle")

        lines = [l.strip() for l in reply.splitlines() if l.strip()]

        def find(prefixes):
            for p in prefixes:
                x = next((l for l in lines if l.lower().startswith(p)), None)
                if x:
                    return x
            return None

        de = find(["allemand:"])
        fr = find(["français:", "francais:"])
        rel = find(["relance:"])
        corr = find(["correction:"])

        # Mode correction
        if corr:
            if not fr:
                fr = "Français: " + (lines[1] if len(lines) > 1 else "")
            if not rel:
                rel = "Relance: Tu veux un autre exemple ?"
            return {"reply": corr + "\n" + fr + "\n" + rel}

        # Modes chat/roleplay
        if not de:
            de = "Allemand: " + (lines[0] if lines else "")
        if not fr:
            fr = "Français: " + (lines[1] if len(lines) > 1 else "")
        if not rel:
            rel = "Relance: Tu veux continuer ?"

        return {"reply": de + "\n" + fr + "\n" + rel}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))