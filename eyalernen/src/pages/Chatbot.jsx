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
  

  

//function speakText(text) {
  //window.speechSynthesis.cancel();  //Arrête tout son qui fonctionne déjà

  //const parts = text.split("\n").map((p) => p.trim()).filter(Boolean);  //["Hello", "How are you"] / Supprime les espaces

  //parts.forEach((part) => {   // c le ligne
    //const utterance = new SpeechSynthesisUtterance(part);
    // utterance=le son / part=les mots / SpeechSynthesisUtterance= tranforme les mot en son
    

    
    //if (/[\u0600-\u06FF]/.test(part)) {
      //utterance.lang = "ar";
    //} else {
      //utterance.lang = "de-DE";
    //}

    //window.speechSynthesis.speak(utterance);
    
 //});
//}

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

  // Auto-scroll en bas à chaque nouveau message
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

    // Historique: 10 derniers messages (user/bot) -> (user/assistant)
    const history = updatedMessages.slice(-10).map((m) => ({
      role: m.role === "user" ? "user" : "assistant",
      text: m.text,
    }));

    // Timeout pour éviter rester bloqué sur "..."
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

      // Si FastAPI renvoie une erreur, il renvoie souvent JSON {"detail": "..."}
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
    <div className="h-screen flex flex-col bg-[#f8f6f4]">

      <button
  onClick={() => navigate("/ness")}
  className="
  fixed top-4 right-4 z-50

  w-12 h-12

  rounded-full
  border border-gray-300
  bg-white

  flex items-center justify-center

  text-gray-700

  shadow-sm
  hover:bg-gray-100

  transition
  "
>

  ✕

</button>

      
      <div className="border-b border-[#ddd6cf] flex items-center px-4 sm:px-8 py-3 sm:py-4 bg-[#F4F2EF]">
        <div className="flex items-center gap-4"> 
          <div className="w-10 h-10 sm:w-12 sm:h-12 text-xl sm:text-2xl bg-gradient-to-br from-[#F5A623] to-[#E09010]
                 rounded-[14px] flex items-center justify-center
                 shadow-[0_4px_16px_rgba(245,166,35,0.4)]" >
                  🦉
            </div>
            <div>
              <h2 className="font-semibold text-sm sm:text-base text-gray-700">Eya – Assistant IA</h2>
            </div>
        </div>
      </div>
      

      <div
        ref={boxRef}
        className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4"
        >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex items-start gap-2 sm:gap-4 my-4 ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {m.role !== "user" && (
             <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#F5B63A]">
              🤖
             </div>
            )}
            <div
              className={`px-5 py-1.5 rounded-[22px] max-w-[85%] sm:max-w-[75%] md:max-w-[620px] whitespace-pre-wrap break-all overflow-hidden text-sm sm:text-[15px] leading-6 sm:leading-8 border shadow-sm ${
               m.role === "user"
               ? "bg-[#1E3A78] text-white border-[#1E3A78]"
               : "bg-white text-[#0f172a] border-[#ddd6cf]"
              }`}
            >
              {m.text}
            </div>
            {m.role === "user" && (
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1E3A78]">
               👤
            </div>
            )}
              
            
          </div>
        ))}
      </div>

      <div className="border-t border-[#ddd6cf] px-3 sm:px-6 py-3 sm:py-4 bg-[#f8f6f4]">
      <div className="max-w-4xl w-full mx-auto flex items-center gap-2 sm:gap-4">
    
    <button
      onClick={startVoiceRecognition}
      disabled={loading || listening}
      className="w-10 h-10 sm:w-12 sm:h-12 text-sm sm:text-[15px] rounded-2xl border border-[#ddd6cf] bg-white flex items-center justify-center text-lg hover:bg-gray-50 transition"
    >
      {listening ? "🎙️" : "🎙"}
    </button>

    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Schreib etwas auf Deutsch... (Écris quelque chose en allemand...)"
      className="flex-1 min-w-0 h-10 sm:h-12 rounded-2xl border border-[#ddd6cf] bg-white px-5 text-sm sm:text-[15px] outline-none placeholder:text-[#64748b] transition"
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
      className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#F5A623] text-[#0f172a] flex items-center justify-center text-lg hover:opacity-90 transition"
    >
      {loading ? "..." : "➤"}
    </button>

  </div>
</div>
     
    </div>
  );
}