# Billets ouverts

> Un prototype de lecture immersive en français : lire un essai, réagir à ses passages, explorer ses prolongements et dialoguer avec le texte.
>
> **Type :** Prototype expérimental · **État :** En cours de construction · **Version :** mondes jour/nuit, rêve IA et base Organique IA (sans release numérotée) · **Mémoire vérifiée le :** 2026-10-13 · **Référence historique :** `c0c31ea`, précédant les lots 1 et 2

## 1. Fiche d’identité

| Élément | Valeur actuelle |
|---|---|
| Nom | Billets ouverts |
| Problème exploré | Transformer un article linéaire en expérience de lecture participative sans surcharger le texte |
| Public principal | Lecteurs d’essais sur le cinéma et le web ; contributeurs au billet |
| Responsable du projet | Ulrich Fischer, demandeur du prototype ; relation Notion non résolue |
| Agent / outil de création | Lovable |
| Type / état | Prototype expérimental / En cours de construction |
| Version documentée | État du code relu le 2026-10-13 ; `c0c31ea` est une référence historique, pas la version actuelle ; aucun tag vérifié |
| Début du développement spécifique | 2026-10-11, d’après l’historique Git ; template antérieur du 2026-10-07 |
| Date de lancement public | Aucun lancement public constaté |
| Dernière vérification documentaire | 2026-10-13 ; 27 tests réussis dans 6 fichiers |

## 2. Vue d’ensemble produit

### 2.1 Proposition de valeur

L’application ouvre l’essai « Et si… le cinéma embrassait le web ? » à des lectures alternatives et à des contributions passage par passage. Les lecteurs peuvent donner un avis, écrire un commentaire, proposer une tangente et consulter les matériaux liés. Un dialogue textuel ou vocal explore le passage à partir de matériaux limités. Le prototype privilégie la fidélité des interactions ; il ne constitue pas un service collaboratif de production.

### 2.2 Objectifs actuels

- **Principal :** expérimenter « lire, garder, rêver » : texte original intact, fil personnel et mondes jour/nuit ; les dix interactions initiales sont la genèse, pas la direction à rétablir.
- **Pour le lecteur :** rester dans le texte tout en pouvant le prolonger.
- **Pour le projet :** tester l’intérêt d’un billet ouvert alimenté par Notion.
- **Critère prioritaire :** des parcours utilisables avec un retour clair, sans inventer de persistance partagée.
- **Lot 2 :** interpréter les blocs éditoriaux Notion sans syntaxe propre à ce billet et sans réécriture du texte.

### 2.3 Périmètre actuel

**Inclus :** article, couverture GIF, avis, commentaires, tangentes, digressions, dialogue, contribution, modération locale et panneau « Autour du billet » ; cadre jour/nuit, sidebar persistante, tiroir mobile, GIF pleine largeur depuis le haut, sans bouton Pause, et deux dosages. Bouton « Information » dans le menu ; poésie au survol/focus de l’animation. Blocs Notion structurés, enfants, citations, listes, liens et images ; séparateurs-portes et lecteur de callouts liés autorisés. Le fil est personnel et local. Derrière chaque porte : le jour, quinze citations-glaçons d'exemple dérivent et se gardent dans le fil ; la nuit, « La branche et l’écran » génère un rêve OpenRouter après sélection explicite de 1 à 5 traces, puis propose une lecture Gradium après un second geste. Les réglages restent en dur ; la base Notion « Organique IA » est créée mais pas encore lue. Le callout lié du pilote affiche sa page entière après retournement ; les deux séparateurs ouvrent la même expérience selon l’univers. Trois repères sont validés, leur activation est reportée. Les formats journalistiques ne sont plus accessibles.

**Hors périmètre :** comptes, Lovable Cloud, base partagée, publication automatique des contributions dans Notion, véritable administration sécurisée, paiement et suivi budgétaire comptable.

### 2.4 Contexte et genèse

Le brief demandait une page française avec dix interactions, sans comptes, avec un stockage local. Le premier texte fictif a été conservé comme secours. La connexion Notion a ensuite permis de lire le billet réel et ses relations. Une révision a simplifié l’en-tête, déplacé les versions et regroupé les matériaux liés dans un panneau. Voir [STORY.md](STORY.md).

## 3. Sources de vérité et liens

| Source | Lien ou chemin | Rôle / fraîcheur |
|---|---|---|
| URL publiée fournie par le projet | https://billets-ouverts.lovable.app | Existence de l’URL connue ; contenu déployé, date et parité avec ce code non vérifiés dans cette session |
| Preview | https://id-preview--00a5b37b-26c1-429d-abb8-0f07b490bbd4.lovable.app | URL fournie par le projet ; accès externe non retesté le 2026-10-13 |
| Dépôt GitHub | À confirmer — aucune URL GitHub vérifiée | Ne pas confondre stockage Git interne et GitHub |
| Brief approuvé | [.lovable/plan/billets-ouverts-ux-prototype-2026-10-11.md](.lovable/plan/billets-ouverts-ux-prototype-2026-10-11.md) | Intention initiale ; détails Notion dépassés |
| Architecture | [AGENTS.md](AGENTS.md) | Règles actuelles |
| Design | [src/styles.css](src/styles.css) | Tokens et typographie |
| Historique / récit | [CHANGELOG.md](CHANGELOG.md), [STORY.md](STORY.md) | Créés le 2026-10-12 |
| Fiche « Applications générées » | À confirmer — fiche non identifiée | Aucune synchronisation effectuée par cette mise à jour |
| Vérifications | Section 9 | Résultats datés, sans secrets |
| Reprise Cursor | Section 7.7 | Contrat actuel, fichiers à lire, priorités et limites Coolify |
| Organique IA | [NOTION-IA-BASE.md](NOTION-IA-BASE.md) | Base créée, deux lignes ; branchement non implémenté |
| Audit Cursor / Notion | [NOTION-CURSOR-AUDIT.md](NOTION-CURSOR-AUDIT.md) | Instantané en lecture seule du 2026-10-13, pas une direction produit |

**Hiérarchie locale :** tests et application exécutée, puis code actuel, historique Git, brief et récit. Le code direct Notion prévaut sur la mention du connecteur dans le plan initial. Les relations vides ne prouvent pas une fonctionnalité absente ; elles ne doivent pas être remplacées par des données inventées.

## 4. Utilisateurs, parcours et expérience

### 4.1 Utilisateurs et situations d’usage

| Profil | Besoin | Situation | Résultat |
|---|---|---|---|
| Lecteur | Comprendre et discuter un essai | Lecture sur ordinateur ou téléphone | Avis, question, digression ou nouvelle lecture |
| Contributeur | Prolonger le billet | Depuis un passage ou la fin du texte | Proposition dans la file locale |
| Testeur / responsable | Examiner les contributions du prototype | Même navigateur | Approbation ou rejet local |

### 4.2 Parcours clés

| Parcours | Étapes / sortie | État | Preuve |
|---|---|---|---|
| Lecture | Ouvrir `/` → contenu Notion ou secours → lire / ouvrir une digression | Implémenté | `src/routes/index.tsx`, `src/components/billet/Passage.tsx` |
| Avis et commentaire | Ouvrir le marqueur → choisir un avis → « Pourquoi ? » → confirmation | Implémenté, local | `src/components/billet/Passage.tsx`, `src/lib/store.ts` |
| Matériaux | « Autour du billet » → onglet → contenu lié | Implémenté, sans onglet Versions | `src/components/billet/RelatedPanel.tsx`, `src/routes/index.tsx` |
| Dialogue | Passage → consentement → question → réponse ; voix facultative | Partiel, services non retestés de bout en bout cette session | `src/components/billet/Dialogue.tsx`, `src/lib/api.functions.ts` |
| Traces | Interactif → + → passage/mot-clé ; fil → recherche, suppression, retour | Implémenté, local | `traces.ts`, `store.ts`, `ReaderSidebar.tsx` |
| Mondes | Séparateur → jour : garder une citation ; nuit : choisir 1–5 traces → lancer → écouter | Implémenté ; quota local, voix à revalider | `Worlds.tsx`, `api.functions.ts` |
| Page liée | Callout « Statique. » → retournement → page entière → retour | Vérification réelle rapportée dans la session précédente | `PrototypePassages.tsx`, `EditorialArticle.tsx` |
| Contribution / modération | Formulaire → file locale → `/moderation` → approuver/rejeter | Implémenté, non partagé | `src/components/billet/Contribute.tsx`, `src/routes/moderation.tsx` |

### 4.3 Écrans, routes et états importants

| Route | Rôle | États | Accès | Fichier |
|---|---|---|---|---|
| `/` | Billet et panneaux | Notion / secours, original, portes et panneaux fermés / ouverts | Public | `src/routes/index.tsx` |
| `/moderation` | Avis et file | Vide, attente, approuvé, rejeté | Public, sans contrôle de rôle | `src/routes/moderation.tsx` |

Chaque route possède ses propres métadonnées françaises. La couverture HTTPS est reprise dans les métadonnées sociales du billet lorsqu’elle est disponible.

### 4.4 Expérience conversationnelle ou vocale

- Exploration ouverte en français ; réponse souhaitée de deux à cinq phrases, ton réflexif.
- Consentement demandé avant chaque ouverture ; seule la décision est persistée, **pas le transcript**, même en cas d’acceptation.
- Contexte réellement envoyé : passage, carnet Notion ou secours, résonances approuvées de la file locale. Les résonances liées Notion affichées dans le panneau ne sont pas transmises au dialogue.
- Texte : OpenRouter, modèle `openai/gpt-4o-mini`.
- Voix : enregistrement navigateur, transcription Deepgram après arrêt, lecture Gradium ; ce n’est pas une transcription en streaming.
- Retour au texte avec une notice si le microphone ou la voix échoue. Services externes et cas réseau non vérifiés de bout en bout le 2026-10-12.
- Jauge « x $ / 30 $ ce mois » illustrative, sans plafond serveur ni remise à zéro mensuelle.

### 4.5 Contrat UX et visuel

- Lieu de lecture : sidebar gauche (25 % puis largeur bornée), colonne originale à droite ; tiroir superposé sur mobile et tablette.
- Jour par défaut, passage volontaire nuit/jour, GIF nuage/vagues et comète/arbre fournis. Sidebar blanc pur (#FFFFFF) / noir pur (#000000), sans teinte. GIF pleine largeur depuis le bord supérieur, sans Pause ; image fixe en réduction des animations et médias cachés démontés. Slogans absents sous l’image, poésie seulement au survol/focus ; « Information » tout à droite du menu présente le projet.
- Deux dosages persistés : sans distraction et interactif. Sans distraction retire les commandes et ajouts applicatifs entre paragraphes, tout en conservant les blocs et annotations éditoriales Notion et les séparateurs-portes. En interactif, un petit signe + déplie les icônes Réagir, Garder et Mot-clé ; aucun développement automatique après enregistrement ou réaction. Fil personnel local avec recherche, suppression et retour au passage.
- Le callout « Statique. » pivote sur place puis s’agrandit au-dessus de la colonne de lecture, sans recouvrir la sidebar desktop ; sur smartphone, la page liée occupe l’écran et la sidebar reste un tiroir. La page liée est affichée en entier dans la grammaire de blocs prise en charge, pas comme une copie intégrale de l’interface Notion. Les deux séparateurs ouvrent le même monde selon le mode jour/nuit et permettent le retour exact. Le secours conserve ses inserts préparés ; pas d’inserts fictifs dans le billet réel.
- Playfair Display pour les titres, Roboto pour le corps, Oswald pour les petits labels ; couleurs et états dans `src/styles.css`.
- En-tête : « Billet ouvert - une expérimentation de lecture immersive », persistant en haut pendant le défilement.
- GIF sous le titre ; pas de surtitre orange ni de badge « Contenu Notion ».
- Carnet, contributeurs, digressions et résonances dans un panneau ; texte original seul. Généalogie originale et tangentes locales, modération en pied de page.
- Notes de démonstration dans la marge à partir du breakpoint `lg`, panneau inférieur sur petit écran ; voir la limite Notion en section 11.
- Boutons de digression avec `aria-expanded`, formulaires étiquetés, primitives Radix, animations réduites selon la préférence système. Conformité AA complète non auditée.

## 5. Fonctionnalités et règles métier

### 5.1 Couverture fonctionnelle

| Fonction | État | Limites / preuve |
|---|---|---|
| Avis | Implémenté | Quatre réactions ; une réaction par passage remplace l’ancienne ; compteurs fictifs + avis local (`Passage.tsx`, `store.ts`) |
| Commentaire | Implémenté | « Pourquoi ? » facultatif, confirmation et file locale (`Passage.tsx`) |
| Tangente | Implémenté localement | Dialogue amorcé ou proposition ; approbation visible dans la généalogie locale, pas de publication distante |
| Digressions | Implémenté | Notion : annotations séparées, extrait exact non ambigu dans un seul bloc ; secours : marqueurs historiques `[[dN|fragment]]` |
| Grammaire Notion | Implémentée | Identifiants stables, récursion bornée, listes, citations, liens et médias ; 106 blocs textuels non vides comparés à Notion |
| Callouts liés | Implémenté, pilote testé précédemment | Lecture à l’ouverture ; destination explicitement liée au callout du pilote, contrôlée côté serveur ; imbriqués non interactifs |
| Fragments éditoriaux | Repli implémenté, trois repères validés mais activation reportée | Commentaires refusés (403) ; seules instructions explicites ou lignes liées « Repères éditoriaux » sont éligibles, extrait ambigu rejeté |
| Fil personnel | Implémenté | Passages, mots-clés, citations ; recherche sans accents/casse, dédoublonnage, suppression, sélection persistée ; aucun rêve sauvegardé |
| Monde de jour | Implémenté en HTML/CSS | 15 phrases d’exemple sans attribution ; pas de corpus Citations Notion ni de 3D |
| Rêve de nuit | Génération réelle implémentée | OpenRouter, voix Gradium facultative ; 3 succès/jour/appareil en local, pas un quota serveur |
| Organique IA | Base Notion créée | `reve.nuit`, `dialogue.passage` ; aucun réglage distant lu par l’application |
| Marginalia | Partiel | Notes fictives ; pas de chargement de la base Marginalia Notion |
| Formats journalistiques | Retirés de l’expérience | Données historiques conservées ; aucun sélecteur de brève, grand format, relecture, variation ou remix |
| Dialogue | Partiel | Texte/STT/TTS présents ; rétention annoncée mais non réalisée ; jauge simulée |
| Généalogie | Partiel | Arbre fictif + tangentes locales approuvées ; pas de reconstruction depuis les relations Notion |
| Contribution | Implémenté localement | Quatre types, nom requis, licence/modération acceptées ; e-mail saisi mais non enregistré |
| Modération | Partiel | File locale utilisable ; tableau des avis basé sur le texte fictif, pas le billet Notion ; aucune authentification |

Les chemins abrégés des composants renvoient à `src/components/billet/`. Les versions, réactions et exemples proviennent de `src/data/billet.ts`.

### 5.2 Règles métier critiques

1. Un nouvel avis remplace le précédent pour le même identifiant de passage.
2. Les contributions naissent avec le statut `pending`. Une résonance locale `approved` entre dans le contexte du dialogue ; une tangente `approved` entre dans la généalogie.
3. Le formulaire général exige texte, nom/pseudonyme et acceptation de la licence/modération ; une résonance exige une URL via la validation HTML.
4. Les crédits Notion n’exposent que les profils liés dont `Consentement crédits` vaut `true` ; aucun e-mail de profil n’est retourné.
5. Si Notion est absent ou échoue, l’article fictif sert de secours. Les clés restent côté serveur.

### 5.3 Permissions et rôles

Il n’existe ni compte ni rôle applicatif. Tout visiteur peut lire et modifier sa propre file dans ce navigateur, y compris depuis `/moderation`. Ce dispositif n’est pas une protection de modération pour une production publique.

## 6. Données, questions et sorties

### 6.1 Modèle de données

| Entité | Champs / finalité | Source | Sensibilité |
|---|---|---|---|
| Billet | Titre, date, couverture, blocs structurés avec spans, enfants et IDs | Notion, page `3f651168-2fc3-8163-9bc3-f108577ca8b8` ; secours `src/data/billet.ts` | Contenu éditorial |
| Matériaux liés | Carnet, digressions, résonances, contributeurs, versions | Relations explicites du billet Notion | Crédits publics filtrés |
| `myAvis` | Dictionnaire passage → réaction | localStorage | Préférences de lecture |
| `queue` | `id`, `kind`, `passageId?`, `text`, `url?`, `name?`, `status`, `createdAt` | localStorage | Texte et pseudonyme saisis |
| `consent` | `boolean` ou `null` | localStorage | Décision du lecteur |
| `spent` | Nombre, initialisé à `4.2` | localStorage | Estimation illustrative |
| `traces` / `tracesVersion` | `id`, `kind` passage/mot-clé/citation, `passageId`, `text`, `excerpt`, `createdAt`, `selected?` ; version 2 | Store local ; liste initiale vide | Fragments choisis par le lecteur |
| Compteur rêves | `{day, n}`, date UTC ; seuls les succès comptent | localStorage `billets-ouverts-dreams` | Compteur modifiable/effaçable, pas une protection serveur |
| Rêve produit / audio | État React et lecteur audio temporaire ; non sauvegardés dans le fil | `Worlds.tsx` | Texte généré / audio traité par prestataire |
| Organique IA | Deux usages documentés ; champs de modèles, prompts, limites et versions | Notion ; pas de lecture applicative | Configuration éditoriale, jamais clés API |
| Messages / audio | Historique en mémoire React, enregistrement envoyé pour transcription | Navigateur et prestataires | Contenu de conversation / voix |

Pas de schéma SQL, migration ou base partagée. Clé locale : `billets-ouverts-v1`. Les choix universe/day/night, dose/quiet/interactive, paused et connected (simulation uniquement) sont enregistrés séparément dans `billets-ouverts-reader-v1`. Le fil démarre vide et devient personnel par récolte explicite ; les 15 phrases des glaçons sont des exemples. `paused` subsiste dans les préférences historiques, mais aucun bouton Pause n’est affiché.

### 6.2 Champs ou questions collectés

| Champ | Obligatoire | Validation / destination |
|---|---|---|
| Type de contribution | Oui, sélection initiale | note, commentaire, résonance, tangente ; file locale |
| Texte | Oui dans le formulaire général | `required` HTML ; file locale |
| URL | Oui pour une résonance | `type=url` ; file locale |
| Nom ou pseudonyme | Oui dans le formulaire général | `required` HTML ; file locale |
| E-mail | Non | `type=email` ; état du formulaire uniquement, non transmis à `addToQueue` |
| Licence et modération | Oui | Checkbox `required` ; accord non stocké dans chaque contribution |
| Consentement dialogue | Choix demandé | Décision persistée ; transcript non conservé |
| Message / audio | Selon le mode | Message transmis à OpenRouter ; audio à Deepgram via le serveur |

### 6.3 Entrées et sorties

Notion est lu en blocs structurés à IDs stables : les nouveaux avis et retours au texte Notion s’appuient sur les IDs des blocs. Le secours et la modération historique restent positionnels (`p1`, `p2`, etc.) ; ne pas remapper arbitrairement les anciens avis. Les contributions produisent une confirmation et des UUID locaux, non des comptes. Le rêve transmet seulement le texte des traces sélectionnées (chaque texte tronqué à 1 200 caractères), jamais toute la collection ni les coordonnées. Les sorties IA sont du texte et éventuellement de l’audio, sans export ni écriture Notion ; le rêve n’est pas conservé après démontage de son écran.

### 6.4 Intégrations et contrats externes

| Service | Usage / contrat | Authentification côté serveur | Échec |
|---|---|---|---|
| Notion | Lecture `/v1/pages/{id}` et `/v1/blocks/{id}/children`, pagination ; version `2025-09-03` | `NOTION_API_KEY`, Bearer direct vers `api.notion.com` ; pas de gateway | Secours fictif pour l’ensemble du billet |
| OpenRouter | Dialogue et rêve : POST `/api/v1/chat/completions`, `openai/gpt-4o-mini` ; rêve : température 0,9, 700 jetons max | `OPENROUTER_API_KEY`, Bearer | Message d’indisponibilité / erreur |
| Deepgram | POST `/v1/listen?model=nova-2&language=fr&smart_format=true` | `DEEPGRAM_API_KEY`, Token | Retour au texte pour les erreurs gérées |
| Gradium | POST `https://eu.api.gradium.ai/api/post/speech/tts`, WAV | `GRADIUM_API_KEY`, `x-api-key` | Retour au texte |

Preuve : `src/lib/api.functions.ts`. Les bases découvertes pendant l’intégration ne sont pas toutes consommées : le code actuel suit les relations du billet, pas une recherche globale des bases.

### 6.5 Confidentialité, sécurité et rétention

- Stockage local sans durée de rétention ni synchronisation ; effacement possible via les données du site dans le navigateur, sans bouton dédié.
- Consentement et coût restent enregistrés même dans le mode de conversation dit éphémère ; les messages restent en mémoire dans les deux modes.
- Le mode éphémère n’empêche pas le traitement des messages et de la voix par les prestataires ; leurs durées de rétention ne sont pas vérifiées.
- Secrets gérés dans Lovable / variables serveur ; aucune valeur à ajouter à ces documents.
- Validation Zod des entrées IA : passage ≤ 8 000 caractères, contexte ≤ 12 000, ≤ 30 messages de ≤ 4 000 caractères ; audio base64 ≤ 15 000 000 caractères ; TTS ≤ 3 000 caractères. Rêve : 1–5 textes non vides, ≤ 1 200 caractères chacun, validés côté serveur. Objectif 150–250 mots dans le prompt, sans vérification de longueur du résultat.
- Pas de contrôle de rôle, de limitation de fréquence ou de plafond budgétaire serveur spécifique observé. La limite de 3 rêves réussis/jour/appareil utilise le jour UTC et localStorage : effaçable, contournable, non fiable si le stockage est refusé ; elle ne borne pas les coûts OpenRouter/Gradium. Une exposition publique exige un arbitrage de sécurité.

## 7. Architecture et carte du code

### 7.1 Stack technique

Versions déclarées dans `package.json` (les plages ne sont pas des versions installées garanties) :

| Couche | Technologie | Rôle |
|---|---|---|
| Interface | React `^19.2.0` | Lecture et interactions |
| Framework | TanStack Start `1.168.60`, Router `1.170.41`, Query `^5.101.1` | Routes, SSR, fonctions serveur et cache |
| Styles | Tailwind `^4.2.1`, Radix UI, Lucide | Tokens, panneaux et contrôles |
| Outils | Vite `8.1.5`, TypeScript `^5.8.3`, Bun / `bun.lock` | Développement et dépendances |
| Tests / qualité | Vitest `^4.1.10`, Testing Library, ESLint, Prettier | Vérification |
| Données | Notion + localStorage | Éditorial entrant et état du prototype |
| Authentification | Aucune | Choix explicite du prototype |
| Cible d’exécution | Lovable, runtime serveur compatible Worker | Cible configurée Cloudflare ; déploiement actuel non vérifié |

### 7.2 Flux principal

```text
Lecteur → / → loader + cache Query (60 s) → getNotionContent → API Notion
                   └→ article de secours si échec
Lecteur → avis / contribution → store → localStorage → modération locale
Lecteur → dialogue → fonction serveur → OpenRouter → texte
                  └→ Deepgram (audio entrant) / Gradium (audio sortant)
Lecteur → garder/chercher/supprimer/choisir → traces locales
Séparateur → monde jour : corpus exemple → garder citation
           └→ monde nuit → textes sélectionnés → generateDream → OpenRouter
                         └→ geste Écouter → speak → Gradium
Notion Organique IA → documentation uniquement (aucun flux de configuration actif)
```

### 7.3 Structure du dépôt

```text
src/routes/                 # Billet, modération, layout racine
src/components/billet/      # Passage, Dialogue, Contribute, RelatedPanel
src/components/ui/          # Primitives d’interface
src/data/billet.ts          # Texte et données fictives de secours
src/lib/api.functions.ts    # Appels externes côté serveur
src/lib/store.ts            # État local du lecteur
src/lib/traces.ts           # Traces version 2, recherche, dédoublonnage, sélection
src/lib/ai-config.ts        # Réglages exécutés du rêve (pas ceux du dialogue)
src/data/quotes.ts          # 15 phrases d’exemple et limites UI du rêve
src/components/billet/Worlds.tsx # Mondes, génération, audio, compteur local
src/lib/notion-editorial*   # Blocs structurés, liens autorisés, tests
NOTION-IA-BASE.md           # Schéma Organique IA créé, non branché
NOTION-CURSOR-AUDIT.md      # Audit des ajouts Cursor, non importés
src/lib/notion-properties*  # Extraction couverture / consentement et tests
src/test/                   # Test de routage et setup
src/styles.css              # Tokens et styles
AGENTS.md                   # Règles d’architecture
README.md / STORY.md / CHANGELOG.md
roadmap.md                  # Tâches du projet
```

### 7.4 Fichiers structurants

Lire `index.tsx` pour l’assemblage et les limites des variantes, `api.functions.ts` pour les contrats externes, `store.ts` avant de modifier la persistance, `notion-properties.ts` et ses tests pour la couverture/crédits, et les composants de billet pour les interactions. `src/routeTree.gen.ts` est généré, ne pas l’éditer.

### 7.5 Décisions d’architecture

| Décision | Raison / conséquence | Preuve |
|---|---|---|
| localStorage, sans comptes ni Cloud | Prototype rapide ; données isolées par navigateur | `AGENTS.md`, `store.ts`, brief |
| APIs via fonctions serveur | Garder les clés hors du navigateur | `api.functions.ts` |
| Notion direct et relations explicites | Connexion réelle au billet ; le connecteur initial a été remplacé | `AGENTS.md`, `api.functions.ts` |
| Panneau de matériaux / versions | Garder l’en-tête et la lecture épurés | `RelatedPanel.tsx` |
| Utilitaire de propriétés browser-safe | Préserver les URL GIF originales et tester le consentement | `notion-properties.ts` |

### 7.6 Écarts entre intention et réalité

| Sujet | Intention | Réalité / arbitrage |
|---|---|---|
| Notion | Connecteur dans le plan initial | Clé d’intégration directe, décision ultérieure |
| Dialogue conservé | Conservation avec accord | Décision seule persistée ; aucun transcript sauvegardé |
| Voix live | Transcription en direct | Transcription après arrêt, statut « Écoute… » pendant l’enregistrement |
| Résonances de contexte | Matériaux validés liés | Seules les résonances approuvées localement + carnet entrent au dialogue |
| Modération | Vue du billet courant | Tableau fictif ; file locale non sécurisée |
| Versions / généalogie / marginalia | Relations éditoriales complètes | Données encore hybrides ou fictives |

### 7.7 Reprise précise par Cursor — instantané du 2026-10-13

**But commun :** conserver « lire, garder, rêver », le texte intact et la sidebar personnelle jour/nuit. Cursor compare une autre réalisation du même PRD ; ses ajouts Notion ne font pas autorité sur la direction récente. L’audit du 2026-10-13 le situe en retard sur sidebar/traces/mondes : ce n’est pas une vérification de son code actuel. Mutualiser contenus et intentions, pas importer tous les anciens interrupteurs ni rétablir les formats journalistiques.

**Ordre de lecture du dépôt :** `AGENTS.md`, ce README (4–9 et 11), `STORY.md`, `CHANGELOG.md`, puis `NOTION-CURSOR-AUDIT.md` et `NOTION-IA-BASE.md`. Le plan de six lots reste une intention historique ; les paragraphes « en attente » des anciens lots dans le changelog ne décrivent pas l’état courant.

| Zone à reprendre | Fichiers / contrat à préserver |
|---|---|
| Cadre et continuité | `ReaderContext.tsx`, `ReaderSidebar.tsx`, `__root.tsx`, `reader-preferences.ts` : Outlet partagé, préférences après hydration, sidebar/tiroir, GIF et images fixes via `.asset.json` |
| Lecture intacte | `index.tsx`, `EditorialArticle.tsx`, `notion-editorial.ts`, `PrototypePassages.tsx` : blocs/IDs stables, quiet sans ajouts applicatifs, callout réautorisé et portes |
| Fil personnel | `store.ts`, `traces.ts`, `Passage.tsx` : version 2, compatibilité des anciennes traces non sélectionnées, recherche normalisée, doublons refusés, retour au bloc pour les traces du billet |
| Mondes | `Worlds.tsx`, `quotes.ts`, `styles.css` : glaçons HTML/CSS d’exemple, nuit après sélection explicite, retour/focus/scroll ; citations g1–g15 sans passage d’origine dans le billet |
| IA exécutée | `api.functions.ts`, `ai-config.ts` : clés côté serveur, rêve configuré par `DREAM_AI`, dialogue encore défini séparément dans la fonction, voix par variable serveur ou défaut ; pas de gateway IA Lovable |
| Vérifications | Tests de propriétés, éditorial, préférences, traces, article et routage ; aucun test complet du quota/API/audio |

**Organique IA : créé ne signifie pas branché.** Base : https://app.notion.com/p/00558b658e6f49f69a5049c0602d643e ; data source `c66462b5-fbf0-404d-9527-1a96b864bdf5`. Création et deux lignes initiales confirmées dans la conversation précédente ; pas de nouvelle lecture distante pendant cette mise à jour. Champs : Clé (titre), Usage, Actif, Modèle, Modèle de secours, Prompt système, Température, Jetons max, Mots min/max, Traces max, Usages par jour, Voix, Version, Notes. Usages initiaux : `reve.nuit`, `dialogue.passage`. Modifier Actif, modèle, prompt, plafond ou voix dans Notion n’a **aucun effet aujourd’hui**. Aucun modèle de secours automatique n’est exécuté. Le rêve lit `ai-config.ts` ; les limites UI sont dans `quotes.ts`, le schéma d’entrée est dans `api.functions.ts`, le compteur est dans `Worlds.tsx`. Ne pas annoncer une centralisation complète qui n’existe pas.

**Prochaine évolution à décider :** brancher cette base côté serveur avec validation des champs, correspondance explicite des usages et repli sur les valeurs en dur. Harmoniser ensuite les réglages dispersés et seulement les lignes Réglages de Cursor encore utiles ; définir le comportement de Actif=false et les contrôles de coûts avant exposition publique. Ce branchement n’est pas réalisé par cette actualisation documentaire. Les trois repères Distribution / Réglementation / Expérience sont validés, mais leur interaction contextuelle reste volontairement différée.

**Coolify / self-hosting : objectif, pas livraison.** Le dépôt reste TanStack Start, avec configuration de build cible Cloudflare dans `vite.config.ts` ; aucun Dockerfile, recette Coolify, serveur Node de production ni déploiement Coolify vérifiés. `bun run dev` est une commande de développement, pas une recette d’exploitation. Avant transfert : choisir et valider un adaptateur de production compatible Coolify, tester SSR et fonctions serveur, servir les médias pointés par les `.asset.json`, injecter les secrets hors Git, fixer quotas serveur, rétention, sécurité et sauvegardes. Ne pas remplacer le routage TanStack pour transporter le projet.

**Portabilité / repartir de zéro :** reprendre les contrats UX, la grammaire Notion, les fonctions pures/testées des traces et les frontières des API ; réexaminer modération locale publique, budget fictif, consentement/transcripts et robustesse réseau. Aucune preuve actuelle n’impose de repartir de zéro ni ne démontre que ce code est prêt pour production. La documentation conserve les intentions et apprentissages ; aucune synchronisation du dépôt Cursor n’est effectuée ici.

## 8. Installation, configuration et commandes

### 8.1 Prérequis

Bun et un environnement compatible avec la version de Vite déclarée ; aucune version minimale Node vérifiée ici. Les services externes sont facultatifs pour ouvrir le prototype, requis pour leurs fonctions respectives.

### 8.2 Installation

Depuis une copie du dépôt obtenue dans Lovable (URL GitHub à confirmer) :

```bash
bun install
bun run dev
```

Le sandbox Lovable sert actuellement l’application sur `http://localhost:8080`. Le port d’un autre environnement n’est pas garanti. Aucun `.env.example` n’est présent ; pour l’usage local, configurer les variables serveur ci-dessous sans versionner leurs valeurs.

### 8.3 Variables d’environnement

| Variable | Requise pour | Portée / provenance |
|---|---|---|
| `NOTION_API_KEY` | Article réel | Serveur ; intégration Notion autorisée sur les pages liées |
| `OPENROUTER_API_KEY` | Dialogue et rêve de nuit | Serveur ; OpenRouter |
| `DEEPGRAM_API_KEY` | Transcription | Serveur ; Deepgram |
| `GRADIUM_API_KEY` | Synthèse vocale | Serveur ; Gradium |
| `GRADIUM_VOICE_ID` | Choix de voix facultatif | Serveur ; voix par défaut prévue dans le code |

`NOTION_PAGE_ID` du plan initial n’est pas utilisé : la page actuelle est fixée dans le code. Présence des secrets non réinspectée dans cette session documentaire. Clé OpenRouter actualisée et essai réel réussi rapportés dans la session précédente ; aucun secret copié dans ces documents.

### 8.4 Commandes usuelles

| Action | Commande existante | État de cette session |
|---|---|---|
| Développement | `bun run dev` | Serveur déjà géré par Lovable ; non redémarré |
| Lint | `bun run lint` | Échec historique, non rejoué le 2026-10-13 |
| Tests | `bunx vitest run` ou `bun run test` | 27 tests réussis dans 6 fichiers le 2026-10-13 |
| Typecheck | Pas de script dédié | Non exécuté ; contrôles gérés par Lovable |
| Build | `bun run build` | Script présent, non exécuté manuellement |
| Preview de build | `bun run preview` | Non exécuté |
| Format | `bun run format` | Non exécuté ; éviter un reformatage global pour une demande documentaire |

## 9. Tests, qualité et preuves

### 9.1 Stratégie de test

Tests ciblés : couvertures URL/fichiers/GIF, consentement des crédits, route de base. La suite couvre aussi les préférences, la grammaire éditoriale, la sélection/recherche des traces et le chargement d’une page liée après geste. Aucun test automatisé complet de toutes les interactions, du quota journalier ou des services vocaux. Les parcours IA nécessitent de vrais appels et une validation dédiée.

### 9.2 Vérifications actuelles — 2026-10-13

- Relecture du code actuel, du schéma décrit Organique IA et de l’audit Cursor ; aucune écriture Notion, aucune dépense IA/audio ni publication.
- `bunx vitest run` : **27 tests réussis, 6 fichiers** le 2026-10-13 à 09:33 UTC (propriétés 5, éditorial 6, préférences 4, traces 10, routage 1, article 1).
- Aucun lint, build ou typecheck exécuté manuellement ; les chiffres ESLint ci-dessous restent historiques. Journaux d’observabilité indisponibles lors de la lecture initiale : aucun nouveau succès de build revendiqué.
- Parcours visuels et services réels non rejoués pour cette tâche documentaire ; preuves antérieures explicitement séparées ci-dessous.

### Vérifications historiques de la première rédaction — 2026-10-12

| Vérification | Méthode | Résultat | Date |
|---|---|---|---|
| Tests | `bunx vitest run` | Réussi : 2 fichiers, 6 tests | 2026-10-12 |
| Lint | `bun run lint` | Échec : 189 erreurs, 6 avertissements ; 188 erreurs de formatage corrigeables automatiquement, une erreur d’expression inutilisée | 2026-10-12 |
| Typecheck | Non exécuté | Interdit manuellement dans le sandbox ; aucun succès actuel revendiqué | 2026-10-12 |
| Build | Contrôle automatique Lovable | Réussi après rédaction : journal `build OK` à 18:48:28 UTC ; non exécuté manuellement | 2026-10-12 |
| Parcours / revue visuelle | Non rejoués | Documentation seule ; couverture, panneau et changement de version vérifiés dans la session précédente, pas une preuve actuelle IA | 2026-10-12 |
| Documentation | Contrôle des liens locaux, blocs Markdown, rubriques et marqueurs | Réussi : trois documents, seize rubriques README, marqueurs Notion présents, aucun champ de modèle non remplacé | 2026-10-12 |

### Vérification initiale lot 5 — 2026-10-13 (avant activation IA)
Monde jour : 15 glaçons rendus, récolte d'une citation dans le fil, fermeture et retour au texte exact. Monde nuit : traces choisies listées, « Lancer le dé » actif, prompt et limites affichés. Aucun pageerror. Dix tests unitaires sur les traces (citation, recherche, sélection, compatibilité legacy). Aucune écriture Notion, aucun appel IA.

### Activation IA et Notion — 2026-10-13 (preuve antérieure rapportée)

Clé OpenRouter enregistrée via saisie sécurisée, génération réelle avec le compte de l’utilisateur rapportée comme réussie. Lecture Gradium présente dans le code ; aucune preuve conservée d’un parcours vocal complet, de trois succès puis refus, ou des exceptions réseau. Un modèle initial refusé/retiré a conduit au modèle déjà utilisé par le dialogue (`openai/gpt-4o-mini`) : ce remplacement n’est pas un mécanisme automatique de secours. Création Notion d’Organique IA et de deux lignes confirmée dans la conversation ; aucun branchement actif. Callout réel, deux portes, récolte, sélection et retour essayés dans les sessions précédentes, pas rejoués ici.

### Vérification lot 1 — 2026-10-12

Dix tests réussis (trois fichiers). Playwright : contenu Notion réel (99 paragraphes affichés), texte identique jour/nuit et après rechargement, pause GIF, dosage et univers persistés, panneau sans Versions, routes partagées, deux portes et retour exact (écart 0 px), mobile 390×844 sans débordement, tiroir/focus et réduction des animations. Aucun pageerror. Aucun appel rêve/voix ou écriture Notion testé ou lancé. Contrôle automatique : build OK.

### 9.3 Critères d’acceptation globaux

### Vérification lot 2 — 2026-10-12

Notion lu sans écriture : 14 quotes, 88 paragraphes, 6 titres, 2 images, 3 éléments de liste, 1 callout (3 enfants) et 1 divider. Comparaison navigateur/API : 106 blocs textuels non vides identiques, mise en forme et liens conservés, 2 images et liste rendues. Fonds sidebar `rgb(255,255,255)` et `rgb(0,0,0)` vérifiés ; texte identique jour/nuit, nuit persistée, porte avec retour exact, mobile sans débordement, aucun pageerror. Les commentaires répondent 403 `restricted_resource`. Cinq tests unitaires ajoutés couvrent fidélité, extrait ambigu, confidentialité, destinations/cycles et URL sûres ; parcours callout lié testé avec fixture, pas une page réelle ajoutée. Aucun appel IA ou écriture Notion. Le test éditorial réel après ajout reste à faire.

- [x] Les comportements partiels sont distingués des fonctionnalités présentes.
- [x] Les commandes documentées correspondent aux scripts disponibles.
- [x] Aucun secret n’est documenté.
- [x] Les tests existants réussissent.
- [ ] Lint sans erreur.
- [ ] Vérification actuelle de tous les parcours avec les vrais services.
- [ ] Confidentialité et sécurité adaptées à une publication publique.

## 10. Déploiement et exploitation

| Environnement | URL | État |
|---|---|---|
| Local Lovable | http://localhost:8080 | Serveur fourni par l’environnement |
| Preview | URL de la section 3 | Disponible dans le projet ; accès externe non retesté |
| URL publiée fournie | https://billets-ouverts.lovable.app | Version déployée et accès externe non contrôlés ici |

Aucune publication déclenchée pendant cette mise à jour ; publication via Lovable uniquement après décision explicite. Self-hosting Coolify envisagé, non mis en place (voir 7.7). Aucune migration à appliquer. Rollback, monitoring de production, sauvegardes et responsable d’astreinte : non définis/vérifiés. Le stockage local n’est pas une sauvegarde partagée. Les journaux Lovable sont des signaux de développement, pas un service d’exploitation prouvé.

## 11. État actuel, limites et suite

### 11.1 Stable dans le code actuel

Article Notion structuré avec secours, couverture GIF, panneaux liés, avis et file locale, cadre jour/nuit et actions minimales ; fil personnel avec recherche/suppression/retour/sélection. Callout à retournement et deux portes ; glaçons d’exemple en HTML/CSS et rêve OpenRouter avec écoute Gradium implémentée. Formats journalistiques retirés, original conservé. Organique IA créée, mais aucun réglage Notion exécuté.

### 11.2 Partiel

Conservation des dialogues, variantes éditoriales, marginalia Notion, contexte des résonances Notion et modération du texte réel. Les relations Résonances et Contributions étaient vides lors de la vérification précédente ; leur état distant n’a pas été relu aujourd’hui.

### 11.3 Bugs et dette connus

| Sujet | Impact | Contournement / prochaine vérification |
|---|---|---|
| `n is not a function`, signalé auparavant | Écran vide possible | Non reproduit ; modifications défensives, résolution définitive non prouvée |
| Lint en échec | Qualité / automatisation | Session de correction distincte, pas de changement de code ici |
| Anciens avis positionnels | Les avis antérieurs en pN ne sont pas remappés arbitrairement | Les nouveaux avis Notion utilisent les IDs stables des blocs ; secours et modération restent positionnels |
| Notes Notion et fragments | Commentaires refusés ; repli sans lignes actuelles | Trois repères approuvés, activation reportée ; notes de secours non affichées sur le billet Notion |
| Appels réseau du dialogue | Certains rejets peuvent laisser un état occupé | Tester les exceptions et les limites Zod |
| Consentement annoncé / non réalisé | Attente trompeuse sur la conservation | Clarifier le texte ou implémenter le choix dans une future demande |

### 11.4 Prochaines étapes / arbitrages actuels

Lots 1–3 réalisés ; callout lié et deuxième séparateur ajoutés par Ulrich puis testés, mondes jour/nuit et activation du rêve réalisés. Ne pas reprendre les anciennes attentes des lots 2/3 comme des blocages actuels. Organique IA a été créée sur demande explicite ; son branchement reste à demander/valider. Les usages des trois repères restent différés. La suite nécessite validation de l’expérience actuelle, vérification IA/voix/quota et arbitrage sécurité/coûts ; lot 6 et Coolify ne sont pas réalisés. Pas de nouvel ajout Notion, de branchement ou de déploiement pendant cette tâche.

### 11.5 Questions ouvertes

- Quelle fiche et quelles relations utiliser dans « Applications générées » ? La synchronisation exige une résolution réelle.
- Quel dépôt GitHub, quelle date de lancement et quelle version de release afficher ? Non vérifiés.
- Faut-il réellement conserver les dialogues et publier des contributions partagées ? Cela change la portée du prototype.
- Temps de développement, coûts et ressenti d’Ulrich : à confirmer auprès du responsable, sans estimation inventée.

## 12. Learnings, obstacles et métriques

### 12.1 Learnings réutilisables

Lire les relations réellement présentes plutôt que remplir les onglets avec des exemples ; conserver l’URL originale du GIF ; distinguer jauge simulée et contrôle budgétaire ; une interface de consentement ne prouve pas la rétention.

### 12.2 Obstacles rencontrés

Connexion Notion initiale remplacée par l’accès direct ; erreur React minifiée non reproduite ; fonctionnalités de démonstration confondues avec contenu réel. Voir [STORY.md](STORY.md) pour le contexte et les inconnues.

### 12.3 Métriques clés

| Métrique | Valeur / définition | Source / date |
|---|---|---|
| Routes de contenu | 2 | Code relu le 2026-10-12 |
| Tests | 27 réussis dans 6 fichiers | Vitest, 2026-10-13 à 09:33 UTC |
| Lint | 189 erreurs, 6 avertissements | ESLint, 2026-10-12 |
| Passages Notion | 105 observés lors de la précédente session ; non recomptés aujourd’hui | Vérification rapportée du 2026-10-11 |
| Budget | Initial 4,20 $, jauge 30 $ ; aucune dépense réelle déduite | `store.ts`, `Dialogue.tsx` |
| Usage, coût réel, durée de développement | Non mesurés / à confirmer | Aucun rapport vérifié |

### 12.4 Hypothèses à tester

Le panneau préserve-t-il l’attention ? Le dialogue apporte-t-il davantage qu’une relecture ? Les contributions sont-elles comprises comme locales ? Aucun de ces effets produit n’a été mesuré.

## 13. Prompt de régénération

> **Version du prompt :** instantané documentaire 2026-10-13 · **Aligné sur :** code actuel relu et décisions récentes (pas `c0c31ea` seul) · Aucun secret ni ressource privée indispensable.

```text
Construis « Billets ouverts », un prototype français de lecture immersive d’un essai sur le cinéma et le web. Public : lecteurs et contributeurs. Objectif : lire, réagir et prolonger le texte sans surcharger la page. Ce n’est ni un réseau social ni un service de production.

STACK
React 19, TanStack Start v1 et TanStack Router, Query pour le chargement, TypeScript, Vite, Tailwind v4 avec tokens sémantiques, primitives Radix/shadcn. Routes / (billet) et /moderation (file locale publique), métadonnées françaises propres à chacune. Runtime serveur compatible Worker. Pas de comptes, pas de Cloud, pas de base SQL.

INTERFACE
En-tête exact « Billet ouvert - une expérimentation de lecture immersive ». Titre « Et si… le cinéma embrassait le web ? », couverture Notion sous le titre sans convertir le GIF. Playfair Display / Roboto / Oswald. Bleu #1e73be, accents #e06f0d / #dd9933 / #d3347b définis en tokens, fonds clairs et gris. Colonne de lecture et marge desktop, panneau inférieur pour les notes mobiles. Ne pas remettre le surtitre orange, la capsule Notion, la généalogie/modération ni les versions dans le menu du haut. Bouton « Autour du billet » ouvrant Carnet, Contributeurs, Digressions, Résonances ; généalogie et modération en pied de page. Respecter navigation clavier, libellés accessibles, aria-expanded et réduction des animations.

LOT 1 LIRE/GARDER/RÊVER
Cadre partagé autour des routes : sidebar gauche 25 % avec largeur bornée, tiroir mobile ; GIF cloud-vagues le jour, comet-arbre la nuit, pleine largeur depuis le haut sans marges ni bouton Pause. Reduced-motion remplace l’animation par une image fixe extraite ; médias cachés démontés. Aucun slogan permanent sous le GIF ; poésie au survol/focus. Bouton Information à droite du menu persistant avec présentation du projet. Jour par défaut, bascule volontaire, jamais selon heure ou thème système. Dosages quiet/interactive, connexion explicitement simulée ; préférences en localStorage billets-ouverts-reader-v1 après hydration. Fil personnel sans traces d’exemple, passages et mots-clés locaux avec recherche/suppression/retour. En interactif seulement, petit signe + pour déplier les actions sous un passage ; icônes nommées et formulaires à la demande. Un callout préparé et deux portes en mâchoire verticales dans le secours, pas de 3D. Les maquettes historiques sont remplacées par les mondes décrits ci-dessous. Retour position exacte et focus au déclencheur. Ne pas modifier Notion ou les paragraphes ; lots suivants soumis à validation.

GRAMMAIRE NOTION, CONTRAT CONSERVÉ
Sidebar fond blanc pur #FFFFFF le jour et noir pur #000000 la nuit, aucune teinte. Rendre Notion dès le HTML initial avec modèle browser-safe : blocs stables, spans, liens sûrs, annotations typographiques, citations, listes, images, enfants. Pagination, récursion bornée (8 niveaux, 800 blocs), original jamais modifié par insertion de marqueurs. Dividers deviennent portes ; les deux ouvrent le même monde selon jour/nuit. Charger le corps d'une page liée au callout après geste : revalider côté serveur le bloc dans le pilote et sa cible explicite, refuser cible arbitraire ou billet lui-même ; callouts imbriqués inertes. Fragments : seul préfixe billet-fragment: suivi de JSON extrait/motCle/lien est public, aucune identité ; extrait exact unique requis. Commentaires 403 sur le pilote actuel ; repli relation Repères éditoriaux avec Bloc, Extrait exact, Mot-clé, Lien. Callout lié et deuxième séparateur ajoutés par Ulrich, testés précédemment : retourner le bloc sur place puis agrandir au-dessus de la colonne de droite, sidebar desktop intacte ; page liée entière, retour et focus. Trois repères validés (Distribution, Réglementation, Expérience), interaction reportée. Toute nouvelle écriture Notion exige un accord distinct. Avis Notion utilisent IDs des blocs ; ne remapper aucun ancien avis positionnel au hasard. Lots suivants soumis à validation.

INTERACTIONS CONSERVÉES
1. Quatre avis par passage : parle, nuancer, conteste, question. Un avis remplace le précédent ; compteurs après réaction, base de démonstration explicite et trait marginal.
2. Champ facultatif « Pourquoi ? », envoi dans une file locale, confirmation « Merci, contribution en attente de modération ».
3. Tangente : dialogue amorcé ou proposition locale soumise à modération.
4. Digressions fermées par défaut : annotations séparées sur extrait exact unique pour Notion ; marqueurs [[id|fragment]] seulement dans le secours historique.
5. Marginalia de démonstration : écho, contrepoint, prolongement, source/auteur/année/langue, marge desktop et panneau mobile. Ne pas prétendre importer des marginalia Notion non intégrées.
6. Texte original uniquement ; aucun format journalistique ou sélecteur de variantes.
7. Dialogue depuis les passages/sections, choix de consentement, texte ou voix, repli textuel. Dans cet instantané, seul le choix est persisté, aucun transcript : documenter l’écart et ne pas présenter la conservation comme réalisée. Jauge illustrative 4,20 $ initial / 30 $, pas de plafond réel ni reset mensuel.
8. Généalogie de démonstration + tangentes locales approuvées.
9. Formulaire note/commentaire/résonance/tangente ; texte, nom/pseudonyme, URL requise pour résonance, e-mail facultatif non persisté dans cet instantané, acceptation licence et modération. Licence CC BY-NC-SA 4.0.
10. /moderation permet d’approuver/rejeter la file du même navigateur, sans rôle admin. Tableau d’avis fictif dans cet instantané : ne pas le présenter comme modération complète du texte Notion.

MONDES ET IA, ÉTAT ACTUEL
Jour : 15 phrases-glaçons sans attribution, dérive CSS et récolte en citation ; aucune base Citations lue, aucune 3D. Nuit : choisir explicitement 1 à 5 traces puis lancer le dé ; transmettre seulement leurs textes, 1 200 caractères max chacun. generateDream valide 1–5 textes côté serveur et appelle OpenRouter avec DREAM_AI (ai-config.ts) : openai/gpt-4o-mini, température 0.9, max_tokens 700. Prompt exact : « À partir des traces sélectionnées, écris en français un rêve bref, sensoriel et délicatement absurde. Métamorphose les idées plutôt que les résumer. Une comète rencontre la Terre et fait naître un arbre. Traverse une branche comme un sillon de lumière. Ne présente aucune invention comme une citation authentique. Écris entre 150 et 250 mots, en prose, sans titre, sans liste, sans guillemets de citation. » Objectif mots non vérifié à la sortie. Compter seulement les succès via billets-ouverts-dreams {day UTC,n}, plafond local 3/jour/appareil, contournable et non serveur. Rêve non sauvegardé, écoute Gradium après geste, arrêt audio à la fermeture ; erreurs/clé absente visibles. Pas de modèle de secours automatique.
Organique IA existe avec usages reve.nuit et dialogue.passage, mais ne pilote rien ; modèle et prompt dialogue restent séparés dans api.functions.ts. Ne pas annoncer lecture distante ni centralisation complète. Futur branchement Notion validé + fallback en dur à décider. Ne jamais stocker les clés dans Notion.

DONNÉES
Fournir un essai français de secours d’environ 1 200 mots en cinq sections, passages identifiés, quatre digressions, environ six notes et des variantes de démonstration. localStorage billets-ouverts-v1 : myAvis (passage→réaction), queue (id UUID de contribution, kind, passageId?, text, url?, name?, status pending/approved/rejected, createdAt), consent boolean/null, spent nombre, traces (id, kind passage/mot-clé/citation, passageId, text, excerpt, createdAt, selected?), tracesVersion 2. Fil initial vide, compatibilité legacy sans sélection automatique, recherche sans accents/casse, dédoublonnage par kind/passage/texte normalisé, suppression et retour au bloc ; citations glaçons sans bloc original. Pas d’expiration, d’export ou de synchronisation. Messages React en mémoire. Nouveaux avis/retours Notion sur IDs stables ; signaler le risque des anciens IDs positionnels du secours et ne pas remapper au hasard.

NOTION
Fonctions serveur uniquement, clé NOTION_API_KEY, accès direct api.notion.com avec Notion-Version 2025-09-03, jamais gateway. Page du billet 3f651168-2fc3-8163-9bc3-f108577ca8b8 configurable dans le code. Charger page, propriété « image couverture » (url ou files externe/uploadé), blocs paginés paragraphes/quotes/headings, relations explicites Digressions, Résonances, Carnet, Versions et contributeurs directs ou Contributions→Contributeur. Conserver les URL GIF originales. Retourner les crédits seulement si « Consentement crédits » est true, avec Nom affiché, Rôle, Lien public, jamais coordonnées privées. Ne pas inventer les relations vides. Cache Query 60 secondes. Clé absente/échec : article de secours. Sans accès à cette page, le secours rend le clone utilisable.

DIALOGUE ET VOIX
OpenRouter POST /api/v1/chat/completions avec OPENROUTER_API_KEY, modèle openai/gpt-4o-mini. Prompt français réflexif, deux à cinq phrases, strictement passage + carnet + résonances approuvées de la file locale ; résonances Notion du panneau non envoyées dans cet instantané. Deepgram POST /v1/listen?model=nova-2&language=fr&smart_format=true, DEEPGRAM_API_KEY ; MediaRecorder, traitement après arrêt, pas de streaming. Gradium POST https://eu.api.gradium.ai/api/post/speech/tts, GRADIUM_API_KEY, GRADIUM_VOICE_ID facultatif, WAV/base64. Clés absentes : état indisponible clair, jamais valeurs privées côté navigateur. Les prestataires reçoivent messages/audio même si la conversation est éphémère localement ; ne pas affirmer leur rétention.

VALIDATION ET LIVRABLES
Zod côté serveur : passage 8 000 caractères max, contexte 12 000, 30 messages max de 4 000 caractères, audio base64 15 000 000 caractères max, TTS 3 000. Fonctions internes via createServerFn, pas de Node-only dans les handlers. Aucun secret en dur. Modules : données de secours, store, fonctions API, utilitaire browser-safe de propriétés Notion, composants Passage/Dialogue/Contribute/RelatedPanel. Fournir README, STORY, CHANGELOG, variables documentées sans valeurs et tests pour extraction GIF, consentement crédits et routes. Scripts Bun/Vite dev, build, preview, lint, test. Déploiement Lovable non déclenché sans demande. Coolify est envisagé mais adaptateur de production, conteneur, médias et secrets doivent être validés ; aucune recette prête à déployer revendiquée. Lire AGENTS et ne pas importer les fonctions anciennes de Cursor comme nouvelle direction.

ACCEPTATION
L’article s’ouvre sans clé ; GIF d’origine conservé ; avis remplaçable et file locale persistante ; panneau et retour à l’original fonctionnels ; profils sans consentement exclus ; voies d’erreur visibles ; aucun secret client. Distinguer dans la documentation les comportements réellement testés, fictifs et incomplets. Ne pas ajouter comptes, paiements, écritures Notion ou publication automatique pour combler les limites. Une mise en production nécessite une décision distincte sur sécurité, quotas et rétention.
```

### Contrôle du prompt

- [x] Autonome, sans renvoi indispensable à un document privé.
- [x] Produit, UX, fonctions, données, intégrations, architecture et cible couverts.
- [x] Obligations, non-objectifs et limites distingués.
- [x] Critères observables et aucun secret.
- [ ] Régénération dans un autre outil effectivement testée.

## 14. Synchronisation vers Notion — Applications générées

**Brouillon documentaire, non envoyé.** Ne pas écraser une propriété existante avec une absence ou une valeur à confirmer. Les champs typés et relations non résolus sont omis du payload ; résoudre les pages réelles avant toute écriture. Aucune relation fictive ni identifiant de responsable inventé.

<!-- NOTION_SYNC_START -->

```yaml
"Titre de l'app": "Billets ouverts"
"Description": "Lire, garder, rêver : sidebar jour/nuit, traces personnelles locales, callout retourné et page liée entière, deux portes, glaçons d’exemple HTML/CSS, rêve OpenRouter et écoute Gradium implémentés. Organique IA créée, non branchée. Trois repères validés, activation différée. Connexion simulée, pas de 3D. Ce brouillon n’a pas été envoyé."
"Type": "Prototype expérimental"
"État": "En cours de construction"
"Metrics clés": |-
  2026-10-13 : 2 routes de contenu ; 27 tests réussis dans 6 fichiers.
  Génération réelle rapportée dans la session précédente, voix complète et quota non revalidés.
  Organique IA : deux lignes créées, aucune lecture de réglages active.
  Preuve historique lot 2 : 106 blocs textuels non vides identiques à Notion ; sidebar blanc/noir, porte, reload et mobile vérifiés sans erreur.
  Lint historique : 189 erreurs, 6 avertissements, non rejoué. Usage, coûts et temps non mesurés.
"Learnings": |-
  Préserver l’URL GIF originale ; suivre les relations explicites Notion.
  Une décision de consentement ne prouve pas la conservation d’un transcript.
"Obstacles rencontrés": |-
  Connecteur Notion initial remplacé par une intégration directe.
  Erreur React minifiée non reproduite ; résolution définitive non prouvée.
  Versions, généalogie et marginalia encore partiellement fictives.
```

<!-- NOTION_SYNC_END -->

**Champs retenus hors payload :** Lien principal (preview section 3, accès externe à vérifier), Repo Github, Date de lancement, Versions alternatives déployées, Temps de développement (h), Coût en token, Responsable, Développeurs, Outils de création, PRDs pour applications et démonstrateurs, Tâches liées et Meetings liés. Les personnes/outils connus ne valent pas des relations Notion résolues. Aucun clone alternatif déployé vérifié.

**Corps recommandé de la fiche :** sections 1–2 pour le produit, 3 pour les liens, 4–6 pour les parcours/données, 7–10 pour la réalisation, 11–12 pour les limites/learnings, 13 pour la régénération ; ajouter les liens STORY et CHANGELOG.

**Référence de configuration à joindre, pas une relation déjà synchronisée :** Organique IA, data source `c66462b5-fbf0-404d-9527-1a96b864bdf5`, lignes `reve.nuit` et `dialogue.passage` ; base créée, aucun flux de réglages applicatif actif. Voir [NOTION-IA-BASE.md](NOTION-IA-BASE.md). Ce brouillon de fiche Applications générées n’a pas été envoyé ; la création antérieure d’Organique IA est une opération distincte.

## 15. Journal des évolutions de la mémoire

### 2026-10-13 — Consolidation et reprise Cursor

- État courant corrigé : traces version 2, callout réel, deux portes, mondes HTML/CSS, rêve OpenRouter et lecture Gradium implémentée ; ancienne maquette distinguée de l’activation ultérieure.
- Organique IA créée avec deux lignes, non branchée ; champs et identifiant documentés sans clés.
- Section 7.7 pour reprendre dans Cursor : contrats, fichiers, réglages encore dispersés, quotas locaux, pistes Notion utiles et limites Coolify.
- Prompt de régénération et brouillon Notion actualisés ; aucun envoi de fiche, aucune modification Cursor ou publication.
- Suite actuelle : 27 tests réussis, 6 fichiers ; preuves historiques séparées, voix/API/quota non rejoués.


### 2026-10-12 — Lot 2, grammaire Notion

- Sidebar blanc pur / noir pur ; lecture structurée et IDs stables, callout existant et divider réel.
- Fidélité des 106 blocs textuels non vides vérifiée face à Notion ; commentaires 403, repli préparé.
- Callout lié et fragments testables sans changement de code mais données réelles à approuver ; aucun envoi Notion ou publication.
- Prompt et brouillon de fiche alignés ; détails dans NOTION-LOT2-PROPOSAL.md.
- 16 tests dans 5 fichiers réussis ; build automatique OK. Commentaires refusés, données liées réelles encore à approuver.

### 2026-10-12 — Lot 1 lire/garder/rêver

- Cadre partagé, deux GIF, pause et images fixes, jour/nuit volontaire, dosages et connexion simulée.
- Traces et portes explicitement préparées ; Notion et paragraphes inchangés.
- Dix tests et parcours navigateur vérifiés ; lots suivants en attente de validation.
- Prompt et brouillon Notion actualisés ; aucun envoi externe.

### 2026-10-13 — Lecture et sidebar épurées

- GIF vérifiés chargés, pleine largeur au bord supérieur ; aucun bouton Pause. Réduction des animations conservée.
- Poésie au survol/focus et fenêtre Information à droite du menu ; texte de présentation initial proposé à partir du projet.
- Actions des passages repliées derrière + en interactif, absentes en lecture calme ; blocs Notion inchangés.
- Parcours réel : garder, mot-clé, réaction, replier, recherche sans accents, retour et suppression ; aucun pageerror. Onze tests ciblés réussis, build automatique OK.
- Aucune écriture Notion, implémentation de surlignages contextuels ou publication.

### 2026-10-12 — Référence `c0c31ea`

- **Produit/code décrit :** prototype existant et révision Notion/GIF/panneau ; aucune fonction modifiée dans cette session.
- **Raison :** adapter les trois modèles fournis à l’état réel, sans confondre brief et livraison.
- **Sections :** première rédaction des sections 1–16 ; STORY et CHANGELOG ajoutés.
- **Prompt de régénération :** oui, première version autonome incluant les limites.
- **Synchronisation Notion :** à faire après résolution des propriétés/relations ; pas exécutée.
- **Vérifications :** six tests réussis, lint en échec existant, build automatique réussi ; build/typecheck non exécutés manuellement. Liens locaux, rubriques et blocs des trois documents vérifiés.
- **Auteur / agent :** Lovable, à la demande d’Ulrich Fischer.

## 16. Maintenance de ce README

Mettre à jour après chaque évolution significative du produit, UX, données, intégrations, configuration, tests, déploiement ou statut. Actualiser aussi le prompt, le brouillon Notion, STORY et CHANGELOG sans réécrire l’historique factuel. Ne pas inventer temps, coûts, émotions, release ou succès de vérification. Responsable de validation des faits produit : Ulrich Fischer ; rédaction assistée par Lovable. Prochaine revue : prochaine évolution significative, sans date planifiée.
