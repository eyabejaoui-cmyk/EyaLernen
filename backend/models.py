from sqlalchemy import Column, Integer, String, Text, DateTime
from database import Base
from datetime import datetime


class User(Base) : 
    __tablename__ = "users"
    id = Column ( Integer , primary_key=True)
    prenom = Column(String(100) , nullable=False)
    nom = Column(String(100) , nullable=False)
    email = Column(String(255) , unique=True , nullable=False)
    password_hash = Column(Text , nullable=False)
    age = Column(String(50) , nullable=False)
    statut = Column (String(100), nullable = False )
    niveau = Column(String(100), nullable=False)
    langue = Column(String(50), nullable=False)


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
    __tablename__ = "professeur"

    id = Column(Integer, primary_key=True)

    email = Column(String, unique=True)
    password_hash = Column(String)

    nom = Column(String)
    prenom = Column(String)
    description = Column(String)
    horaires = Column(String)
    niveau = Column(String)
    groupe = Column(Integer)
    prix_groupe = Column(Integer)
    prix_individuel = Column(Integer)
    image = Column(String)

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
