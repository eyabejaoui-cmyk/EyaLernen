from pathlib import Path
import csv

rows = []

def add(g, f, d):
    rows.append((g.strip(), f.strip(), d.strip()))

# Base categories
pronouns = [
    ("ich", "je", "أنا"),
    ("du", "tu", "إنت"),
    ("er", "il", "هو"),
    ("sie", "elle", "هي"),
    ("wir", "nous", "إحنا"),
    ("ihr", "vous", "إنتوما"),
    ("Sie", "vous (formel)", "حضرتك"),
]

basic_verbs = [
    ("sein", "être", "يكون"),
    ("haben", "avoir", "عندو"),
    ("gehen", "aller", "يمشي"),
    ("kommen", "venir", "يجي"),
    ("machen", "faire", "يعمل"),
    ("lernen", "apprendre", "يتعلم"),
    ("sprechen", "parler", "يحكي"),
    ("verstehen", "comprendre", "يفهم"),
    ("fragen", "demander", "يسأل"),
    ("antworten", "répondre", "يجاوب"),
    ("essen", "manger", "ياكل"),
    ("trinken", "boire", "يشرب"),
    ("kaufen", "acheter", "يشري"),
    ("bezahlen", "payer", "يخلص"),
    ("suchen", "chercher", "يلوج"),
    ("finden", "trouver", "يلقى"),
    ("arbeiten", "travailler", "يخدم"),
    ("studieren", "étudier", "يقرا"),
    ("schreiben", "écrire", "يكتب"),
    ("lesen", "lire", "يقرا"),
    ("hören", "écouter", "يسمع"),
    ("sehen", "voir", "يشوف"),
    ("warten", "attendre", "يستنى"),
    ("brauchen", "avoir besoin", "يستحق"),
    ("wollen", "vouloir", "يحب"),
    ("können", "pouvoir", "ينجم"),
    ("müssen", "devoir", "لازم"),
    ("dürfen", "avoir le droit", "ينجم/مسموحلو"),
    ("sagen", "dire", "يقول"),
    ("erklären", "expliquer", "يفسر"),
]
for r in pronouns + basic_verbs:
    add(*r)

# Useful phrases
phrases = [
    ("Ich bin Anfänger", "Je suis débutant", "أنا مبتدئ"),
    ("Ich lerne Deutsch", "J’apprends l’allemand", "نتعلم في الألماني"),
    ("Ich möchte üben", "Je veux pratiquer", "نحب نتمرن"),
    ("Ich möchte sprechen", "Je veux parler", "نحب نحكي"),
    ("Ich habe Angst zu sprechen", "J’ai peur de parler", "نخاف نحكي"),
    ("Ich mache Fehler", "Je fais des erreurs", "نغلط"),
    ("Das ist normal", "C’est normal", "هذا عادي"),
    ("Sprich langsam bitte", "Parle lentement s’il te plaît", "احكي بشوية من فضلك"),
    ("Kannst du wiederholen?", "Tu peux répéter ?", "تنجم تعاود؟"),
    ("Kannst du erklären?", "Tu peux expliquer ?", "تنجم تفسر؟"),
    ("Ich verstehe nicht", "Je ne comprends pas", "ما فهمتش"),
    ("Ich habe verstanden", "J’ai compris", "فهمت"),
    ("Was bedeutet das?", "Ça veut dire quoi ?", "شنوة معناها؟"),
    ("Wie sagt man das?", "Comment on dit ça ?", "كيفاش نقولو هذا؟"),
    ("Was soll ich sagen?", "Qu’est-ce que je dois dire ?", "شنوة نقول؟"),
    ("Ich brauche Hilfe", "J’ai besoin d’aide", "نستحق معاونة"),
    ("Hilf mir bitte", "Aide-moi s’il te plaît", "عاونّي من فضلك"),
    ("Noch einmal bitte", "Encore une fois s’il te plaît", "مرة أخرى من فضلك"),
    ("Keine Sorge", "Ne t’inquiète pas", "ما تقلقش"),
    ("Mach weiter", "Continue", "كمل"),
    ("Sehr gut", "Très bien", "باهي برشا"),
    ("Gut gemacht", "Bien joué", "يعطيك الصحة"),
    ("Fangen wir an", "Commençons", "نبدأو"),
    ("Ich bin bereit", "Je suis prêt", "أنا حاضر"),
    ("Bist du bereit?", "Tu es prêt ?", "إنت حاضر؟"),
    ("Ich brauche eine Pause", "J’ai besoin d’une pause", "نستحق بريك"),
    ("Bis bald", "À bientôt", "نشوفك قريب"),
    ("Bis später", "À plus tard", "نشوفك بعد"),
    ("Bis morgen", "À demain", "إلى غدوة"),
]
for r in phrases:
    add(*r)

nouns = [
    ("das Haus","la maison","الدار"),("die Wohnung","l’appartement","الشقة"),("das Zimmer","la chambre","البيت"),("die Küche","la cuisine","الكوجينة"),
    ("das Bad","la salle de bain","بيت الحمام"),("die Tür","la porte","الباب"),("das Fenster","la fenêtre","الشباك"),("der Tisch","la table","الطاولة"),
    ("der Stuhl","la chaise","الكرسي"),("das Bett","le lit","الفراش"),("die Schule","l’école","المكتب"),("die Universität","l’université","الجامعة"),
    ("die Arbeit","le travail","الخدمة"),("das Büro","le bureau","البيرو"),("der Computer","l’ordinateur","الكمبيوتر"),("das Handy","le téléphone","التليفون"),
    ("das Buch","le livre","الكتاب"),("der Stift","le stylo","الستيلو"),("die Tasche","le sac","السّاك"),("das Heft","le cahier","الكراس"),
    ("das Auto","la voiture","الكروسة"),("der Bus","le bus","الكار"),("der Zug","le train","الترينو"),("das Taxi","le taxi","التاكسي"),
    ("der Bahnhof","la gare","المحطة"),("der Flughafen","l’aéroport","المطار"),("die Straße","la rue","الشارع"),("der Weg","le chemin","الطريق"),
    ("der Markt","le marché","السوق"),("der Supermarkt","le supermarché","السوبرماركت"),("das Geschäft","le magasin","الحانوت"),("die Apotheke","la pharmacie","الفارماسية"),
    ("das Krankenhaus","l’hôpital","السبيطار"),("der Arzt","le médecin","الطبيب"),("die Ärztin","la médecin","الطبيبة"),("die Medizin","le médicament","الدواء"),
    ("das Wasser","l’eau","الماء"),("der Kaffee","le café","القهوة"),("der Tee","le thé","التاي"),("das Brot","le pain","الخبز"),
    ("die Milch","le lait","الحليب"),("der Käse","le fromage","الجبن"),("das Ei","l’œuf","العظمة"),("das Fleisch","la viande","اللحم"),
    ("der Fisch","le poisson","الحوت"),("das Hähnchen","le poulet","الدجاج"),("der Reis","le riz","الرز"),("die Suppe","la soupe","الشربة"),
    ("der Salat","la salade","السلاطة"),("das Obst","les fruits","الغلة"),("das Gemüse","les légumes","الخضرة"),("der Apfel","la pomme","التفاحة"),
    ("die Banane","la banane","البنانة"),("die Orange","l’orange","البرتقالة"),("die Tomate","la tomate","الطماطم"),("die Kartoffel","la pomme de terre","البطاطا"),
    ("die Zwiebel","l’oignon","البصلة"),("der Zucker","le sucre","السكر"),("das Salz","le sel","الملح"),("das Geld","l’argent","الفلوس"),
    ("die Karte","la carte","الكارت"),("die Rechnung","l’addition","الفاتورة"),("der Preis","le prix","السوم"),("das Ticket","le ticket","التذكرة"),
    ("der Termin","le rendez-vous","الموعد"),("die Frage","la question","السؤال"),("die Antwort","la réponse","الجواب"),("der Fehler","l’erreur","الغلط"),
]
for r in nouns:
    add(*r)

adjectives = [
    ("gut","bon","باهي"),("schlecht","mauvais","خايب"),("einfach","facile","ساهل"),("schwer","difficile","صعيب"),
    ("neu","nouveau","جديد"),("alt","ancien/vieux","قديم"),("groß","grand","كبير"),("klein","petit","صغير"),
    ("schnell","rapide","سريع"),("langsam","lent","بطيء"),("teuer","cher","غالي"),("billig","pas cher","رخيص"),
    ("warm","chaud","سخون"),("kalt","froid","بارد"),("heiß","très chaud","سخون برشا"),("müde","fatigué","تعبان"),
    ("krank","malade","مريض"),("gesund","en bonne santé","صحيح"),("glücklich","heureux","فرحان"),("traurig","triste","حزين"),
    ("hungrig","affamé","جايع"),("durstig","assoiffé","عطشان"),("bereit","prêt", "حاضر")
]

for r in adjectives:
    add(*r)

def clean(value):
    return value.replace("'", "''")

sql = "INSERT INTO derja_words (german, french, derja)\nVALUES\n"

values = []

for g, f, d in rows:
    values.append(f"('{clean(g)}', '{clean(f)}', '{clean(d)}')")

sql += ",\n".join(values) + ";"

Path("derja_words_big.sql").write_text(sql, encoding="utf-8")

print("Fichier derja_words_big.sql créé avec succès")
print("Nombre de lignes :", len(rows))