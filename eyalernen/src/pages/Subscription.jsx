import React, { useState } from "react";

export default function Subscription() {
  const emailFromLogin = localStorage.getItem("email") || "";

  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const [paymentEmail, setPaymentEmail] = useState(
    emailFromLogin === "undefined" ? "" : emailFromLogin
  );

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardCode, setCardCode] = useState("");

  const [message, setMessage] = useState("");
  const [confirmationData, setConfirmationData] = useState(null);

  const plans = [
    {
      name: "Gratuit",
      plan: "gratuit",
      price: "0 DT",
      description: "Découvrez la plateforme avec un accès limité.",
      features: [
        "Cours de base A1",
        "Chatbot limité",
        "1 scénario de jeu de rôle",
        "Progression basique",
      ],
      button: "Commencer",
      highlighted: false,
    },
    {
      name: "Premium mensuel",
      plan: "premium_mensuel",
      price: "25 DT / mois",
      description: "Accédez à toutes les fonctionnalités de la plateforme.",
      features: [
        "Tous les cours A1 et A2",
        "Chatbot illimité",
        "Chatbot vocal",
        "Tous les jeux de rôle",
        "Cours avec professeurs",
        "Badges",
        "Statistiques avancées",
        "Dépôt de devoirs",
        "Feedback",
      ],
      button: "S’abonner",
      highlighted: true,
    },
    {
      name: "Annuel",
      plan: "premium_annuel",
      price: "249 DT / an",
      description: "Payez une seule fois par an et économisez.",
      features: [
        "Tout le plan Premium",
        "Économie par rapport au paiement mensuel",
        "Accès prioritaire aux nouvelles fonctionnalités",
        "Support prioritaire",
      ],
      button: "S’abonner",
      highlighted: false,
    },
  ];

  const handleChoosePlan = (plan) => {
    setMessage("");
    setConfirmationData(null);

    if (plan === "gratuit") {
      window.location.href = "/inscription";
      return;
    } else {
      setSelectedPlan(plan);
      setPaymentEmail(emailFromLogin === "undefined" ? "" : emailFromLogin);
      setShowPaymentPopup(true);
    }
  };

  const sendSubscription = async (plan, userEmail) => {
    if (!userEmail) {
      setMessage("Veuillez saisir votre email.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          plan: plan,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowPaymentPopup(false);
        setConfirmationData(data);
        setMessage("");

        setCardName("");
        setCardNumber("");
        setCardDate("");
        setCardCode("");
      } else {
        setMessage(data.detail || "Erreur lors du paiement.");
      }
    } catch (error) {
      setMessage("Erreur serveur. Lancez le backend.");
    }
  };

  const handleConfirmPayment = () => {
    if (!paymentEmail || !cardName || !cardNumber || !cardDate || !cardCode) {
      setMessage("Veuillez remplir tous les champs.");
      return;
    }

    sendSubscription(selectedPlan, paymentEmail);
  };

  return (
    <div id="abonnements" className="min-h-screen bg-[#171717] px-6 py-20">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-white">
            Choisis ton <span className="text-[#FFC107]">abonnement</span>
          </h1>

          <p className="mt-4 text-gray-400">
            Sélectionnez l’offre qui correspond le mieux à votre apprentissage.
          </p>
        </div>

        {message && (
          <div className="mb-6 text-center bg-[#0F0F0F] border border-[#3A2600] rounded-2xl p-4 shadow-sm text-red-500 font-semibold">
            {message}
          </div>
        )}

        {confirmationData && (
          <div className="mb-8 bg-[#0F0F0F] border border-[#3A2600] rounded-3xl p-6 shadow-md text-center max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FFC107] flex items-center justify-center text-black text-3xl font-bold">
              ✓
            </div>

            <h2 className="text-2xl font-extrabold text-white mb-3">
              Paiement confirmé
            </h2>

            <p className="text-gray-400 mb-4">
              Votre abonnement a été enregistré avec succès.
            </p>

            <div className="bg-[#171717] border border-[#3A2600] rounded-2xl p-4 text-left space-y-2 text-gray-300">
              <p>
                <strong className="text-[#FFC107]">Email :</strong> {confirmationData.email}
              </p>

              <p>
                <strong className="text-[#FFC107]">Plan :</strong> {confirmationData.plan}
              </p>

              <p>
                <strong className="text-[#FFC107]">Montant :</strong> {confirmationData.amount} DT
              </p>

              <p>
                <strong className="text-[#FFC107]">Statut :</strong> {confirmationData.status}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((item) => (
            <div
              key={item.plan}
              className={`rounded-3xl p-8 shadow-sm border transition hover:shadow-lg ${
                item.highlighted
                  ? "bg-[#FFC107] text-black scale-105 border-[#FFC107]"
                  : "bg-[#222222] text-white border-[#3A3A3A]"
                }`}
            >
              <h2 className="text-2xl font-extrabold mb-2">
                {item.name}
              </h2>

              <p className="text-3xl font-extrabold mb-4">
                {item.price}
              </p>

              <p className="mb-5 text-sm">
                {item.description}
              </p>

              <ul className="space-y-3 mb-6">
                {item.features.map((feature, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <span className="font-bold">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleChoosePlan(item.plan)}
                className={`w-full py-3 rounded-2xl font-extrabold transition ${
                  item.highlighted
                    ? "bg-black text-[#FFC107] hover:bg-[#222222]"
                    : "bg-[#FFC107] text-black hover:bg-[#E0A800]"
                  }`}
              >
                {item.button}
              </button>
            </div>
          ))}
        </div>
      </div>

      {showPaymentPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-[#0F0F0F] border border-[#3A2600] w-full max-w-lg rounded-3xl p-6 shadow-xl relative">

            <button
              onClick={() => setShowPaymentPopup(false)}
              className="absolute top-4 right-4 text-[#FFC107] hover:text-white text-2xl font-bold transition"
            >
              ×
            </button>

            <h2 className="text-2xl font-extrabold text-white mb-2">
              Paiement sécurisé
            </h2>

            <p className="text-gray-400 mb-6">
              Entrez votre email et vos informations de paiement.
            </p>

            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email de l'utilisateur"
                value={paymentEmail}
                onChange={(e) => setPaymentEmail(e.target.value)}
                className="w-full p-4 bg-[#171717] text-white border border-[#3A2600] rounded-2xl outline-none focus:ring-2 focus:ring-[#FFC107] placeholder:text-gray-500"
              />

              <input
                type="text"
                placeholder="Nom sur la carte"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="w-full p-4 bg-[#171717] text-white border border-[#3A2600] rounded-2xl outline-none focus:ring-2 focus:ring-[#FFC107] placeholder:text-gray-500"
              />

              <input
                type="text"
                placeholder="Numéro de carte"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full p-4 bg-[#171717] text-white border border-[#3A2600] rounded-2xl outline-none focus:ring-2 focus:ring-[#FFC107] placeholder:text-gray-500"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="MM/AA"
                  value={cardDate}
                  onChange={(e) => setCardDate(e.target.value)}
                  className="w-full p-4 bg-[#171717] text-white border border-[#3A2600] rounded-2xl outline-none focus:ring-2 focus:ring-[#FFC107] placeholder:text-gray-500"
                />

                <input
                  type="text"
                  placeholder="CVC"
                  value={cardCode}
                  onChange={(e) => setCardCode(e.target.value)}
                  className="w-full p-4 bg-[#171717] text-white border border-[#3A2600] rounded-2xl outline-none focus:ring-2 focus:ring-[#FFC107] placeholder:text-gray-500"
                />
              </div>

              <button
                onClick={handleConfirmPayment}
                className="w-full py-4 bg-[#FFC107] text-black rounded-2xl font-extrabold hover:bg-[#E0A800] transition"
              >
                Confirmer le paiement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}