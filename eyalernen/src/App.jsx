import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot";
import Ness from "./pages/Ness";
import Inscription from "./pages/Inscription";
import Login from "./pages/Login";
import Jeux from "./pages/Jeux";
import Cafe from "./pages/Cafe";
import Restaurant from "./pages/Restaurant";
import Supermarche from "./pages/Supermarche";
import ProfList from "./pages/ProfList";
import Mots from "./pages/Mots";
import ModeAppel from "./pages/ModeAppel";
import Admin from "./pages/Admin";
import UserProfile from "./pages/UserProfile";
import Subscription from "./pages/Subscription";
import ProfesseurSpace from "./pages/ProfesseurSpace";
import Compte from "./pages/Compte";
import ChoixThemeMots from "./pages/ChoixThemeMots";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/ness" element={<Ness />} />
      <Route path="/Inscription" element={<Inscription />} />
      <Route path="/login" element={<Login />} />
      <Route path="/jeux" element={<Jeux />} />
      <Route path="/Cafe" element={<Cafe />} />
      <Route path="/Restaurant" element={<Restaurant />} />
      <Route path="/Supermarche" element={<Supermarche />} />
      <Route path="/ProfList" element={<ProfList />} />
      <Route path="/Mots" element={<Mots />} />
      <Route path="/ness/ModeAppel" element={<ModeAppel />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/ProfesseurSpace" element={<ProfesseurSpace />} />
      <Route path="/compte" element={<Compte />} />
      <Route path="/ChoixThemeMots" element={<ChoixThemeMots />} />
      <Route path="/ness/ChoixThemeMots" element={<ChoixThemeMots />} />


    </Routes>
  );
}