import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:8000/chat";
const TIMEOUT_MS = 30000; // 30s

export default function Chatbot({ scenario }) {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("chat");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hallo!" },
  ]);

  const boxRef = useRef(null);

  const navigate = useNavigate();

  function speakText(text) {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    const voices = speechSynthesis.getVoices();

    const germanVoice = voices.find(v => v.lang.startsWith("de"));

    if (germanVoice) {
      utterance.voice = germanVoice;
      utterance.lang = germanVoice.lang;
    } else {
      utterance.lang = "de-DE";
    }

    utterance.rate = 1.0;

    window.speechSynthesis.speak(utterance);
  }

  function startVoiceRecognition() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("La reconnaissance vocale n'est pas supportée sur ce navigateur.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang =
      mode === "arabe"
        ? "ar-TN"
        : "de-DE";

    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onerror = (event) => {
      console.log("Erreur micro :", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  }

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://127.0.0.1:8000/update-time", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "test@gmail.com",
          temps: 1,
        }),
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scenario === "cafe") {
      setMessages([
        { role: "bot", text: "Guten Tag! Was möchten Sie bestellen?" }
      ]);
    }

    if (scenario === "restaurant") {
      setMessages([
        { role: "bot", text: "Guten Abend! Haben Sie reserviert?" }
      ]);
    }

    if (scenario === "supermarche") {
      setMessages([
        { role: "bot", text: "Hallo! Kann ich Ihnen helfen?" }
      ]);
    }
  }, [scenario]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const updatedMessages = [...messages, { role: "user", text }];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    const history = updatedMessages.slice(-10).map((m) => ({
      role: m.role === "user" ? "user" : "assistant",
      text: m.text,
    }));

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      let modeFinal = "chat";

      if (scenario === "cafe") {
        modeFinal = "roleplay_cafe";
      }

      if (scenario === "restaurant") {
        modeFinal = "roleplay_restaurant";
      }

      if (scenario === "supermarche") {
        modeFinal = "roleplay_supermarche";
      }

      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: input,
          mode: modeFinal,
          email: localStorage.getItem("email")
        })
      });

      if (!res.ok) {
        let errMsg = `HTTP ${res.status}`;
        const contentType = res.headers.get("content-type") || "";

        if (contentType.includes("application/json")) {
          const errJson = await res.json().catch(() => null);
          if (errJson?.detail) errMsg = String(errJson.detail);
          else errMsg = JSON.stringify(errJson);
        } else {
          const errText = await res.text().catch(() => "");
          if (errText) errMsg = errText;
        }

        throw new Error(errMsg);
      }

      const data = await res.json();
      const botReply = data.response ?? "(Réponse vide)";
      setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
      speakText(botReply);
    } catch (err) {
      const msg =
        err?.name === "AbortError"
          ? "Timeout: le serveur a mis trop de temps à répondre."
          : err?.message || JSON.stringify(err);

      console.log("Erreur fetch:", err);
      setMessages((prev) => [...prev, { role: "bot", text: `⚠️ Erreur: ${msg}` }]);
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex flex-col bg-[#171717]">

      <div className="w-full">
        <div className="h-[5px] bg-black"></div>
        <div className="h-[5px] bg-red-600"></div>
        <div className="h-[5px] bg-[#FFC107]"></div>
      </div>

      <button
        onClick={() => navigate("/ness")}
        className="
        fixed top-8 right-8 z-50

        w-11 h-11

        rounded-full
        border border-[#FFC107]
        bg-[#171717]

        flex items-center justify-center

        text-[#FFC107]
        text-xl

        shadow-sm
        hover:bg-[#FFC107]
       hover:text-black

        transition
        "
      >
        ✕
      </button>

      <div className="border-b border-[#3A2600] flex items-center px-4 sm:px-8 py-3 sm:py-4 bg-[#171717]">
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 text-xl sm:text-2xl bg-gradient-to-br from-[#FFC107] to-[#E0A800]
            rounded-[14px] flex items-center justify-center
            shadow-[0_4px_16px_rgba(255,193,7,0.35)]"
          >
            🦉
          </div>

          <div>
            <h2 className="font-semibold text-sm sm:text-base text-[#FFC107]">
              Eya – Assistant IA
            </h2>
          </div>
        </div>
      </div>

      <div
        ref={boxRef}
        className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-6 bg-[#171717]"
      >
        <div className="max-w-4xl mx-auto">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 sm:gap-4 my-4 ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {m.role !== "user" && (
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FFC107] flex items-center justify-center">
                  🤖
                </div>
              )}

              <div
                className={`px-5 py-1.5 rounded-[22px] max-w-[85%] sm:max-w-[75%] md:max-w-[620px] whitespace-pre-wrap break-all overflow-hidden text-sm sm:text-[15px] leading-6 sm:leading-8 border shadow-sm ${
                  m.role === "user"
                    ? "bg-[#FFC107] text-black border-[#FFC107]"
                    : "bg-[#0F0F0F] text-gray-200 border-[#3A2600]"
                }`}
              >
                {m.text}
              </div>

              {m.role === "user" && (
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#DC2626] flex items-center justify-center">
                  👤
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#3A2600] px-3 sm:px-6 py-3 sm:py-4 bg-[#171717]">
        <div className="max-w-4xl w-full mx-auto flex items-center gap-2 sm:gap-4">

          <button
            onClick={startVoiceRecognition}
            disabled={loading || listening}
            className="w-10 h-10 sm:w-12 sm:h-12 text-sm sm:text-[15px] rounded-2xl border border-[#3A2600] bg-[#0F0F0F] flex items-center justify-center text-lg text-[#FFC107] hover:bg-[#1F1F1F] transition"
          >
            {listening ? "🎙️" : "🎙"}
          </button>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Schreib etwas auf Deutsch... (Écris quelque chose en allemand...)"
            className="flex-1 min-w-0 h-10 sm:h-12 rounded-2xl border border-[#3A2600] bg-[#0F0F0F] px-5 text-sm sm:text-[15px] text-white outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-[#FFC107] transition"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
            disabled={loading}
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#FFC107] text-black flex items-center justify-center text-lg hover:bg-[#E0A800] transition"
          >
            {loading ? "..." : "➤"}
          </button>

        </div>
      </div>

    </div>
  );
}