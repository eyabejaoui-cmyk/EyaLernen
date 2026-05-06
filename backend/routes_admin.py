from fastapi import APIRouter
from pydantic import BaseModel
from sqlalchemy import Column, func

from database import SessionLocal
from models import User, Message, StatistiquesUtilisateur, StatistiquesMode



router = APIRouter()

class TempsData(BaseModel):
    email: str
    temps: int

@router.get("/admin/stats")
def get_admin_stats():

    db = SessionLocal()

    total_users = db.query(User).count()

    total_messages = db.query(Message).count()

    total_time = db.query(
        func.sum(StatistiquesUtilisateur.temps_passe)
    ).scalar() or 0

    total_phrases = db.query(
        func.sum(StatistiquesUtilisateur.phrases_terminees)
    ).scalar() or 0

    db.close()

    return {
        "apprenants": total_users,
        "conversations": total_messages,
        "temps": total_time,
        "phrases": total_phrases
    }


@router.post("/update-time")
def update_time(data: TempsData):

    db = SessionLocal()

    stats = db.query(StatistiquesUtilisateur).filter(
        StatistiquesUtilisateur.email_utilisateur == data.email
    ).first()

    if stats:

        stats.temps_passe += data.temps

    else:

        stats = StatistiquesUtilisateur(
            email_utilisateur=data.email,
            temps_passe=data.temps,
            phrases_terminees=0,
            nombre_essais=0
        )

        db.add(stats)

    db.commit()
    db.close()

    return {"message": "temps ajouté"}


@router.get("/activity")
def get_activity():

    db = SessionLocal()

    total = db.query(Message).count()

    db.close()

    return [
        {"day": "Lun", "users": total, "sessions": total},
        {"day": "Mar", "users": total, "sessions": total},
        {"day": "Mer", "users": total, "sessions": total},
        {"day": "Jeu", "users": total, "sessions": total},
        {"day": "Ven", "users": total, "sessions": total},
        {"day": "Sam", "users": total, "sessions": total},
        {"day": "Dim", "users": total, "sessions": total},
    ]


@router.get("/modes")
def get_modes():

    db = SessionLocal()

    chatbot = db.query(
        func.sum(StatistiquesMode.temps_passe)
    ).filter(
        StatistiquesMode.mode == "chatbot"
    ).scalar() or 0

    jeux = db.query(
        func.sum(StatistiquesMode.temps_passe)
    ).filter(
        StatistiquesMode.mode == "jeux"
    ).scalar() or 0

    mots = db.query(
        func.sum(StatistiquesMode.temps_passe)
    ).filter(
        StatistiquesMode.mode == "mots"
    ).scalar() or 0

    db.close()

    return [
        {"mode": "Chatbot", "minutes": chatbot},
        {"mode": "Jeux", "minutes": jeux},
        {"mode": "Mots", "minutes": mots},
    ]