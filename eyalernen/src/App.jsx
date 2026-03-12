import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chatbot from "./pages/Chatbot";
import Ness from "./pages/Ness";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/ness" element={<Ness />} />
    </Routes>
  );
}