# Billets ouverts — lire, garder, rêver

## Intention et décisions retenues

Transformer le prototype en un lieu de lecture sensible, non en un média. Principe directeur : **« Les idées ne nous appartiennent pas, elles nous traversent. »**

- Interface française ; texte original intact, lisible et indexable du début à la fin.
- Démonstrateur centré sur **« Et si… le cinéma embrassait le web ? »** ; pas de faux billets ni de navigation factice.
- Abandonner les formats et leur vocabulaire : brève, grand format, relecture, variation et remix. Conserver les avis, commentaires, tangentes, contributions, dialogue et accès discrets aux matériaux liés. Garder la modération hors du menu principal.
- Sidebar persistante : nuage/vagues en univers **jour clair**, comète/arbre en univers **nuit sombre**, avec les deux GIF joints, sans les remplacer.
- Jour par défaut. Passage jour/nuit volontaire, jamais déclenché par l’heure ; interrupteur nuage/arbre dans le menu de droite. Le texte reste identique.
- Connexion simulée, aucune authentification réelle. Traces conservées dans ce navigateur après rechargement ; pas de promesse de synchronisation entre appareils.
- Rêves réellement générés et lus à voix haute, avec arrêt, limites et secours explicites.
- Préparer les ajouts éditoriaux au billet pilote dans Notion, puis demander une validation distincte avant toute écriture externe. Ne jamais réécrire ses phrases.
- Construire **lot par lot**, avec validation à chaque fin de lot ; l’approbation de ce plan lance seulement le lot 1.

## État actuel vérifié

Les lectures du code confirment : un article à `/`, une page de modération, une couverture Notion, un panneau de matériaux liés et de versions, des avis/contributions conservés localement, et des fonctions serveur pour Notion, OpenRouter, Deepgram et Gradium.

Le lecteur Notion actuel extrait surtout titres, paragraphes et citations en chaînes de texte ; il insère des marqueurs de digression dans ces chaînes. Il ne restitue pas encore la grammaire de callouts et séparateurs demandée. La sidebar permanente, les traces de récolte, les portes, les glaçons et les rêves restent à construire. La présence de fonctions IA ne prouve pas leur disponibilité actuelle : celle-ci sera testée avant activation des nouveaux parcours.

## Organisation proposée

### Lecture et sidebar

- Sur ordinateur : sidebar pleine hauteur, environ un quart de l’écran, avec largeur bornée pour préserver une bonne colonne de lecture. À droite : titre du site, commandes sobres, billet et sa couverture.
- Sur mobile : tiroir depuis la gauche, par-dessus le billet ; bouton d’ouverture toujours accessible, fermeture et retour du focus. GIF visible uniquement dans le tiroir ouvert. Sur les largeurs intermédiaires, replier la sidebar si elle gêne la lecture.
- Sidebar vide : GIF et invitation **proposée**, « Gardez ce qui vous traverse. » Pas de menu supérieur propre.
- Fil chronologique de traces : label de type, titre ou extrait, provenance, contenu dépliable. Regroupement par journée et filtres discrets quand nécessaire ; pas de cartes imbriquées ni de mur d’images.
- Types : fragment, mot-clé, glaçon, rêve. Éviter les doublons, permettre de retirer une trace et de revenir à son passage source. Sélectionner plusieurs traces pour rêver ; l’identité et la sélection persistent entre les univers.
- Une récolte anime discrètement son arrivée dans la sidebar sans l’ouvrir, sans déplacer le texte et sans forcer le fil à défiler pendant qu’on le consulte.
- Simulation de connexion accessible depuis la partie droite ; elle illustre un futur compte sans conditionner la récolte.

### Deux dosages de lecture

**Sans distraction, par défaut :** texte, marques de récolte minimales, portes discrètes. Garder un fragment ne déclenche ni fenêtre ni exploration. Avis et autres outils n’apparaissent qu’à la demande.

**Interactif :** repères éditoriaux plus visibles, ouverture des callouts, avis et dialogue accessibles au passage, exploration des portes et mots-clés. Rien ne s’ouvre automatiquement. Les deux dosages restent disponibles le jour comme la nuit.

### Les passages entre mondes

- Callout lié : retournement et agrandissement mesurés ; petite page au-dessus du bloc, montrant le **contenu** lié et non sa fiche de métadonnées. Même grammaire de rendu ; les callouts rencontrés à l’intérieur restent non interactifs pour éviter les poupées russes.
- Séparateur : ouverture verticale en **mâchoire**, avec deux plans qui s’écartent et une profondeur derrière, pas une porte latérale. Une version immobile donne accès au même contenu.
- Jour : espace de dérive lente au milieu de quinze grandes citations-glaçons, références et mots-clés ; collecte en un geste.
- Nuit : depuis les traces sélectionnées, lancer le dé puis parcourir un rêve le long d’un tronc et d’une branche lumineuse. Une porte de nuit ouvre ce même espace avec la sélection existante ; sans récolte, elle propose un exemple clairement distinct des traces personnelles.
- Au retour : retrouver le séparateur, la position de lecture et le focus ; ne pas recharger le billet. L’univers peut changer sans altérer ni perdre les traces.

## Risques et réponses

| Risque | Réponse et critère de décision |
|---|---|
| L’immersion vole la lecture | Valider d’abord un parcours sans ouvrir de porte. Aucun mouvement derrière le texte, aucune musique ni voix automatique. |
| Les GIF deviennent distrayants | Zone stable, proportions natives et bouton pause. Avec réduction des animations, image fixe issue du GIF. Charger seulement l’univers visible, et arrêter les médias cachés. |
| La 3D chauffe ou devient illisible sur mobile | Valider un seul glaçon et un court trajet nocturne avant de multiplier les objets. Réduire réfraction, résolution et nombre d’objets visibles ; proposer une exploration calme en liste si WebGL manque ou échoue. |
| La citation disparaît dans la glace | Texte lisible rendu aussi en HTML, référence complète et commandes clavier ; le shader ne porte pas seul l’information. |
| Le texte Notion perd sa fidélité | Conserver blocs, identifiants, liens et mise en forme ; séparer annotations interactives et contenu original. Comparer le texte avant/après, ne pas y injecter de nouveaux marqueurs. |
| Commentaires Notion insuffisants | La documentation publique confirme la lecture des commentaires ouverts avec permission dédiée, mais pas des commentaires résolus. L’objet documenté donne un bloc et un fil, pas une plage exacte de caractères exploitable garantie. Tester le billet réel ; ne pas dépendre d’une API privée. |
| Des notes privées deviennent publiques | N’exposer que les instructions éditoriales explicitement désignées ; ne jamais publier tous les commentaires Notion, identités ou coordonnées. Limiter les pages liées aux contenus autorisés. |
| Coûts IA d’un démonstrateur public | Une limite locale est contournable et n’est pas un plafond financier. Exiger une protection globale côté service/serveur avant ouverture publique des rêves ; sinon garder cette ouverture bloquée. |
| Un « compte » simulé trompe le lecteur | Indiquer clairement la simulation et la conservation sur cet appareil seulement. |

## Plan en lots

### Lot 1 — Maquette navigable des deux univers

**Objectif :** valider la sensation du lieu avant la 3D et les dépenses IA.

- Installer le cadre persistant et le tiroir mobile ; utiliser les deux GIF avec pause et alternative fixe.
- Introduire jour/nuit, les deux dosages et un fil de traces d’exemple identifié comme tel.
- Retirer les formats journalistiques ; déplacer les anciennes interactions sans les supprimer.
- Maquetter un callout, la mâchoire et les entrées/sorties des mondes, sans modifier Notion.

**Test de fin :** lire le billet sans distraction ; basculer volontairement ; ouvrir/replier le tiroir ; traverser puis revenir exactement au texte, au clavier et sur mobile.

**Réel :** cadre, GIF, choix d’univers et lecture. **Maquette :** traces d’exemple, profondeur des mondes et rêve préparé.

### Lot 2 — Grammaire éditoriale Notion et pilote

**Dépendance :** validation du lot 1. **Objectif :** rendre les interactions indépendantes du code d’un billet.

- Lire les blocs structurés, leurs enfants et leurs identifiants ; conserver listes, liens, citations et médias rencontrés dans le pilote.
- Résoudre un callout vers une page Notion autorisée, par mention ou lien ; charger son contenu à l’ouverture. Traiter les cycles, pages indisponibles et erreurs sans casser la lecture.
- Transformer les dividers en portes ; tester les commentaires ouverts et les permissions réellement disponibles.
- Repli proposé pour les fragments : commentaire éditorial explicite avec extrait exact, mot-clé et lien optionnel ; si l’extrait est ambigu, ne pas deviner. Si les commentaires ne sont pas accessibles, petite table Notion de repères liée au bloc, sans modifier les phrases. Aucune syntaxe codée pour ce seul billet.
- Préparer puis faire approuver les ajouts Notion : au moins un callout lié, quelques fragments et deux séparateurs. Proposer les structures **Citations** et **Prompts**, sans les créer avant accord.

**Test de fin :** une modification éditoriale Notion produit les mêmes interactions sans changement de code ; page liée rendue correctement ; comparaison concrète du texte original ; permissions manquantes gérées.

**Réel :** lecture Notion et grammaire validée. **Exemples :** citations et prompt tant que leurs bases ne sont pas validées ou renseignées.

### Lot 3 — Récolte persistante et continuité

**Dépendance :** lot 2. **Objectif :** rendre la sidebar personnelle et utile.

- Récolter fragments et mots-clés ; préparer la collecte de citations avec provenance stable.
- Fil dépliable, suppression, prévention des doublons, sélection pour le rêve, retour au passage.
- Conservation locale versionnée, compatible avec les avis et contributions existants ; erreurs de stockage sans perte de lecture.
- Simulation de connexion ; confirmation accessible de récolte, sans ouverture forcée du tiroir.

**Test de fin :** récolter, changer d’univers, recharger, retrouver les traces, en retirer une et revenir à sa source.

**Réel :** tout le parcours de récolte sur cet appareil. **Simulé :** compte et synchronisation distante.

### Lot 4 — Porte et monde des glaçons

**Dépendance :** lot 3. **Objectif :** prouver la profondeur contemplative sans sacrifier la lisibilité.

- Prototype d’un glaçon, puis scène de quinze citations d’exemple avec auteur, source, date, mots-clés et liens ; ne pas inventer de fausses attributions.
- Dérive lente, sensation d’échelle et de glace, scène immersive non enfermée dans une carte décorative.
- Collecte synchronisée avec la sidebar ; son subtil activable, jamais imposé.
- Optimisation mobile, pause, version calme et retour exact au texte.

**Test de fin :** deux portes donnent accès au monde ; citation lisible et collectable au clavier ; quinze entrées accessibles ; aucun chargement 3D avant ouverture, aucun rendu actif après fermeture.

**Réel :** scène et collecte. **Exemple :** corpus explicitement identifié, prêt à venir de Notion.

### Lot 5 — Rêves réels et voix

**Dépendance :** lots 3 et 4 ; services et protection des coûts vérifiés.

- Générer uniquement à partir des traces choisies, après un geste explicite ; ne pas transmettre la besace entière ni les coordonnées.
- Premier prompt proposé, facilement modifiable : « À partir des traces sélectionnées, écris en français un rêve bref, sensoriel et délicatement absurde. Métamorphose les idées plutôt que les résumer. Une comète rencontre la Terre et fait naître un arbre. Traverse une branche comme un sillon de lumière. Ne présente aucune invention comme une citation authentique. »
- Lecture vocale avec pause, reprise et arrêt ; texte permanent, paragraphes mis en évidence au fil de la narration, sans promettre une synchronisation mot à mot si le service ne fournit pas de repères.
- Trajet lumineux sur le tronc et une branche ; alternative immobile. Conserver le rêve comme trace même si la voix échoue ; ne jamais relancer une génération payante pour simplement réécouter.
- Proposition initiale : au plus cinq traces par rêve, environ 150–250 mots, un lancement à la fois et trois rêves par jour sur cet appareil. Valeurs modifiables ; compléter par un vrai plafond global vérifié. Aucun compteur fictif présenté comme dépense réelle.
- Indiquer avant envoi que les traces choisies partent vers les services de génération et de voix. Exemple de secours affiché comme exemple, jamais comme résultat IA réussi.

**Test de fin :** vraies traces → vrai texte → voix effectivement audible → rêve retrouvé après rechargement ; arrêt pendant génération/voix ; limites testées ; échec fournisseur sans requêtes répétées.

**Réel :** IA, voix, conservation et parcours nocturne. **Simulé :** compte uniquement. **Blocage possible :** indisponibilité d’un service ou absence de plafond global fiable.

### Lot 6 — Qualité, mesure et portabilité

**Objectif :** rendre le démonstrateur cohérent, mesurable et exportable.

- Tests bout en bout des parcours jour/nuit, clavier, lecteurs d’écran, mobile, réduction des animations et erreurs réseau.
- Billet complet dans le HTML initial, métadonnées propres aux pages ; scènes et audio chargés à la demande.
- Mesure agrégée sans cookie : garder, collecter, ouvrir une porte, basculer, lancer un rêve. Aucun texte de fragment/rêve, email, identifiant de personne ou empreinte navigateur transmis ; vérifier le service retenu avant d’annoncer une collecte réelle.
- Séparer le code portable des adaptateurs de services/hébergement ; documenter variables secrètes, lancement et limites. Pas de migration d’hébergement ni de publication automatique dans ce lot.
- Mettre à jour README, STORY, CHANGELOG et règles d’architecture selon le comportement vérifié.

**Test de fin :** parcours complet et rechargement sans perte ; contrôle des données réellement émises ; dépôt exportable avec instructions vérifiées.

**Réel :** contrôles et instrumentation une fois testée. **Hors périmètre :** comptes réels, multi-appareils, migration WordPress complète et déploiement auto-hébergé.

## Détails techniques

- Conserver TanStack Start. Cadre et état de sidebar au niveau partagé autour des pages, pas dans le composant du billet ; garder `/` et `/moderation` fonctionnels.
- Modèle de blocs extensible et navigateur-compatible ; contenu original séparé des fonctions éditoriales. Adaptateurs pour citations et prompts : exemples locaux puis Notion.
- Maintenir l’intégration Notion existante par clé serveur, sans migration de connexion dans cette refonte. Pagination, récursion bornée, cache et liste de pages autorisées ; vérifier la version API avant d’adopter de nouvelles fonctions.
- Scènes Three.js importées uniquement après ouverture côté navigateur ; niveau de qualité ajustable et contenu HTML accessible équivalent. Aucun module 3D lourd dans le chargement initial.
- Héberger les GIF joints via les pointeurs d’assets du projet ; conserver leur animation et leur cadrage, avec affichage fixe sur demande.
- Réutiliser les services existants lorsque adaptés, sans changer le dialogue actuel inutilement. Choisir et vérifier l’intégration du nouveau rêve au lot 5 ; clés et prompts effectifs restent côté serveur.
- Tests ciblés pour texte immuable, interprétation des repères, doublons, persistance, sélection et plafonds ; vérification visuelle des mondes sur ordinateur et mobile.

### Références Notion consultées

- [Commentaires : capacités et limites publiques](https://developers.notion.com/guides/data-apis/working-with-comments)
- [Objet commentaire](https://developers.notion.com/reference/comment-object)
- [Texte riche et mentions](https://developers.notion.com/reference/rich-text)
- [Enfants des blocs et récursion](https://developers.notion.com/reference/get-block-children)

Les droits actuels de lecture des commentaires et les nouveaux repères du billet pilote restent **à vérifier sur Notion** au lot 2 ; aucune modification externe n’a été effectuée dans cette préparation.