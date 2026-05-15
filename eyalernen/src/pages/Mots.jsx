import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReplayIcon from "@mui/icons-material/Replay";

export default function Mots() {
  const navigate = useNavigate();

  const location = useLocation();
  const themeChoisi = location.state?.theme || "maison";

  const allData = {
    maison: [
      {
        mot: "das Schlafzimmer",
        phrase: "Mein Schlafzimmer ist hell.",
        traductionFr: "Ma chambre est lumineuse.",
        traductionDerja: "l bit thawya.",
        image: "/images/schlafzimmer.png"
      },
      {
        mot: "der Tisch",
        phrase: "Der Tisch ist groß.",
        traductionFr: "La table est grande.",
        traductionDerja: "l tawla kbira.",
        image: "/images/tisch.png"
      },
      {
        mot: "die Küche",
        phrase: "Die Küche ist sauber.",
        traductionFr: "La cuisine est propre.",
        traductionDerja: "el koujina ndhifa.",
        image: "/images/kuche.png"
      },
      {
        mot: "das Wohnzimmer",
        phrase: "Das Wohnzimmer ist groß.",
        traductionFr: "Le salon est grand.",
        traductionDerja: "el salon kbir.",
        image: "/images/wohnzimmer.png"
      },
      {
        mot: "das Badezimmer",
        phrase: "Das Badezimmer ist klein.",
        traductionFr: "La salle de bain est petite.",
        traductionDerja: "bit el douche sghira.",
        image: "/images/badezimmer.png"
      },
      {
        mot: "das Bett",
        phrase: "Das Bett ist bequem.",
        traductionFr: "Le lit est confortable.",
        traductionDerja: "el farsh mraye7.",
        image: "/images/bett.png"
      },
      {
        mot: "die Lampe",
        phrase: "Die Lampe ist schön.",
        traductionFr: "La lampe est belle.",
        traductionDerja: "el lampe behya.",
        image: "/images/lampe.png"
      },
      {
        mot: "der Stuhl",
        phrase: "Der Stuhl ist neu.",
        traductionFr: "La chaise est nouvelle.",
        traductionDerja: "el kursi jdid.",
        image: "/images/stuhl.png"
      }
    ],

    restaurant: [
      {
        mot: "die Speisekarte",
        phrase: "Ich möchte die Speisekarte bitte.",
        traductionFr: "Je voudrais le menu, s’il vous plaît.",
        traductionDerja: "n7eb el menu 3aychek.",
        image: "/images/speisekarte.png"
      },
      {
        mot: "das Wasser",
        phrase: "Ich möchte Wasser trinken.",
        traductionFr: "Je veux boire de l’eau.",
        traductionDerja: "n7eb nechreb mé.",
        image: "/images/wasser.png"
      },
      {
        mot: "der Kellner",
        phrase: "Der Kellner ist freundlich.",
        traductionFr: "Le serveur est gentil.",
        traductionDerja: "el serveur behi.",
        image: "/images/kellner.png"
      },
      {
        mot: "das Essen",
        phrase: "Das Essen ist lecker.",
        traductionFr: "Le repas est délicieux.",
        traductionDerja: "el makla bnina.",
        image: "/images/essen.png"
      },
      {
        mot: "die Rechnung",
        phrase: "Ich möchte die Rechnung bitte.",
        traductionFr: "Je voudrais l’addition, s’il vous plaît.",
        traductionDerja: "n7eb el facture 3aychek.",
        image: "/images/rechnung.png"
      },
      {
        mot: "der Tisch",
        phrase: "Wir haben einen Tisch reserviert.",
        traductionFr: "Nous avons réservé une table.",
        traductionDerja: "7jazna tawla.",
        image: "/images/tisch.png"
      },
      {
        mot: "das Menü",
        phrase: "Das Menü ist gut.",
        traductionFr: "Le menu est bon.",
        traductionDerja: "el menu behi.",
        image: "/images/menu.png"
      },
      {
        mot: "die Suppe",
        phrase: "Die Suppe ist heiß.",
        traductionFr: "La soupe est chaude.",
        traductionDerja: "el chorba s5ouna.",
        image: "/images/suppe.png"
      }
    ],

    cafe: [
      {
        mot: "der Kaffee",
        phrase: "Ich trinke Kaffee.",
        traductionFr: "Je bois du café.",
        traductionDerja: "nchrob 9ahwa.",
        image: "/images/Kaffee.png"
      },
      {
        mot: "der Kuchen",
        phrase: "Der Kuchen ist lecker.",
        traductionFr: "Le gâteau est délicieux.",
        traductionDerja: "el gâteau bninn.",
        image: "/images/kuchen.png"
      },
      {
        mot: "der Tee",
        phrase: "Ich möchte einen Tee.",
        traductionFr: "Je voudrais un thé.",
        traductionDerja: "n7eb thé.",
        image: "/images/tee.png"
      },
      {
        mot: "die Milch",
        phrase: "Ich möchte Kaffee mit Milch.",
        traductionFr: "Je voudrais un café avec du lait.",
        traductionDerja: "n7eb 9ahwa b 7lib.",
        image: "/images/milch.png"
      },
      {
        mot: "der Zucker",
        phrase: "Ich brauche Zucker.",
        traductionFr: "J’ai besoin de sucre.",
        traductionDerja: "n7eb sokker.",
        image: "/images/zucker.png"
      },
      {
        mot: "das Glas",
        phrase: "Das Glas ist leer.",
        traductionFr: "Le verre est vide.",
        traductionDerja: "el kes feragh.",
        image: "/images/glass.png"
      },
      {
        mot: "die Tasse",
        phrase: "Die Tasse ist klein.",
        traductionFr: "La tasse est petite.",
        traductionDerja: "el tasse sghira.",
        image: "/images/tasse.png"
      },
      {
        mot: "die Bestellung",
        phrase: "Meine Bestellung ist fertig.",
        traductionFr: "Ma commande est prête.",
        traductionDerja: "commande mte3i 7adhra.",
        image: "/images/bestellung.png"
      }
    ],

    supermarche: [
      {
        mot: "der Apfel",
        phrase: "Ich kaufe einen Apfel.",
        traductionFr: "J’achète une pomme.",
        traductionDerja: "nechri teffa7a.",
        image: "/images/apfel.png"
      },
      {
        mot: "die Milch",
        phrase: "Die Milch ist im Supermarkt.",
        traductionFr: "Le lait est au supermarché.",
        traductionDerja: "el 7lib fel supermarché.",
        image: "/images/milch.png"
      },
      {
        mot: "das Brot",
        phrase: "Ich brauche Brot.",
        traductionFr: "J’ai besoin de pain.",
        traductionDerja: "n7eb 5obz.",
        image: "/images/brot.png"
      },
      {
        mot: "der Käse",
        phrase: "Der Käse ist teuer.",
        traductionFr: "Le fromage est cher.",
        traductionDerja: "el fromage ghali.",
        image: "/images/kase.png"
      },
      {
        mot: "die Tomate",
        phrase: "Die Tomate ist rot.",
        traductionFr: "La tomate est rouge.",
        traductionDerja: "el tomate 7amra.",
        image: "/images/tomate.png"
      },
      {
        mot: "der Preis",
        phrase: "Der Preis ist günstig.",
        traductionFr: "Le prix est pas cher.",
        traductionDerja: "el soum rkhis.",
        image: "/images/preis.png"
      },
      {
        mot: "die Kasse",
        phrase: "Ich gehe zur Kasse.",
        traductionFr: "Je vais à la caisse.",
        traductionDerja: "nemchi lel caisse.",
        image: "/images/kasse.png"
      },
      {
        mot: "die Tasche",
        phrase: "Ich brauche eine Tasche.",
        traductionFr: "J’ai besoin d’un sac.",
        traductionDerja: "n7eb sachet.",
        image: "/images/tasche.png"
      }
    ],

    voyage: [
      {
        mot: "der Flughafen",
        phrase: "Ich bin am Flughafen.",
        traductionFr: "Je suis à l’aéroport.",
        traductionDerja: "ena fel matar.",
        image: "/images/flughafen.png"
      },
      {
        mot: "das Ticket",
        phrase: "Ich habe ein Ticket.",
        traductionFr: "J’ai un billet.",
        traductionDerja: "3andi ticket.",
        image: "/images/ticket.png"
      },
      {
        mot: "der Zug",
        phrase: "Der Zug kommt spät.",
        traductionFr: "Le train arrive en retard.",
        traductionDerja: "el train bech yet2akher.",
        image: "/images/zug.png"
      },
      {
        mot: "das Hotel",
        phrase: "Das Hotel ist schön.",
        traductionFr: "L’hôtel est beau.",
        traductionDerja: "el hôtel behi.",
        image: "/images/hotel.png"
      },
      {
        mot: "der Pass",
        phrase: "Ich habe meinen Pass.",
        traductionFr: "J’ai mon passeport.",
        traductionDerja: "3andi passeport mte3i.",
        image: "/images/pass.png"
      },
      {
        mot: "die Reise",
        phrase: "Die Reise ist lang.",
        traductionFr: "Le voyage est long.",
        traductionDerja: "el voyage twil.",
        image: "/images/reise.png"
      }
    ],

    ecole: [
      {
        mot: "das Buch",
        phrase: "Das Buch ist interessant.",
        traductionFr: "Le livre est intéressant.",
        traductionDerja: "el kteb behi.",
        image: "/images/buch.png"
      },
      {
        mot: "der Lehrer",
        phrase: "Der Lehrer erklärt gut.",
        traductionFr: "Le professeur explique bien.",
        traductionDerja: "el prof yfassar behi.",
        image: "/images/lehrer.png"
      },
      {
        mot: "die Schule",
        phrase: "Die Schule ist groß.",
        traductionFr: "L’école est grande.",
        traductionDerja: "el école kbira.",
        image: "/images/schule.png"
      },
      {
        mot: "der Stift",
        phrase: "Ich brauche einen Stift.",
        traductionFr: "J’ai besoin d’un stylo.",
        traductionDerja: "n7eb stylo.",
        image: "/images/stift.png"
      },
      {
        mot: "die Prüfung",
        phrase: "Die Prüfung ist morgen.",
        traductionFr: "L’examen est demain.",
        traductionDerja: "el examen ghodwa.",
        image: "/images/prufung.png"
      },
      {
        mot: "die Aufgabe",
        phrase: "Die Aufgabe ist einfach.",
        traductionFr: "L’exercice est facile.",
        traductionDerja: "el exercice sehel.",
        image: "/images/aufgabe.png"
      }
    ],

    sante: [
      {
        mot: "der Arzt",
        phrase: "Ich gehe zum Arzt.",
        traductionFr: "Je vais chez le médecin.",
        traductionDerja: "nemchi lel tbib.",
        image: "/images/arzt.png"
      },
      {
        mot: "die Apotheke",
        phrase: "Die Apotheke ist nah.",
        traductionFr: "La pharmacie est proche.",
        traductionDerja: "el pharmacie 9riba.",
        image: "/images/apotheke.png"
      },
      {
        mot: "der Kopf",
        phrase: "Mein Kopf tut weh.",
        traductionFr: "J’ai mal à la tête.",
        traductionDerja: "rassi youja3.",
        image: "/images/kopft.png"
      },
      {
        mot: "der Bauch",
        phrase: "Mein Bauch tut weh.",
        traductionFr: "J’ai mal au ventre.",
        traductionDerja: "kerchi touja3.",
        image: "/images/bauch.png"
      },
      {
        mot: "das Medikament",
        phrase: "Ich brauche ein Medikament.",
        traductionFr: "J’ai besoin d’un médicament.",
        traductionDerja: "n7eb dwa.",
        image: "/images/medikament.png"
      },
      {
        mot: "die Temperatur",
        phrase: "Ich habe Temperatur.",
        traductionFr: "J’ai de la fièvre.",
        traductionDerja: "3andi s5ana.",
        image: "/images/temperatur.png"
      }
    ],

    vetements: [
      {
        mot: "das Hemd",
        phrase: "Das Hemd ist blau.",
        traductionFr: "La chemise est bleue.",
        traductionDerja: "el chemise zar9a.",
        image: "/images/hemd.png"
      },
      {
        mot: "die Hose",
        phrase: "Die Hose ist schwarz.",
        traductionFr: "Le pantalon est noir.",
        traductionDerja: "el pantalon ak7el.",
        image: "/images/hose.png"
      },
      {
        mot: "das Kleid",
        phrase: "Das Kleid ist schön.",
        traductionFr: "La robe est belle.",
        traductionDerja: "el robe behya.",
        image: "/images/kleid.png"
      },
      {
        mot: "die Schuhe",
        phrase: "Die Schuhe sind neu.",
        traductionFr: "Les chaussures sont nouvelles.",
        traductionDerja: "el sbabet jded.",
        image: "/images/schuhe.png"
      },
      {
        mot: "die Jacke",
        phrase: "Die Jacke ist warm.",
        traductionFr: "La veste est chaude.",
        traductionDerja: "el veste s5ouna.",
        image: "/images/jacke.png"
      },
      {
        mot: "der Rock",
        phrase: "Der Rock ist kurz.",
        traductionFr: "La jupe est courte.",
        traductionDerja: "el jupe 9sira.",
        image: "/images/rock.png"
      }
    ]
  };

  const data = allData[themeChoisi] || allData.maison;

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#171717] pb-32 relative">

      <div className="absolute top-0 left-0 w-full">
        <div className="h-[5px] bg-black"></div>
        <div className="h-[5px] bg-red-600"></div>
        <div className="h-[5px] bg-[#FFC107]"></div>
      </div>

      <button
        onClick={() => navigate("/ChoixThemeMots")}
        className="absolute top-8 right-8 w-11 h-11 rounded-full border border-[#FFC107] bg-[#0F0F0F] text-[#FFC107] flex items-center justify-center hover:bg-[#FFC107] hover:text-black transition"
      >
        ×
      </button>

      {step === "mot" && (
        <div className="bg-[#0F0F0F] border border-[#3A2600] p-6 rounded-3xl text-center shadow w-[90%] sm:w-[350px]">

          <img
            src={data[index].image}
            className="w-full h-48 object-contain rounded-xl mb-4 bg-[#171717]"
            alt={data[index].mot}
          />

          <h2 className="text-2xl font-bold text-[#FFC107]">
            {data[index].mot}
          </h2>

          <button
            onClick={() => speak(data[index].mot)}
            className="mt-4 bg-[#FFC107] text-black p-3 rounded-full hover:bg-[#E0A800] transition"
          >
            🔊
          </button>

          <p className="mt-3 text-gray-400">
            {data[index].traductionFr}
          </p>

          <button
            onClick={() => setStep("phrase")}
            className="mt-6 w-full bg-[#FFC107] text-black py-3 rounded-xl font-bold hover:bg-[#E0A800] transition"
          >
            Continue
          </button>

        </div>
      )}

      {step === "phrase" && (
        <div className="bg-[#0F0F0F] border border-[#3A2600] p-4 sm:p-6 md:p-8 rounded-3xl w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] max-w-3xl mx-auto">

          <p className="text-gray-400 mb-2">Lis à voix haute:</p>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-6">
            {data[index].phrase}
          </h2>

          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className="mb-4 text-[#FFC107] underline"
          >
            {showTranslation ? "🙈" : "👀"}
          </button>

          {showTranslation && (
            <div className="bg-[#171717] border border-[#3A2600] rounded-2xl p-4 mb-6 shadow-sm">

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-[#FFC107]">FR</span>
                <p className="text-gray-300">
                  {data[index].traductionFr}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-red-500">TN</span>
                <p className="text-gray-300">
                  {data[index].traductionDerja}
                </p>
              </div>

            </div>
          )}

          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => speak(data[index].phrase)}
              className="flex items-center gap-2 bg-[#171717] border border-[#3A2600] px-4 py-2 rounded-full text-gray-300 hover:bg-[#1F1F1F] transition"
            >
              <span className="w-6 h-6 flex items-center justify-center bg-[#FFC107] text-black rounded-full shadow">
                <ReplayIcon />
              </span>

              <span>Répéter</span>
            </button>
          </div>

          {userText && (
            <p className="mt-3 text-gray-300">
              🗣️ {userText}
            </p>
          )}

          {feedback && (
            <p className="mt-2 text-lg font-semibold text-[#FFC107]">
              {feedback}
            </p>
          )}

        </div>
      )}

      {step === "phrase" && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center">

          <button
            onClick={startListening}
            className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center"
          >
            <span className="absolute w-20 h-20 sm:w-24 sm:h-24 bg-[#FFC107] rounded-full opacity-30"></span>

            <span className="w-16 h-16 bg-[#FFC107] text-black rounded-full flex items-center justify-center shadow-lg z-10">
              🎤
            </span>
          </button>

          <p
            onClick={next}
            className="mt-2 text-gray-400 cursor-pointer hover:text-[#FFC107]"
          >
            Passer
          </p>
        </div>
      )}

    </div>
  );
}