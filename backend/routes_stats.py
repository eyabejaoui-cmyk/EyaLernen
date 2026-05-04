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