from database import SessionLocal
import models

def update_prof(email, data):
    db = SessionLocal()

    prof = db.query(models.Professeur).filter(
        models.Professeur.email == email
    ).first()

    if not prof:
        return {"error": "prof not found"}

    prof.nom = data.nom
    prof.prenom = data.prenom
    prof.description = data.description
    prof.horaires = data.horaires
    prof.niveau = data.niveau
    prof.groupe = data.groupe
    prof.prix_groupe = data.prix_groupe
    prof.prix_individuel = data.prix_individuel
    prof.image = data.image

    db.commit()
    db.close()

    return {"message": "profil mis à jour"}