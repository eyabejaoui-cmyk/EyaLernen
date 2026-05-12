import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReplayIcon from '@mui/icons-material/Replay';


export default function Mots() {

  const data = [
    {
      mot: "das Schlafzimmer",
      phrase: "Mein Schlafzimmer ist hell.",
      traductionFr: "Ma chambre est lumineuse.",
      traductionDerja: "l bit thawya."
    },
    {
      mot: "der Tisch",
      phrase: "Der Tisch ist groß.",
      traductionFr: "La table est grande.",
      traductionDerja: "l tawla kbira."
    }
    ,
{
  mot: "die Küche",
  phrase: "Die Küche ist sauber.",
  traductionFr: "La cuisine est propre.",
  traductionDerja: "El koujina ndhifa."
},
{
  mot: "das Wohnzimmer",
  phrase: "Das Wohnzimmer ist groß.",
  traductionFr: "Le salon est grand.",
  traductionDerja: "El salon kbir."
},
{
  mot: "das Badezimmer",
  phrase: "Das Badezimmer ist klein.",
  traductionFr: "La salle de bain est petite.",
  traductionDerja: "Bit el douche sghira."
},
{
  mot: "das Bett",
  phrase: "Das Bett ist bequem.",
  traductionFr: "Le lit est confortable.",
  traductionDerja: "El farsh mraye7."
},
{
  mot: "die Lampe",
  phrase: "Die Lampe ist schön.",
  traductionFr: "La lampe est belle.",
  traductionDerja: "El lampe behya."
}
  ];

  const next = () => {
    setIndex((prev) => {
      if (prev < data.length - 1) {
        return prev + 1;
      } else {
        return 0;
      }
    });

    setStep("mot");
    setUserText("");
    setFeedback("");
  };
  
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [step, setStep] = useState("mot");

  const [showTranslation, setShowTranslation] = useState(false);
  
  const [userText, setUserText] = useState("");
  const [feedback, setFeedback] = useState("");

  const speak = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "de-DE";
    window.speechSynthesis.speak(msg);
  };

  
  useEffect(() => {
    if (step === "mot") {
      window.speechSynthesis.cancel();
      speak(data[index].mot);
    }
  }, [index, step]);

  
  useEffect(() => {
    setShowTranslation(false);
  }, [index]);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("❌ Browsere");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "de-DE";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.start();

    recognition.onstart = () => {
      console.log("🎤 Micro started...");
    };

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      console.log("You said:", text);

      setUserText(text);

      const correct = data[index].phrase.toLowerCase().trim();
      const user = text.toLowerCase().trim();

      if (correct.includes(user)) {
        setFeedback("✅ Correct !");
      } else {
        setFeedback("❌ Essaie encore");
      }
    };

    recognition.onerror = (event) => {
      console.error("Error:", event.error);
      alert("❌ Micro error: " + event.error);
    };
  };

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f6fb] pb-32">

      <button
        onClick={() => navigate("/ness")}
        className="absolute top-4 right-4 w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition"
      >
        ×
      </button>

      
      {step === "mot" && (
        <div className="bg-white p-6 rounded-3xl text-center shadow w-[90%] sm:w-[350px]">

          <img src="/images/room.png" className="w-full rounded-xl mb-4" />

          <h2 className="text-2xl font-bold text-blue-600">
            {data[index].mot}
          </h2>

          <button
            onClick={() => speak(data[index].mot)}
            className="mt-4 bg-blue-600 text-white p-3 rounded-full"
          >
            🔊
          </button>

          {/* ✅ correction ici */}
          <p className="mt-3 text-gray-500">
            {data[index].traductionFr}
          </p>

          <button
            onClick={() => setStep("phrase")}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl"
          >
            Continue
          </button>

        </div>
      )}

      
      {step === "phrase" && (
        <div className="bg-[#eef0f8] p-4 sm:p-6 md:p-8 rounded-3xl w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] max-w-3xl mx-auto">
          
          <p className="text-gray-400 mb-2">Lis à voix haute:</p>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
            {data[index].phrase}
          </h2>

          
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className="mb-4 text-blue-600 underline"
          >
            {showTranslation ? "🙈" : "👀"}
          </button>

          
          {showTranslation && (
            <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-blue-500">FR</span>
                <p className="text-gray-700">
                  {data[index].traductionFr}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-green-500">TN</span>
                <p className="text-gray-700">
                  {data[index].traductionDerja}
                </p>
              </div>

            </div>
          )}

          
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => speak(data[index].phrase)}
              className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full 
              text-gray-600 hover:bg-gray-200 transition"
            >
              <span className="w-6 h-6 flex items-center justify-center bg-white rounded-full shadow">
                <ReplayIcon />
              </span>

              <span>Répéter</span>
            </button>
          </div>

          
          {userText && (
            <p className="mt-3 text-gray-600">
              🗣️ {userText}
            </p>
          )}

          
          {feedback && (
            <p className="mt-2 text-lg font-semibold">
              {feedback}
            </p>
          )}

        </div>
      )}


      {/* MICRO EN BAS */}
      {step === "phrase" && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center">
          
          <button
            onClick={startListening}
            className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center"
          >
            <span className="absolute w-20 h-20 sm:w-24 sm:h-24 bg-blue-200 rounded-full opacity-50"></span>

            <span className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg z-10">
              🎤
            </span>
          </button>

          <p 
            onClick={next}
            className="mt-2 text-gray-400 cursor-pointer hover:text-gray-600"
          >
            Passer
          </p>
        </div>
      )}

    </div>
  );
}