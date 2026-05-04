from pydantic import BaseModel  #هو اللي يخلي FastAPI يفهم شنوة الداتا اللي باش تدخل من الفرونت
 

class UserCreate(BaseModel):
    prenom : str 
    nom : str
    email : str
    password : str
    age : str
    statut : str
    niveau : str
    langue : str

class UserLogin(BaseModel):
    email: str
    password : str

class Chat(BaseModel):
    message: str


class ProfesseurCreate(BaseModel):
    email: str   

    nom: str
    prenom: str
    description: str
    horaires: str
    niveau: str
    groupe: int
    prix_groupe: int
    prix_individuel: int
    image: str