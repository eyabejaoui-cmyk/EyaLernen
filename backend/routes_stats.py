from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import models

router = APIRouter()


@router.get("/stats-modes/{email}")
def get_modes(email: str, db: Session = Depends(get_db)):

    stats = db.query(models.StatistiquesMode)\
        .filter_by(email_utilisateur=email)\
        .all()

    return stats




@router.post("/update-mode-time")
def update_mode_time(data: dict, db: Session = Depends(get_db)):

    email = data["email_utilisateur"]
    mode = data["mode"]
    temps = data.get("temps_passe", 0)

    stat = db.query(models.StatistiquesMode)\
        .filter_by(email_utilisateur=email, mode=mode)\
        .first()

    if stat:
        stat.temps_passe += temps
    else:
        stat = models.StatistiquesMode(
            email_utilisateur=email,
            mode=mode,
            temps_passe=temps
        )
        db.add(stat)

    db.commit()

    return {"message": "ok"}

@router.get("/stats/{email}")
def get_stats(email: str, db: Session = Depends(get_db)):

    stats = db.query(models.UserStats).filter(
        models.UserStats.email == email
    ).first()

    if not stats:

        return {
            "minutes": 0,
            "messages": 0,
            "sessions": 0,
            "discussion": 0,
            "jeux": 0,
            "vocabulaire": 0
        }

    return {

        "minutes": stats.temps_total,

        "messages": stats.total_messages,

        "sessions": stats.total_sessions,

        "discussion": stats.discussion_progress,

        "jeux": stats.jeux_progress,

    }


@router.post("/update-time")
def update_time(data: dict, db: Session = Depends(get_db)):

    stats = db.query(models.UserStats).filter(
        models.UserStats.email == data["email"]
    ).first()

    if stats:

        stats.temps_total += data["temps"]

        stats.total_sessions += 1

        db.commit()

    return {"message": "updated"}


@router.get("/stats-days/{email}")
def get_stats_days(email: str, db: Session = Depends(get_db)):

    stats = db.query(models.UserStats).all()

    result = []

    for s in stats:

        result.append({

            "day": f"J{s.id}",

            "messages": s.total_messages,

            "temps": s.temps_total
        })

    return result