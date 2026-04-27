import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot";
import Ness from "./pages/Ness";
import Inscription from "./pages/Inscription";
import Login from "./pages/Login";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/ness" element={<Ness />} />
      <Route path="/Inscription" element={<Inscription />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}