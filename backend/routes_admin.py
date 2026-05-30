from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy import Column, func
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from database import SessionLocal, get_db
from models import User, Message, StatistiquesUtilisateur, StatistiquesMode



router = APIRouter()

router = APIRouter(
    tags=["Admin"]
)

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

    today = datetime.now().date()
    start_date = today - timedelta(days=6)

    chatbot_result = (
        db.query(
            func.date(Message.created_at).label("date"),
            func.count(Message.id).label("chatbot")
        )
        .filter(func.date(Message.created_at) >= start_date)
        .group_by(func.date(Message.created_at))
        .all()
    )

    platform_result = (
        db.query(
            func.date(StatistiquesMode.created_at).label("date"),
            func.sum(StatistiquesMode.temps_passe).label("platform")
        )
        .filter(func.date(StatistiquesMode.created_at) >= start_date)
        .group_by(func.date(StatistiquesMode.created_at))
        .all()
    )

    chatbot_dict = {}
    for row in chatbot_result:
        chatbot_dict[row.date] = row.chatbot

    platform_dict = {}
    for row in platform_result:
        platform_dict[row.date] = row.platform or 0

    jours = {
        0: "Lun",
        1: "Mar",
        2: "Mer",
        3: "Jeu",
        4: "Ven",
        5: "Sam",
        6: "Dim",
    }

    activity = []

    for i in range(7):
        current_day = start_date + timedelta(days=i)

        activity.append({
            "day": jours[current_day.weekday()],
            "chatbot": chatbot_dict.get(current_day, 0),
            "platform": platform_dict.get(current_day, 0)
        })

    db.close()

    return activity


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

@router.get("/admin/etudiants")
def get_etudiants(db: Session = Depends(get_db)):
    etudiants = db.query(User).all()
    return etudiants


@router.get("/admin/professeurs")
def get_professeurs(db: Session = Depends(get_db)):
    professeurs = db.query(User).filter(
        User.role.in_(["prof", "Professeur"])
    ).all()

    return professeurs

@router.get("/admin/recent-activity")
def get_recent_activity(db: Session = Depends(get_db)):

    activities = (
        db.query(StatistiquesMode)
        .order_by(StatistiquesMode.created_at.desc())
        .limit(5)
        .all()
    )

    result = []

    for a in activities:
        user = db.query(User).filter(User.email == a.email_utilisateur).first()

        if user:
            name = f"{user.prenom} {user.nom}"
            avatar = f"{user.prenom[0]}{user.nom[0]}".upper()
        else:
            name = a.email_utilisateur
            avatar = "U"

        result.append({
            "id": a.id,
            "name": name,
            "avatar": avatar,
            "color": "#FFC107" if a.mode == "chatbot" else "#DC2626",
            "mode": a.mode,
            "action": f"Temps passé : {a.temps_passe} min",
            "time": a.created_at.strftime("%d/%m/%Y")
        })

    return result

@router.get("/admin/recent-activity")
def get_recent_activity(db: Session = Depends(get_db)):

    activities = (
        db.query(StatistiquesMode)
        .order_by(StatistiquesMode.id.desc())
        .limit(5)
        .all()
    )

    result = []

    for a in activities:

        user = db.query(User).filter(
            User.email == a.email_utilisateur
        ).first()

        if user:
            name = user.prenom + " " + user.nom
            avatar = user.prenom[0].upper() + user.nom[0].upper()
        else:
            name = a.email_utilisateur
            avatar = "U"

        result.append({
            "id": a.id,
            "name": name,
            "avatar": avatar,
            "color": "#FFC107" if a.mode == "chatbot" else "#DC2626",
            "mode": a.mode,
            "action": str(a.temps_passe) + " min passées",
            "time": a.created_at.strftime("%d/%m/%Y") if a.created_at else "-"
        })

    return result

@router.get("/admin/leaderboard")
def get_leaderboard(db: Session = Depends(get_db)):

    stats = (
        db.query(StatistiquesUtilisateur)
        .order_by(StatistiquesUtilisateur.temps_passe.desc())
        .limit(5)
        .all()
    )

    result = []

    for index, s in enumerate(stats):

        user = db.query(User).filter(
            User.email == s.email_utilisateur
        ).first()

        if user:
            name = user.prenom + " " + user.nom
            avatar = user.prenom[0].upper() + user.nom[0].upper()
        else:
            name = s.email_utilisateur
            avatar = "U"

        xp = (s.temps_passe or 0) + ((s.phrases_terminees or 0) * 10)

        result.append({
            "rank": index + 1,
            "name": name,
            "avatar": avatar,
            "color": "#FFC107",
            "xp": xp,
            "pct": min(100, xp)
        })

    return result