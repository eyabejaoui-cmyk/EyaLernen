import { useEffect, useRef, useState } from "react"; //useRef pour contrôler la zone des messages
import { useNavigate } from "react-router-dom";

const API = "http://127.0.0.1:8000/chat";
const TIMEOUT_MS = 30000; // Si le backend ne répond pas après 30sc le frontend affiche une erreur de timeout



export default function Chatbot({ scenario }) { //Il reçoit une information appele scénario


  const [input, setInput] = useState("");  //écrit par l’utilisateur

  const [mode, setMode] = useState("chat");

  const [voiceLang, setVoiceLang] = useState("de-DE"); // langue du micro

  const [voices, setVoices] = useState([]);
  const [showVoiceMenu, setShowVoiceMenu] = useState(false);//???

  const [loading, setLoading] = useState(false); // ....

  const [listening, setListening] = useState(false); // le micro

  const [messages, setMessages] = useState([
    { role: "bot", text: "Hallo!" }, //??
  ]);

  const [explanationLanguage, setExplanationLanguage] = useState("auto");//langue d’explication


  const [showExplanationMenu, setShowExplanationMenu] = useState(false);//menu d'explication

  const boxRef = useRef(null);// scroll

  const navigate = useNavigate();


  //charge les voix disponibles dans le navigateur
  useEffect(() => {
    function loadVoices() {
      window.speechSynthesis.getVoices();
    }

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);


  //détecter la langue

  function detectLangPart(text) {
    const lower = text.toLowerCase(); //miniscule

    // Arabe / Derja en écriture arabe
    if (/[\u0600-\u06FF]/.test(text)) {
      return "ar";
    }

    // français 
    const frenchWords = [
      "bonjour",
      "merci",
      "français",
      "explique",
      "je ",
      "tu ",
      "vous ",
      "nous ",
      "ça",
      "c'est",
      "est-ce",
      "avec",
      "pour",
      "pourquoi",
      "comment",
    ];



    // word = chaque mot de la liste testé un par un
    // lower=le mots après le miniscule
    if (frenchWords.some((word) => lower.includes(word))) {
      return "fr";
    }

    // Par défaut allemand
    return "de";
  }

  function getVoiceByLang(lang) {

              //navigateur.liretexte
    const allVoices = window.speechSynthesis.getVoices();

    if (lang === "ar") {
      return (
        allVoices.find((v) => v.lang === "ar-SA") ||
        allVoices.find((v) => v.lang === "ar") ||
        allVoices.find((v) => v.lang.startsWith("Arabic")) //commence par
      );
    }

    if (lang === "fr") {
      return (
        allVoices.find((v) => v.lang === "fr-FR") ||
        allVoices.find((v) => v.lang.startsWith("fr"))
      );
    }

    return (
      allVoices.find((v) => v.lang === "de-DE") ||
      allVoices.find((v) => v.lang.startsWith("de"))
    );
  }

  //function splitTextByLanguage(text) {
    // Sépare le texte par ligne ou par ponctuation
    //const parts = text
     // .split(/(?<=[.!؟?])\s+|\n+/)
      //.map((part) => part.trim())
      //.filter((part) => part.length > 0);

    //return parts.map((part) => ({
      //text: part,
      //lang: detectLangPart(part),
    //}));
  //}


  function splitTextByLanguage(text) {

  // On remplace les signes de ponctuation par un retour à la ligne
  text = text.replaceAll(".", ".\n");
  text = text.replaceAll("!", "!\n");
  text = text.replaceAll("?", "?\n");
  text = text.replaceAll("؟", "؟\n");

  // On coupe le texte ligne par ligne
  const lines = text.split("\n");

  // On prépare une liste vide
  const parts = [];

  // On parcourt chaque ligne
  //line = "Hallo!"
  //line = "Bonjour"
 //line = "مرحب"
  for (let line of lines) {

    const cleanLine = line.trim(); // nettoyer espaces

    // On garde seulement les lignes non vides
    if (cleanLine.length > 0) {
      parts.push(cleanLine);
    }
  }

  // On retourne chaque partie avec sa langue détectée
  return parts.map((part) => ({
    text: part,
    lang: detectLangPart(part),
  }));
}

  //lire le texte
  function speakText(text) { //speakText("Hallo, wie geht es dir?")

    window.speechSynthesis.cancel(); // Stopper toute lecture précédente

    const parts = splitTextByLanguage(text); //fonction { text: "Hallo!", lang: "de" }
      // splitTextByLanguage() --> detectLangPart()
    
    let index = 0;

    function speakNext() {

      if (index >= parts.length) return; // parts.length = 3 /0 1 2 f 3 return

      // Prendre la phrase actuelle
      const part = parts[index];

      // Préparer la phrase pour la lecture audio
      const utterance = new SpeechSynthesisUtterance(part.text);

      const voice = getVoiceByLang(part.lang);

      if (part.lang === "ar") {
        utterance.lang = voice ? voice.lang : "ar-SA";
      } else if (part.lang === "fr") {
        utterance.lang = voice ? voice.lang : "fr-FR";
      } else {
        utterance.lang = voice ? voice.lang : "de-DE";
      }


      // Utiliser la voix trouvée si elle existe
      if (voice) {
        utterance.voice = voice;
      }

      utterance.rate = 0.9; //vitesse
      utterance.pitch = 1;


      // Quand la phrase actuelle est terminée passe
      utterance.onend = () => {
        index++;
        speakNext();
      };

      // Lancer la lecture de la phrase actuelle
      window.speechSynthesis.speak(utterance);
    }

    //commencer
    speakNext();
  }

  //utilisateur clique sur micro
  //le navigateur ouvre le micro
  //utilisateur parle
  //le navigateur transforme la voix en texte
  //le texte apparaît dans l'input

  //démarrer a reconnaissance vocale
  function startVoiceRecognition() {

  // on récupère l'outil du navigateur pour utiliser le micro
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  // Si le navigateur ne supporte pas la reconnaissance vocale
  if (!SpeechRecognition) {
    alert("Le micro n'est pas supporté sur ce navigateur.");
    return;
  }

  // On crée le micro
  const recognition = new SpeechRecognition();

  // On choisit la langue du micro
  recognition.lang = voiceLang;

  // Le micro commence à écouter
  setListening(true);

  // Quand le navigateur comprend la phrase
  recognition.onresult = function (event) {
    // On récupère la première phrase reconnue par le navigateur
    const text = event.results[0][0].transcript; //text = "Ich heiße Eya"

    // On met la phrase dans le champ de texte
    setInput(text);
  };

  // Si le micro s'arrête
  recognition.onend = function () {
    setListening(false);
  };

  // Si une erreur arrive
  recognition.onerror = function () {
    setListening(false);
  };

  // On démarre le micro
  recognition.start();
}

  useEffect(() => {
    const interval = setInterval(() => { //répéter une action plusieurs fois

      fetch("http://127.0.0.1:8000/update-time", { //route

        method: "POST", //envoyer les donnés au backend 
        headers: {
          "Content-Type": "application/json", //envoyées au format JSON
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
        { role: "bot", text: "Guten Tag! Was möchten Sie bestellen?" },
      ]);
    }

    if (scenario === "restaurant") {
      setMessages([
        { role: "bot", text: "Guten Abend! Haben Sie reserviert?" },
      ]);
    }

    if (scenario === "supermarche") {
      setMessages([
        { role: "bot", text: "Hallo! Kann ich Ihnen helfen?" },
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          mode: modeFinal,
          email: localStorage.getItem("email"),
          explanation_language: explanationLanguage,
        }),
        signal: controller.signal,
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

      if (!data) {
        throw new Error("Le backend a retourné une réponse vide.");
      }

      const botReply = data.response || "(Réponse vide)";

      setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
      speakText(botReply);
    } catch (err) {
      const msg =
        err?.name === "AbortError"
          ? "Timeout: le serveur a mis trop de temps à répondre."
          : err?.message || JSON.stringify(err);

      console.log("Erreur fetch:", err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: `⚠️ Erreur: ${msg}` },
      ]);
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

        <div className="fixed top-6 right-3 sm:top-8 sm:right-8 z-50 flex items-center gap-2 sm:gap-3">
  <div className="relative">
    <button
      type="button"
      onClick={() => setShowExplanationMenu(!showExplanationMenu)}
      className="h-10 sm:h-11 min-w-[95px] sm:min-w-[120px] rounded-full border border-[#FFC107] bg-[#171717] px-5 text-sm font-medium text-[#FFC107] flex items-center justify-between gap-3 hover:bg-[#FFC107] hover:text-black transition"
    >
      <span>
        {explanationLanguage === "auto"
          ? "Auto"
          : explanationLanguage === "derja"
          ? "Derja"
          : "Français"}
      </span>
      <span>⌄</span>
    </button>

    {showExplanationMenu && (
      <div className="absolute right-0 mt-2 w-[120px] rounded-2xl border border-[#FFC107] bg-[#171717] p-2 shadow-lg">
        <button
          type="button"
          onClick={() => {
            setExplanationLanguage("auto");
            setShowExplanationMenu(false);
          }}
          className={`w-full px-4 py-2 rounded-xl text-left text-sm transition ${
            explanationLanguage === "auto"
              ? "bg-[#FFC107] text-black"
              : "text-[#FFC107] hover:bg-[#FFC107] hover:text-black"
          }`}
        >
          Auto
        </button>

        <button
          type="button"
          onClick={() => {
            setExplanationLanguage("derja");
            setShowExplanationMenu(false);
          }}
          className={`w-full px-4 py-2 rounded-xl text-left text-sm transition ${
            explanationLanguage === "derja"
              ? "bg-[#FFC107] text-black"
              : "text-[#FFC107] hover:bg-[#FFC107] hover:text-black"
          }`}
        >
          Derja
        </button>

        <button
          type="button"
          onClick={() => {
            setExplanationLanguage("fr");
            setShowExplanationMenu(false);
          }}
          className={`w-full px-4 py-2 rounded-xl text-left text-sm transition ${
            explanationLanguage === "fr"
              ? "bg-[#FFC107] text-black"
              : "text-[#FFC107] hover:bg-[#FFC107] hover:text-black"
          }`}
        >
          Français
        </button>
      </div>
    )}
  </div>

  <button
    onClick={() => navigate("/ness")}
    className="
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
</div>



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
        <div className="max-w-4xl w-full mx-auto flex items-center gap-1.5 sm:gap-4">
          <div className="relative">
  <button
    type="button"
    onClick={() => setShowVoiceMenu(!showVoiceMenu)}
    className="h-10 sm:h-12 min-w-[62px] sm:min-w-[80px] rounded-2xl border border-[#3A2600] bg-[#0F0F0F] px-4 text-sm text-[#FFC107] outline-none flex items-center justify-between gap-3 hover:bg-[#1F1F1F] transition"
  >
    <span>
      {voiceLang === "de-DE" ? "DE" : voiceLang === "fr-FR" ? "FR" : "AR"}
    </span>
    <span>⌄</span>
  </button>

  {showVoiceMenu && (
    <div className="absolute bottom-14 left-0 z-50 w-[80px] rounded-2xl border border-[#3A2600] bg-[#171717] p-2 shadow-lg">
      <button
        type="button"
        onClick={() => {
          setVoiceLang("de-DE");
          setShowVoiceMenu(false);
        }}
        className={`w-full px-3 py-2 rounded-xl text-left text-sm transition ${
          voiceLang === "de-DE"
            ? "bg-[#FFC107] text-black"
            : "text-[#FFC107] hover:bg-[#FFC107] hover:text-black"
        }`}
      >
        DE
      </button>

      <button
        type="button"
        onClick={() => {
          setVoiceLang("fr-FR");
          setShowVoiceMenu(false);
        }}
        className={`w-full px-3 py-2 rounded-xl text-left text-sm transition ${
          voiceLang === "fr-FR"
            ? "bg-[#FFC107] text-black"
            : "text-[#FFC107] hover:bg-[#FFC107] hover:text-black"
        }`}
      >
        FR
      </button>

      <button
        type="button"
        onClick={() => {
          setVoiceLang("ar-TN");
          setShowVoiceMenu(false);
        }}
        className={`w-full px-3 py-2 rounded-xl text-left text-sm transition ${
          voiceLang === "ar-TN"
            ? "bg-[#FFC107] text-black"
            : "text-[#FFC107] hover:bg-[#FFC107] hover:text-black"
        }`}
      >
        AR
      </button>
    </div>
  )}
</div>

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