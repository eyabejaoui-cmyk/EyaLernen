from sqlalchemy import Column, Integer, String, Text
from database import Base

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