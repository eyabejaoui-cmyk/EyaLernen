from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from database import get_db
from models import User

router = APIRouter(prefix="/user", tags=["User"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class ChangePasswordData(BaseModel):
    email: str
    old_password: str
    new_password: str


@router.get("/profile/{email}")
def get_user_profile(email: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()

    if user is None:
        raise HTTPException(status_code=404, detail="Utilisateur introuvable")

    return {
        "id": user.id,
        "nom": user.nom,
        "prenom": user.prenom,
        "email": user.email,
        "role": user.role,
        "niveau": getattr(user, "niveau", None),
    }


@router.put("/change-password")
def change_password(data: ChangePasswordData, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()

    if user is None:
        raise HTTPException(status_code=404, detail="Utilisateur introuvable")

    user.password_hash = pwd_context.hash(data.new_password)

    db.commit()

    return {"message": "Mot de passe modifié avec succès"}