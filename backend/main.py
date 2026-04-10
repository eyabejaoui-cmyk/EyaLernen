from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware  #autorise le frontend à parler au backend.
from pydantic import BaseModel
from dotenv import load_dotenv
import os   #lisent la clé API depuis .env
from mistralai import Mistral
#import requests
from passlib.context import CryptContext


import models
from database import Base , engine , SessionLocal
from schemas import UserCreate , UserLogin

load_dotenv()
pwd_context = CryptContext (schemes=["bcrypt"],deprecated="auto")
# schemes = méthode / bcrypt= outil\ algorithme / [] pour utilise une seul méthode

def hash_password (password:str):
        return pwd_context.hash (password)

def verify_password(plain_password:str ,hashed_password : str):
        return pwd_context.verify(plain_password , hashed_password)


app = FastAPI()  # cœur du backend


Base.metadata.create_all(bind=engine)

#mail 
@app.post("/register")
def register(user: UserCreate):
     db = SessionLocal()
     existing_user = db.query(models.User).filter(models.User.email == user.email).first()
     if existing_user:
         raise HTTPException(status_code=400 , detail="Email déjà utilisé")
   
     new_user = models.User(prenom = user.prenom,
                            nom=user.nom,
                            email=user.email,
                            password_hash=hash_password(user.password),
                            age=user.age,
                            statut=user.statut,
                            niveau=user.niveau,
                            langue=user.langue, )
     db.add(new_user)
     db.commit()
     db.close()
     return {"message": "Utilisateur créé avec succès"}
     
@app.post("/login")
def login(data: UserLogin):
    db = SessionLocal()
    user = db.query(models.User).filter(models.User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=400, detail="Email ou mot de passe incorrect")
    if not verify_password(data.password , user.password_hash):
        raise HTTPException(status_code=400, detail="Email ou mot de passe incorrect")
    db.close()
    return {"message": "Connexion réussie"}


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
    mode: str = "chat"               
    history: list[dict] | None = None  # [{role:'user'|'assistant', text:'...'}]
 
 
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
def chat(req: ChatRequest):
     user_msg = (req.message or "").strip() #ye5eth l message eli jey m front
     
     if not user_msg:
          raise HTTPException(status_code=400, detail="Message vide")
          
     system = get_system_prompt(req.mode) ## Récupérer le system prompt adapté selon le mode choisi      
     
     user_text = user_msg.lower() #minuscules)

     needs_derja_help = any(word in user_text for word in [
            "mafhemtch",
            "fassarli",
            "b derja",
            "derja",
            "tounsi",
            "tnajem tfasarli",
            "ich verstehe nicht",
            "erklär auf tunesisch",
            "kannst du auf tunesisch erklären",
            "explain in tunisian"
     ])

     extra_instruction = ""
     if needs_derja_help :
          extra_instruction = (
                "Der Benutzer braucht jetzt eine kurze Erklärung auf Tunesisch-Derja "
                "in lateinischer Schrift. Antworte zuerst kurz auf Tunesisch-Derja "
                "und dann wieder in einfachem Deutsch."
          )
     

     chat_messages = [{"role": "system", "content": system}]
     
     if req.history:
          for m in req.history:
               role = "user" if m.get("role") == "user" else "assistant"
               content = (m.get("text") or "").strip()
               if content:
                    chat_messages.append({"role": role, "content": content})


     chat_messages.append({"role": "user", "content": user_msg})

     try:
        resp = client.chat.complete(
        model="mistral-small-latest",
        messages=chat_messages,
        temperature=0.7,)

        #resp = requests.post(
           #"http://localhost:11434/api/chat",
           #json={
             # "model": "gemma3:1b",
            #  "messages": chat_messages,
           #   "stream": False
          #},
        #  timeout=60
        #)
        #data = resp.json()
        #reply = (data.get("message", {}).get("content") or "").strip()

        reply = (resp.choices[0].message.content or "").strip()
        if not reply:
          raise HTTPException(status_code=502, detail="Réponse vide du modèle")
    
        return {"reply": reply}

     except HTTPException:
          raise
     except Exception as e:
         raise HTTPException(status_code=500, detail=str(e))
     