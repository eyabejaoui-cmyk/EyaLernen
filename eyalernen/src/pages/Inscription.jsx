import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



export default function Inscription(){
    const [step , setStep] = useState(1);

    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [statut, setStatut] = useState("");
    const [niveau, setNiveau] = useState("");
    const [langue, setLangue] = useState("");


    // useNavigate vient de react-router-dom
    const navigate = useNavigate();

   const handleCreateAccount = (e) => {
        e.preventDefault();

        if (!niveau || !langue) {
           alert("Merci de remplir tous les champs");
           return;
        }

        navigate("/ness");
        };
    
        const handleNext = () => {
           if (step === 1) {
            if (!prenom || !nom || !email || !password) {
               alert("Merci de remplir tous les champs");
               return;
            }
        }

            if (step === 2) {
              if (!age || !statut) {
              alert("Merci de remplir tous les champs");
              return;
            }
        }

             setStep(step + 1);
        };
    return(
      
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-[#F4F2EF]">
        <div className="w-full max-w-xl rounded-[30px] border border-gray-300 items-center p-5 sm:p-8 md:p-10 bg-white ">
        <div className="leading-7 items-center ">
            <h1 className="mb-7 text-center text-xl font-bold sm:text-2xl">Créer un compte</h1>
            <form>
                {step === 1 && (<> {/* <> fragment </>*/}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> {/* colonne/ ligne*/}
                <div>
                    <label className="block mb-1">Prénom</label>
                    <input 
                      type="text" 
                      name="prenom" 
                      required 
                      className="w-full border rounded-2xl px-3 py-2 " 
                      placeholder="Prénom" 
                      value={prenom}  
                      onChange={(e) => setPrenom(e.target.value)} 
                    />
                </div>
                <div>
                  <label className="block mb-1">Nom</label>
                  <input 
                    type="text" 
                    name="nom" 
                    required 
                    className="w-full border rounded-2xl px-3 py-2 " placeholder="Nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                />
                </div>
                </div>
                <div>
                    <label className="block mb-1 mt-3">Email</label>
                    <input 
                       type="email" 
                       name="mail" 
                       required 
                       className="w-full border rounded-2xl px-3 py-2 mb-4" placeholder="votre@mail.com" value={email}
                       onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                  <label className="block mb-1 mt-3">Mot de passe</label>
                  <input type="password" name="password" required className="w-full border rounded-2xl px-3 py-2 mb-4" placeholder="Mot de passe" 
                  value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>  </>)}
                 {step ===2 && (<>
                <div>
                    <label>Quel est ton âge ?</label>
                    <select  
                      name="age" 
                      required 
                      className="w-full border rounded-2xl px-3 py-2 mb-4" 
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    >
                    <option value="">Choisir une tranche d’âge</option>
                    <option value="-18">Moins de 18 ans</option>
                    <option value="18-25">18 - 25 ans</option>
                    <option value="25-35">25 - 35 ans</option>
                    <option value="35+">Plus de 35 ans</option>
                    </select>
                </div>
                <div>
                    <label>Quel est ton statut ?</label>
                    <select 
                      name="statut" 
                      required 
                      className="w-full border rounded-2xl px-3 py-2 mb-4"
                      value={statut}
                      onChange={(e) => setStatut(e.target.value)}
                    > 
                    <option value="">Choisir un statut</option>
                    <option value="etudiant">Étudiant</option>
                    <option value="salarie">Salarié</option>
                    <option value="demandeur_emploi">Demandeur d’emploi</option>
                    <option value="autre">Autre</option>
                    </select>
                </div></>)}

                {step === 3 && ( <>
                <div>
                    <label>Quel est ton niveau en allemand ?</label>
                     <select 
                        name="niveau" 
                        required 
                        className="w-full border rounded-2xl px-3 py-2 mb-4 "
                        value={niveau}
                        onChange={(e) => setNiveau(e.target.value)}
                     >
                       <option value="">Choisir un niveau</option>
                       <option value="grand_debutant">Grand débutant</option>
                       <option value="debutant">Débutant</option>
                       <option value="intermediaire">Intermédiaire</option>
                       <option value="avance">Avancé</option>
                     </select>
                </div>
                <div>
                   <label className="block mb-1 mt-3">Dans quelle langue veux-tu les explications ?</label>
                   <select 
                       name="langue" 
                       required className="w-full border rounded-2xl px-3 py-2 mb-4 "
                       value={langue}
                       onChange={(e) => setLangue(e.target.value)}
                    >
                      <option value="">Choisir une langue</option>
                      <option value="francais">Français</option>
                      <option value="derja">Derja</option>
                    </select>
                </div> </>)}

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-between">
                    <div>
                      {step > 1 && ( <button onClick={() => setStep(step - 1)}  type="button" className="rounded-2xl bg-[#F5A623] px-5 py-2 text-white">
                       Retour</button> )}
                    </div>

                    <div> {step < 3 && ( <button onClick={handleNext}  type="button" className="rounded-2xl bg-[#F5A623] px-5 py-2 text-white"  >
                      Suivant </button> )}

                      {step === 3 && ( 
                        <button 
                          type="button" 
                          className="rounded-2xl bg-[#F5A623] px-5 py-2 text-white" 
                          onClick={handleCreateAccount}
                        > 
                          Créer un compte
                        </button>)}
                     </div>
                </div>
                
            </form>
        </div>
      </div>
      </div>
    
      
    );

}