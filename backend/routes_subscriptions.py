from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime, timedelta

from database import get_db
from models import User, Subscription, Payment

router = APIRouter()


class SubscribeRequest(BaseModel):
    email: str
    plan: str


@router.post("/subscribe")
def subscribe(data: SubscribeRequest, db: Session = Depends(get_db)):

    # Vérifier seulement le mail
    user = db.query(User).filter(User.email == data.email).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="Email introuvable dans la table users"
        )

    # Prix selon le plan
    if data.plan == "premium_mensuel":
        amount = 25
    elif data.plan == "premium_annuel":
        amount = 249
    else:
        amount = 0

    # Stocker abonnement
    subscription = Subscription(
        user_id=user.id,
        plan=data.plan,
        amount=amount,
        status="actif",
        start_date=datetime.utcnow(),
        end_date=None
    )

    db.add(subscription)
    db.commit()
    db.refresh(subscription)

    # Stocker paiement
    payment = Payment(
        user_id=user.id,
        subscription_id=subscription.id,
        amount=amount,
        status="payé",
        payment_date=datetime.utcnow()
    )

    db.add(payment)
    db.commit()

    return {
        "message": "Paiement confirmé",
        "email": data.email,
        "plan": data.plan,
        "amount": amount,
        "status": "payé"
    }