from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware  #autorise le frontend à parler au backend.
from pydantic import BaseModel
from dotenv import load_dotenv
import os   #lisent la clé API depuis .env
from mistralai import Mistral
#import requests
from passlib.context import CryptContext

from models import Base
import models 
from database import Base , engine , SessionLocal ,  get_db
from schemas import UserCreate , UserLogin
import re 
from professeur import update_prof

from schemas import ProfesseurCreate
from routes_stats import router as stats_router

from routes_admin import router as admin_router
from routes_subscriptions import router as subscription_router

from routes_professeur import router as professeur_router

models.Base.metadata.create_all(bind=engine)


load_dotenv()
pwd_context = CryptContext (schemes=["bcrypt"],deprecated="auto")
# schemes = méthode / bcrypt= outil\ algorithme / [] pour utilise une seul méthode

def hash_password (password:str):
        return pwd_context.hash (password)

def verify_password(plain_password:str ,hashed_password : str):
        return pwd_context.verify(plain_password , hashed_password)



app = FastAPI()  # cœur du backend
Base.metadata.create_all(bind=engine)


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,   
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(professeur_router)

app.include_router(subscription_router)

Base.metadata.create_all(bind=engine)


@app.post("/register")
def register(data: UserCreate):
    db = SessionLocal()

    new_user = models.User(
        prenom=data.prenom,
        nom=data.nom,
        email=data.email,
        password_hash=hash_password(data.password),
        role=data.role
    )

    db.add(new_user)
    db.commit()
    db.close()

    return {"msg": "user ajouté"}

#????    

    
    #user = db.query(models.User).filter(models.User.email == data.email).first()
    
    #if not user:
        #raise HTTPException(status_code=400, detail="Email ou mot de passe incorrect")
    #if not verify_password(data.password, user.password_hash):
         #raise HTTPException(status_code=400, detail="Email ou mot de passe incorrect")
    #db.close()
    #return {
        #"message": "Connexion réussie",
        #"role": user.role
    #}
      

@app.post("/login")
def login(data: UserLogin):
    db = SessionLocal()

    try:
        user = db.query(models.User).filter(
            models.User.email == data.email
        ).first()

        if user:
            if verify_password(data.password, user.password_hash):
                return {"role": user.role}
            else:
                return {"error": "mot de passe incorrect"}

        prof = db.query(models.Professeur).filter(
            models.Professeur.email == data.email
        ).first()

        if prof:
            if verify_password(data.password, prof.password_hash):
                return {"role": "prof"}
            else:
                return {"error": "mot de passe incorrect"}

        return {"error": "compte non trouvé"}
    
    except Exception as e:
        print("ERREUR LOGIN =", e)
        return {"error": "server error"}

    finally:
        db.close()

    

    
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
     
     if mode == "roleplay_cafe":
        return """
            Tu es un serveur dans un café.

            RÈGLES
            Tu parles en allemand simple niveau A1 A2
            Tu restes toujours dans le rôle de serveur
            Tu parles en derja ou en français seulement si le client le demande
            Sinon tu restes en allemand
            Tu ne fais pas de cours
            Tu réponds en une ou deux phrases courtes
            Tu es naturel et poli
            Tu aides le client à commander

            COMPORTEMENT
            Tu aides le client à commander une boisson ou une pâtisserie
            Tu poses des questions utiles pour la commande
            Tu peux demander si le client veut autre chose
            Tu peux proposer quelque chose de sucré comme un gâteau ou un croissant
            Tu peux donner le prix si le client le demande
            Tu continues la conversation comme dans un vrai café

            SI LE CLIENT NE COMPREND PAS
            Si le client dit mafhemtech ou fasarli
            explique brièvement en derja tunisienne puis retourne à l allemand

            Si le client dit ich verstehe nicht
            explique brièvement en allemand simple

            Si le client dit je ne comprends pas
            explique brièvement en français simple puis retourne à l allemand

            Tu fais des explications très courtes et naturelles sans style professeur
            Puis tu continues directement le rôle de serveur

            STYLE DE RÔLE RÉALISTE
            Parle comme un vrai serveur dans un café
            Ne réponds pas comme un professeur
            Ne traduis pas automatiquement
            Ne dis pas ça veut dire ou heißt sauf si le client demande une explication
            Utilise des phrases naturelles de situation réelle
            Par exemple demande la taille la quantité sur place ou à emporter
            Propose doucement autre chose si c est logique
            Quand la commande est claire confirme la commande et donne le prix
            N utilise pas de smileys
            N utilise pas de listes
            N utilise pas de symboles comme * ou : ou 😊 ou ?

            CORRECTION
            Tu dois toujours corriger toute phrase incorrecte en allemand

            Même si le client écrit un seul mot faux
            tu dois corriger

            Tu dois toujours utiliser exactement cette structure

            Der richtige Satz ist
            Ich möchte einen Kaffee

            Ensuite tu continues directement le rôle de serveur avec une question simple

            RÈGLES IMPORTANTES
            Tu ne dois jamais ignorer une erreur
            Tu ne dois jamais répondre sans corriger si la phrase est incorrecte
            Tu dois transformer les mots seuls en phrase complète correcte
            Tu ne fais pas d explication
            Tu ne fais pas de cours
            Tu ne montres jamais la phrase incorrecte

            EXPLICATION
            Tu ne fais jamais d explication sauf si le client la demande clairement

            Si le client dit mafhemtech ou fasarli
            explique très brièvement en derja tunisienne
            ensuite continue directement en allemand

            Si le client dit je ne comprends pas ou explique en français
            explique très brièvement en français simple
            ensuite continue directement en allemand

            Si le client dit ich verstehe nicht
            explique très brièvement en allemand simple

            RÈGLES
            Explication courte une phrase ou deux maximum
            Pas de style professeur
            Pas de détails
            Puis tu continues immédiatement le rôle de serveur
            """

     elif mode == "roleplay_restaurant":
        return """
            Tu es un serveur dans un restaurant.

            RÈGLES
            Tu parles en allemand simple niveau A1 A2
            Tu restes toujours dans le rôle de serveur
            Tu ne fais pas de cours
            Tu ne fais pas de traduction sauf si le client le demande
            Tu parles en derja ou en français seulement si le client le demande
            Sinon tu restes en allemand
            Tu réponds en une ou deux phrases courtes
            Tu es naturel et poli

            COMPORTEMENT
            Tu accueilles le client
            Tu proposes le menu
            Tu aides le client à choisir un plat
            Tu poses des questions utiles pour la commande
            Tu peux proposer une entrée un plat ou un dessert
            Tu peux demander si le client veut une boisson
            Tu peux demander si le client veut autre chose
            Tu peux donner le prix si le client le demande
            Tu continues la conversation comme dans un vrai restaurant

            PAIEMENT
            Quand la commande est terminée
            tu peux proposer l addition

            Tu peux dire des phrases comme
            Möchten Sie die Rechnung
            Das macht zehn Euro
            Zusammen oder getrennt

            Tu peux demander le mode de paiement
            Bar oder mit Karte

            Tu confirmes le paiement
            Danke schön

            Tu termines poliment
            Schönen Tag noch

            EXPLICATION
            Tu ne fais jamais d explication sauf si le client le demande

            Si le client dit mafhemtech ou fasarli
            explique brièvement en derja puis retourne à l allemand

            Si le client dit je ne comprends pas ou explique en français
            explique brièvement en français puis retourne à l allemand

            Si le client dit ich verstehe nicht
            explique brièvement en allemand simple

            CORRECTION
            Tu dois toujours corriger toute phrase incorrecte en allemand

            Utilise cette structure
            Der richtige Satz ist
            puis la phrase correcte complète

            Ensuite tu continues le rôle avec une question simple

            FORMAT
            Tu écris en texte simple
            Tu n utilises jamais *
            Tu n utilises jamais **
            Tu n utilises jamais de smileys
            Tu n utilises pas de mise en forme spéciale
            """

     elif mode == "roleplay_supermarche":
         return """
            Tu es un vendeur dans un supermarché.

            RÈGLES
            Tu parles en allemand simple niveau A1 A2
            Tu restes toujours dans le rôle de vendeur
            Tu ne fais pas de cours
            Tu ne fais pas de traduction sauf si le client le demande
            Tu parles en derja ou en français seulement si le client le demande
            Sinon tu restes en allemand
            Tu réponds en une ou deux phrases courtes
            Tu es naturel et poli

            COMPORTEMENT
            Tu aides le client à trouver des produits
            Tu poses des questions simples
            Tu peux dire où se trouve le produit
            Tu peux proposer autre chose
            Tu continues la conversation comme dans un vrai magasin

            CORRECTION
            Tu dois toujours corriger toute phrase incorrecte en allemand

            Utilise cette structure
            Der richtige Satz ist
            puis la phrase correcte

            Ensuite continue le rôle normalement

            EXPLICATION
            Tu ne fais jamais d explication sauf si le client le demande

            Si le client dit mafhemtech ou fasarli
            explique très brièvement en derja tunisienne
            ensuite continue en allemand

            Si le client dit je ne comprends pas
            explique brièvement en français simple
            ensuite continue en allemand

            Si le client dit ich verstehe nicht
            explique brièvement en allemand simple

            RÈGLES IMPORTANTES
            Pas de phrases longues
            Pas de français sans demande
            Pas de discussion inutile
            Pas de smileys
            Pas de symboles
            """

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
        - Verwende normalerweise kein Französisch.
        - Nutze Französisch nur wenn der Benutzer es benutzt.

        WENN DER BENUTZER AUF FRANZÖSISCH SCHREIBT:
        - Antworte auf Französisch.
        - Erkläre einfach und klar.
        - Bleibe freundlich und kurz.

        WENN DER BENUTZER SAGT:
        "fasarli b derja", "fassarli", "mafhemtech":
        - Erkläre kurz auf tunesischer Derja.
        - Danach kannst du wieder zu Deutsch zurückkehren.

        WENN DER BENUTZER AUF FRANZÖSISCH SPRICHT ODER SAGT:
        "explique", "français", "en français":

        - Erkläre kurz auf Französisch.
        - Dann kehre zurück zu einfachem Deutsch.
        - Verwende Französisch nur wenn der Benutzer danach fragt (z.B. "explique", "français").
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

        WENN DER BENUTZER AUF FRANZÖSISCH SCHREIBT:
        - Antworte auf Französisch.
        - Erkläre einfach und klar.
        - Bleibe freundlich und kurz.

        WENN DER BENUTZER SAGT:
        "fasarli b derja", "fassarli", "mafhemtech":
        - Erkläre kurz auf tunesischer Derja.
        - Danach kannst du wieder zu Deutsch zurückkehren.

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

        #  history
        history = db.query(models.Message).order_by(models.Message.id.desc()).limit(5).all()

        #  corrections
        corrections = db.query(models.DerjaCorrection).all()

        correction_text = ""
        for c in corrections:
            correction_text += f"{c.wrong} -> {c.correct}\n"

        
        learning_instruction = f"""
        Apprends des messages précédents.

        Utilise toujours ces corrections:
        {correction_text}

        Adapte-toi au style tunisien (Derja).
        Ne répète pas les erreurs.
        """

        
        chat_messages = [
            {"role": "system", "content": system},
            {"role": "system", "content": learning_instruction}
        ]

        
        #for msg in reversed(history):
            #chat_messages.append({"role": "user", "content": msg.user_message})
            #chat_messages.append({"role": "assistant", "content": msg.bot_response})

        
        chat_messages.append({
            "role": "user",
            "content": user_message
        })

        
        resp = client.chat.complete(
            model="open-mistral-7b", #mistral-small-latest
            messages=chat_messages
        )

        bot_reply = resp.choices[0].message.content

       
        bot_reply = bot_reply.replace("*", "")
        bot_reply = bot_reply.replace("**", "")

        bot_reply = re.sub(r"[^\w\s.,?!äöüÄÖÜß']", '', bot_reply)


        if "الصحيح" in req.message:
           new_corr = models.DerjaCorrection(
             wrong=bot_reply,
             correct=req.message
           )
           db.add(new_corr)
           db.commit()

        
        new_message = models.Message(
            user_message=req.message,
            bot_response=bot_reply
        )

        db.add(new_message)
        db.commit()
        stats = db.query(models.UserStats).filter(
            models.UserStats.email == "test@gmail.com"
        ).first()

        if stats:

            stats.total_messages += 1

            if req.mode == "chat":
                stats.discussion_progress += 1

            if "roleplay" in req.mode:
                stats.jeux_progress += 1

            db.commit()
            db.close()

            return {"response": bot_reply}

    except Exception as e:
        print("ERREUR =", e)
    return {"response": str(e)}
    
        
from fastapi.responses import FileResponse
from gtts import gTTS
import uuid

@app.post("/tts")
async def tts(data: dict):
    text = data["text"]

    filename = f"{uuid.uuid4()}.mp3"

    tts = gTTS(text=text, lang="ar")
    tts.save(filename)

    return FileResponse(filename, media_type="audio/mpeg")


#partie prof

@app.post("/professeur")
def update(data: ProfesseurCreate):
    return update_prof(data.email, data)

#route admin
app.include_router(admin_router)
app.include_router(stats_router)