export default function Footer() {
  return (
    <footer className="bg-[#1F1F1F] text-white border-t border-[#333333]">

      {/* Partie principale du footer */}
      <div className="max-w-6xl mx-auto px-6 py-14">

        {/* Sur téléphone : les blocs sont l'un sous l'autre.
            Sur ordinateur : ils sont sur la même ligne. */}
        <div className="flex flex-col md:flex-row md:justify-between gap-10">

          {/* Logo et petite description */}
          <div>
            <h2 className="text-3xl font-bold">
              <span className="text-[#FFC107]">Eya</span>
              <span className="text-white">Lernen</span>
            </h2>

            <p className="text-gray-400 mt-3 max-w-sm leading-6">
              Apprends l’allemand avec confiance. Pratique,
              progresse, parle.
            </p>
          </div>

          {/* Les deux listes à droite */}
          <div className="flex flex-wrap gap-16">

            {/* Partie plateforme */}
            <div>
              <h3 className="font-bold text-lg mb-4">
                Plateforme
              </h3>

              {/* Ce sont seulement des textes.
                  Ils ne changent pas de page quand on clique dessus. */}
              <div className="flex flex-col gap-3 text-gray-400">
                <span>
                  Cours
                </span>

                <span>
                  Chatbot
                </span>

                <span>
                  Abonnements
                </span>
              </div>
            </div>

            {/* Partie support */}
            <div>
              <h3 className="font-bold text-lg mb-4">
                Support
              </h3>

              {/* Ce sont aussi seulement des textes. */}
              <div className="flex flex-col gap-3 text-gray-400">
                <span>
                  Contact
                </span>

                <span>
                  FAQ
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Ligne horizontale */}
        <div className="border-t border-[#333333] mt-14 pt-8">

          {/* Copyright */}
          <p className="text-center text-sm text-gray-500">
            © 2026 EyaLernen. Tous droits réservés.
          </p>

        </div>
      </div>

      {/* Les trois lignes décoratives en bas */}
      <div>
        <div className="h-[5px] bg-black"></div>
        <div className="h-[5px] bg-red-600"></div>
        <div className="h-[5px] bg-[#FFC107]"></div>
      </div>

    </footer>
  );
}