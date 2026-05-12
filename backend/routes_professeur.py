from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import get_db
from models import Professeur, ProfesseurCours, ProfesseurEtudiant, User, ReservationCours


router = APIRouter()


class ProfesseurRequest(BaseModel):
    nom: str
    prenom: str
    telephone: str
    email: str
    photo: str
    description: str
    niveaux: str


class CoursRequest(BaseModel):
    professeur_id: int
    niveau: str
    type_cours: str
    prix: float
    horaire: str


@router.post("/professeur/profile")
def save_professeur(data: ProfesseurRequest, db: Session = Depends(get_db)):

    professeur = db.query(Professeur).filter(
        Professeur.email == data.email
    ).first()

    if professeur:
        professeur.nom = data.nom
        professeur.prenom = data.prenom
        professeur.telephone = data.telephone
        professeur.photo = data.photo
        professeur.description = data.description
        professeur.niveaux = data.niveaux

    else:
        professeur = Professeur(
            nom=data.nom,
            prenom=data.prenom,
            telephone=data.telephone,
            email=data.email,
            photo=data.photo,
            description=data.description,
            niveaux=data.niveaux
        )

        db.add(professeur)

    db.commit()
    db.refresh(professeur)

    return {
        "message": "Profil professeur enregistré",
        "professeur_id": professeur.id,
        "nom": professeur.nom,
        "prenom": professeur.prenom,
        "email": professeur.email
    }


@router.get("/professeur/profile/{email}")
def get_professeur(email: str, db: Session = Depends(get_db)):

    professeur = db.query(Professeur).filter(
        Professeur.email == email
    ).first()

    if not professeur:
        raise HTTPException(status_code=404, detail="Professeur introuvable")

    return professeur


@router.post("/professeur/cours")
def add_cours(data: CoursRequest, db: Session = Depends(get_db)):

    professeur = db.query(Professeur).filter(
        Professeur.id == data.professeur_id
    ).first()

    if not professeur:
        raise HTTPException(status_code=404, detail="Professeur introuvable")

    cours = ProfesseurCours(
        professeur_id=data.professeur_id,
        niveau=data.niveau,
        type_cours=data.type_cours,
        prix=data.prix,
        horaire=data.horaire
    )

    db.add(cours)
    db.commit()
    db.refresh(cours)

    return {
        "message": "Cours ajouté avec succès",
        "id": cours.id,
        "niveau": cours.niveau,
        "type_cours": cours.type_cours,
        "prix": cours.prix,
        "horaire": cours.horaire
    }


@router.get("/professeur/cours/{professeur_id}")
def get_cours(professeur_id: int, db: Session = Depends(get_db)):

    cours = db.query(ProfesseurCours).filter(
        ProfesseurCours.professeur_id == professeur_id
    ).all()

    return cours


@router.get("/professeur/etudiants/{professeur_id}")
def get_etudiants(professeur_id: int, db: Session = Depends(get_db)):

    inscriptions = db.query(ProfesseurEtudiant).filter(
        ProfesseurEtudiant.professeur_id == professeur_id
    ).all()

    result = {
        "A1": [],
        "A2": [],
        "B1": [],
        "B2": []
    }

    for inscription in inscriptions:
        user = db.query(User).filter(User.id == inscription.user_id).first()

        if user:
            etudiant = {
                "nom": user.nom,
                "prenom": user.prenom,
                "email": user.email,
                "niveau": inscription.niveau,
                "type_cours": inscription.type_cours,
                "date_inscription": inscription.date_inscription
            }

            if inscription.niveau in result:
                result[inscription.niveau].append(etudiant)

    return result


@router.get("/professeurs")
def get_all_professeurs(db: Session = Depends(get_db)):

    professeurs = db.query(Professeur).all()

    result = []

    for prof in professeurs:
        cours = db.query(ProfesseurCours).filter(
            ProfesseurCours.professeur_id == prof.id
        ).all()

        result.append({
            "id": prof.id,
            "nom": prof.nom,
            "prenom": prof.prenom,
            "email": prof.email,
            "telephone": prof.telephone,
            "photo": prof.photo,
            "description": prof.description,
            "niveaux": prof.niveaux,
            "cours": cours
        })

    return result


class ReservationRequest(BaseModel):
    user_email: str
    professeur_id: int
    cours_id: int
    montant: float


@router.post("/professeur/reserver")
def reserver_cours(data: ReservationRequest, db: Session = Depends(get_db)):

    cours = db.query(ProfesseurCours).filter(
        ProfesseurCours.id == data.cours_id
    ).first()

    if not cours:
        raise HTTPException(status_code=404, detail="Cours introuvable")

    reservation = ReservationCours(
        user_email=data.user_email,
        professeur_id=data.professeur_id,
        cours_id=data.cours_id,
        montant=data.montant,
        status="payé"
    )

    db.add(reservation)
    db.commit()
    db.refresh(reservation)

    return {
        "message": "Paiement confirmé et réservation enregistrée",
        "reservation_id": reservation.id,
        "user_email": reservation.user_email,
        "professeur_id": reservation.professeur_id,
        "cours_id": reservation.cours_id,
        "montant": reservation.montant,
        "status": reservation.status
    }

@router.get("/professeur/reservations/{professeur_id}")
def get_reservations_professeur(professeur_id: int, db: Session = Depends(get_db)):

    reservations = db.query(ReservationCours).filter(
        ReservationCours.professeur_id == professeur_id
    ).all()

    result = []

    for r in reservations:
        cours = db.query(ProfesseurCours).filter(
            ProfesseurCours.id == r.cours_id
        ).first()

        result.append({
            "id": r.id,
            "user_email": r.user_email,
            "montant": r.montant,
            "status": r.status,
            "date_reservation": r.date_reservation,
            "niveau": cours.niveau if cours else "",
            "type_cours": cours.type_cours if cours else "",
            "horaire": cours.horaire if cours else ""
        })

    return result