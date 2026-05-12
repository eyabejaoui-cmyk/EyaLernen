from sqlalchemy import Column, Integer, String, Text, Float, DateTime, ForeignKey
from database import Base
from datetime import datetime
from sqlalchemy.orm import relationship

class User(Base) : 
    __tablename__ = "users"
    id = Column ( Integer , primary_key=True)
    prenom = Column(String(100) , nullable=False)
    nom = Column(String(100) , nullable=False)
    email = Column(String(255) , unique=True , nullable=False)
    password_hash = Column(Text , nullable=False)
    role = Column(String(50), nullable=False)


class Message(Base):
    __tablename__ = "messages"
    id = Column(Integer, primary_key=True)
    user_message = Column(String)
    bot_response = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class DerjaCorrection(Base):
    __tablename__ = "derja_corrections"
    id = Column(Integer, primary_key=True)
    wrong = Column(Text)
    correct = Column(Text)

class Professeur(Base):
    __tablename__ = "professeurs"

    id = Column(Integer, primary_key=True, index=True)

    nom = Column(String(100))
    prenom = Column(String(100))
    telephone = Column(String(50))
    email = Column(String(150), unique=True, index=True)

    photo = Column(Text)
    description = Column(Text)
    niveaux = Column(Text)


class ProfesseurCours(Base):
    __tablename__ = "professeur_cours"

    id = Column(Integer, primary_key=True, index=True)

    professeur_id = Column(Integer, ForeignKey("professeurs.id"))

    niveau = Column(String(20))
    type_cours = Column(String(50))
    prix = Column(Float)
    horaire = Column(String(150))


class ProfesseurEtudiant(Base):
    __tablename__ = "professeur_etudiants"

    id = Column(Integer, primary_key=True, index=True)

    professeur_id = Column(Integer, ForeignKey("professeurs.id"))
    user_id = Column(Integer, ForeignKey("users.id"))

    niveau = Column(String(20))
    type_cours = Column(String(50))
    date_inscription = Column(DateTime, default=datetime.utcnow)

class StatistiquesUtilisateur(Base):
    __tablename__ = "statistiques_utilisateur"

    id = Column(Integer, primary_key=True, index=True)
    email_utilisateur = Column(String, unique=True, index=True)
    temps_passe = Column(Integer, default=0)
    phrases_terminees = Column(Integer, default=0)
    nombre_essais = Column(Integer, default=0)


class StatistiquesMode(Base):
    __tablename__ = "statistiques_modes"

    id = Column(Integer, primary_key=True, index=True)
    email_utilisateur = Column(String)
    mode = Column(String)
    temps_passe = Column(Integer, default=0)


class UserStats(Base):

    __tablename__ = "user_stats"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String, unique=True)

    temps_total = Column(Integer, default=0)

    total_messages = Column(Integer, default=0)

    total_sessions = Column(Integer, default=0)

    discussion_progress = Column(Integer, default=0)

    jeux_progress = Column(Integer, default=0)

  


class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    plan = Column(String, nullable=False)  
    # gratuit / premium_mensuel / premium_annuel

    amount = Column(Float, nullable=False)
    # 0 / 25 / 249

    status = Column(String, default="actif")
    # actif / annulé

    start_date = Column(DateTime, default=datetime.utcnow)
    end_date = Column(DateTime, nullable=True)

    payments = relationship("Payment", back_populates="subscription")


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    subscription_id = Column(Integer, ForeignKey("subscriptions.id"), nullable=False)

    amount = Column(Float, nullable=False)

    status = Column(String, default="payé")
    # payé / échoué

    payment_date = Column(DateTime, default=datetime.utcnow)

    subscription = relationship("Subscription", back_populates="payments")

class ReservationCours(Base):
    __tablename__ = "reservation_cours"

    id = Column(Integer, primary_key=True, index=True)

    user_email = Column(String(150))
    professeur_id = Column(Integer, ForeignKey("professeurs.id"))
    cours_id = Column(Integer, ForeignKey("professeur_cours.id"))

    montant = Column(Float)
    status = Column(String(50), default="payé")
    date_reservation = Column(DateTime, default=datetime.utcnow)