from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware  #autorise le frontend à parler au backend.
from pydantic import BaseModel
from dotenv import load_dotenv
import os   #lisent la clé API depuis .env
from mistralai import Mistral
#import requests
from passlib.context import CryptContext


import models
from database import Base , engine , SessionLocal ,  get_db
from schemas import UserCreate , UserLogin



load_dotenv()
pwd_context = CryptContext (schemes=["bcrypt"],deprecated="auto")
# schemes = méthode / bcrypt= outil\ algorithme / [] pour utilise une seul méthode

def hash_password (password:str):
        return pwd_context.hash (password)

def verify_password(plain_password:str ,hashed_password : str):
        return pwd_context.verify(plain_password , hashed_password)


app = FastAPI()  # cœur du backend

from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,   # 🔥 IMPORTANT
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


@app.post("/register")
def register(data: UserCreate):
    db = SessionLocal()

    new_user = models.User(
        prenom=data.prenom,
        nom=data.nom,
        email=data.email,
        password_hash=hash_password(data.password),
        age=data.age,
        statut=data.statut,
        niveau=data.niveau,
        langue=data.langue
    )

    db.add(new_user)
    db.commit()
    db.close()

    return {"msg": "user ajouté"}

#????    
@app.post("/login") #route front+back
def login(data: UserLogin):  #data eli jeya m front
    db = SessionLocal()
    user = db.query(models.User).filter(models.User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=400, detail="Email ou mot de passe incorrect")
    if not verify_password(data.password, user.password_hash):
         raise HTTPException(status_code=400, detail="Email ou mot de passe incorrect")
    db.close()
    return {"message": "Connexion réussie"}

# Mistral
api_key = os.getenv("MISTRAL_API_KEY")
print("clé =", api_key)

if not api_key:
    raise RuntimeError("MISTRAL_API_KEY manquant. Mets-le dans backend/.env")
 
client = Mistral(api_key=api_key)


 
class Chat(BaseModel):
    message: str
    mode: str = "chat" 
 
@app.get("/")
def home():
     return{"status":"ok"}

def get_system_prompt(mode: str) ->str:  #la manière de fonctionnement de chatbot
     mode = (mode or "chat").strip().lower() #strip = éliminer les espaces au début/fin
     

     if mode == "correction":
        return """Du bist EyaLernenBot, ein freundlicher und geduldiger Deutschlehrer für Anfänger auf Niveau A1/A2.

REGELN:
- Sprich immer nur auf Deutsch.
- Verwende keine Emojis.
- Korrigiere Fehler sanft und einfach.
- Antworte kurz und klar.
- Benutze einfache Sätze auf Niveau A1/A2.
- Erkläre kurz und natürlich auf Deutsch.
- Wenn der Benutzer nicht versteht oder um Hilfe auf Tunesisch bittet, darfst du kurz und einfach auf Tunesisch-Derja erklären.
- Verwende niemals Französisch.
- Die Erklärung auf Tunesisch-Derja ist nur eine kurze Hilfe.
- Nach der kurzen Erklärung kommst du direkt wieder zurück zum Deutschen.
- Antworte in 1 bis 3 kurzen Sätzen."""

     return """Du bist EyaLernenBot, ein freundlicher, geduldiger und motivierender Deutschlehrer und Gesprächspartner für Anfänger auf Niveau A1/A2.

REGELN:
- Sprich normalerweise auf Deutsch.
- Verwende niemals Französisch.
- Verwende keine Emojis.
- Sprich natürlich, freundlich und einfach, wie ein netter Lehrer und guter Gesprächspartner.
- Hilf dem Benutzer, ohne streng zu wirken.
- Antworte kurz und klar.
- Benutze einfache Sätze auf Niveau A1/A2.
- Korrigiere Fehler sanft und natürlich in deiner Antwort.
- Motiviere den Benutzer immer weiterzusprechen.
- Stelle manchmal eine kurze, einfache Frage, um das Gespräch fortzusetzen.
- Schreibe niemals wie ein Schulbuch oder eine lange Lektion.
- Antworte in 1 bis 3 kurzen Sätzen.

Dein Stil soll menschlich, ruhig, klar, freundlich und motivierend sein.
WENN DER BENUTZER NICHT VERSTEHT ODER UM EINE ERKLÄRUNG AUF TUNESISCH BITTET:
- Sprich normalerweise auf Deutsch.
- Wenn der Benutzer sagt, dass er nicht versteht, blockiert ist oder sagt: "fasarli b derja", "fassarli", "mafhemtech", "aawed", dann erkläre kurz auf echter tunesischer Derja.
- Verwende echte tunesische Derja, wie eine normale junge Person in Tunesien spricht.
- Verwende niemals Französisch.
- Verwende nicht algerische Derja, nicht marokkanische Derja und nicht Hocharabisch.
- Schreibe natürlich und direkt, nicht wie eine Übersetzung Wort für Wort aus dem Deutschen.
- Verwende keine Labels, keine Überschriften und keine Sätze wie "auf Tunesisch-Derja:" oder "jetzt wieder auf Deutsch:".
- Die Tunesisch-Derja muss kurz, einfach, klar und beruhigend sein.
- Du kannst Ausdrücke benutzen wie: "ma fama hata mochkel", "taw nfasserlek bchwaya bchwaya", "aawed 9olli", "chnoua ma fhemtch beldhabt".
- Nach der kurzen Erklärung auf tunesischer Derja gehst du natürlich wieder zurück zu einfachem Deutsch.

Dein Stil soll menschlich, ruhig, klar, freundlich und motivierend sein.
WENN DU AUF TUNESISCH-DERJA ERKLÄRST:
- Verwende echte tunesische Derja, nicht algerische Derja, nicht marokkanische Derja und nicht Hocharabisch.
- Benutze natürliche tunesische Ausdrücke, wie ein junger Mensch in Tunesien.
- Schreibe einfach, kurz und klar.
- Verwende keine Übersetzung Wort für Wort aus dem Deutschen.
- Schreibe nicht in einem formellen arabischen Stil.
- Verwende keine Labels, keine Anführungen und keine Sprach-Erklärungen.
- Wenn du ein tunesisches Wort gibst, erkläre direkt natürlich und menschlich.
- Schreibe die tunesische Derja in arabischer Schrift, nicht in lateinischen Buchstaben.
- Beispiele für den Stil: "ما فما حتى مشكل", "تو نفسرلك", "بشوية بشوية", "شنوة معناها", "عاود قلي"."""


@app.post("/chat")
def chat(req: Chat):
    try:
        system = get_system_prompt(req.mode)

        user_text = req.message.lower()

        needs_derja = any(word in user_text for word in [
            "mafhemtch",
            "fassarli",
            "b derja",
            "derja",
            "tounsi",
            "ich verstehe nicht"
        ])

        user_message = req.message

        if needs_derja:
            user_message = (
                req.message +
                "\n\nWenn der Benutzer nicht versteht, erkläre kurz auf tunesischer Derja, dann antworte wieder einfach auf Deutsch."
            )

        db = SessionLocal()

        # 🔥 history
        history = db.query(models.Message).order_by(models.Message.id.desc()).limit(5).all()

        # 🔥 corrections
        corrections = db.query(models.DerjaCorrection).all()

        correction_text = ""
        for c in corrections:
            correction_text += f"{c.wrong} -> {c.correct}\n"

        # 🔥 learning instruction
        learning_instruction = f"""
        Apprends des messages précédents.

        Utilise toujours ces corrections:
        {correction_text}

        Adapte-toi au style tunisien (Derja).
        Ne répète pas les erreurs.
        """

        # 🔥 messages
        chat_messages = [
            {"role": "system", "content": system},
            {"role": "system", "content": learning_instruction}
        ]

        # 🔥 ajouter history
        for msg in reversed(history):
            chat_messages.append({"role": "user", "content": msg.user_message})
            chat_messages.append({"role": "assistant", "content": msg.bot_response})

        # 🔥 ajouter message actuel (مرة واحدة فقط)
        chat_messages.append({
            "role": "user",
            "content": user_message
        })

        # 🔥 appel Mistral
        resp = client.chat.complete(
            model="mistral-small-latest",
            messages=chat_messages
        )

        bot_reply = resp.choices[0].message.content

        # تعلم بسيط جدا
        if "الصحيح" in req.message:
           new_corr = models.DerjaCorrection(
             wrong=bot_reply,
             correct=req.message
           )
           db.add(new_corr)
           db.commit()

        # 🔥 stockage
        new_message = models.Message(
            user_message=req.message,
            bot_response=bot_reply
        )

        db.add(new_message)
        db.commit()
        db.close()

        return {"response": bot_reply}

    except Exception as e:
        print("ERREUR =", e)
        return {"response": str(e)}