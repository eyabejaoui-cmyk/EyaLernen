import { useState } from "react";

export default function ModeAppel() {

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const speak = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "de-DE";
    window.speechSynthesis.speak(msg);
  };

  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Browser ne supporte pas le micro");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "de-DE";

    recognition.start();

    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript;

      // message user
      setMessages(prev => [...prev, { role: "user", text }]);

      setLoading(true);

      try {
        const res = await fetch("http://127.0.0.1:8000/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ message: text })
        });

        const data = await res.json();

        const reply = data.reply;

        // message bot
        setMessages(prev => [...prev, { role: "bot", text: reply }]);

        // parler
        speak(reply);

      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">

      <h1 className="text-2xl font-bold mb-4">Mode Appel IA 🎤</h1>

      {/* CHAT */}
      <div className="w-full max-w-md bg-white p-4 rounded-xl shadow mb-4 h-[300px] overflow-y-auto">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}
          >
            <span className="inline-block bg-gray-200 px-3 py-2 rounded-xl">
              {msg.text}
            </span>
          </div>
        ))}

        {loading && <p className="text-gray-400">⏳ Réponse...</p>}

      </div>

      {/* MICRO */}
      <button
        onClick={startListening}
        className="w-20 h-20 bg-blue-600 text-white rounded-full text-2xl shadow-lg"
      >
        🎤
      </button>

    </div>
  );
}