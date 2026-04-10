from pydantic import BaseModel  #هو اللي يخلي FastAPI يفهم شنوة الداتا اللي باش تدخل من الفرونت
 

class UserCreate(BaseModel):
    prenom : str 
    nom : str
    email : str
    password : str
    age : int
    statut : str
    niveau : str
    langue : str

class UserLogin(BaseModel):
    email: str
    password : str
