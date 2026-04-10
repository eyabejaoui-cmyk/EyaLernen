from sqlalchemy import create_engine
# engine = outil de connexion

from sqlalchemy.orm import sessionmaker , declarative_base  #outil qui aide Python à travailler avec la base de données plus facilement
# session qui reliée : Python w la base de données

#DATABASE_URL : adresse de connexion 
DATABASE_URL = "postgresql+psycopg://postgres:eyalernen@localhost:5432/eyalernen_db"

engine = create_engine(DATABASE_URL)

#lire les données - ajouter des données - parler avec PostgreSQL

SessionLocal = sessionmaker(autocommit=False,autoflush=False , bind=engine) #commit = sauvegarder / autoflush=envoi temporaire avant la sauvegarde
#bind = relier

Base = declarative_base()

0