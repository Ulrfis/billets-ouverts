# Changelog

Toutes les modifications notables de ce projet sont documentées ici.

Format basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/).

Aucune release numérotée ni publication n’a été vérifiée. Les changements applicatifs ci-dessous sont regroupés dans **Non publié**, à partir du code `c0c31ea` et de l’historique du 2026-10-11 ; les dates d’entrées ne constituent pas des dates de release. Première reconstitution documentaire : 2026-10-12. Les futures entrées préservent cet historique.

## [Non publié]

### Ajouté

#### 2026-10-13 — Mondes jour et nuit (lot 5, version calme)
- Derrière chaque séparateur-porte, un monde plein écran s'ouvre par-dessus la colonne de lecture : le jour, quinze citations-glaçons d'exemple dérivent lentement et peuvent être gardées dans le fil de traces ; la nuit, « La branche et l'écran » prépare le rêve à partir des traces choisies.
- Les traces gagnent un type « citation » et une sélection explicite pour le rêve (au plus 5), conservée localement ; la sidebar affiche le compte de traces choisies et une case « Choisir pour le rêve de nuit ».
- « Lancer le dé » reste une maquette honnête : le prompt exact et les limites (150-250 mots, 3 rêves par jour) sont affichés ; la génération réelle et la voix attendent la validation des services IA.
- Dix tests unitaires sur les traces (citation, recherche, sélection, compatibilité) ; vérification navigateur complète des deux mondes, récolte de citation, sélection et retour au texte, sans erreur.

#### 2026-10-12 — Documentation du projet
- README adapté au modèle MemoWays : identité, parcours, couverture réelle, données, architecture, commandes, preuves, limites, prompt de régénération et brouillon de synchronisation Notion.
- STORY adapté au modèle : genèse reconstituée, chronique, pivots, apprentissages, fenêtres ouvertes et contrats de session ; inconnues humaines et durées explicitement signalées.
- Ce CHANGELOG au format Keep a Changelog, sans version de release inventée.
- Règle de maintenance documentaire dans `AGENTS.md` et suivi des trois documents dans `roadmap.md`.

#### 2026-10-11 — Prototype initial et contenus liés
- Page de lecture `/` pour « Et si… le cinéma embrassait le web ? », essai français et matériaux fictifs de secours.
- Quatre avis par passage, commentaire facultatif « Pourquoi ? », propositions de tangentes et contributions de quatre types.
- Digressions dépliables, marginalia de démonstration, six lectures/versions et généalogie de démonstration complétée par les tangentes locales approuvées.
- File et décisions de modération dans `/moderation`, sans comptes ni protection de rôle.
- Store local `billets-ouverts-v1` pour avis, contributions, décision de consentement et estimation budgétaire.
- Dialogue texte via OpenRouter, enregistrement/transcription Deepgram et synthèse vocale Gradium, avec repli textuel pour les erreurs vocales gérées.
- Fonctions serveur pour les appels externes et l’état de configuration ; secrets uniquement côté serveur.
- Lecture directe du billet Notion et des relations Carnet, Digressions, Résonances, Versions et contributeurs autorisés ; pagination et secours en cas d’échec.
- Couverture du champ Notion « image couverture », conservant l’URL originale et l’animation GIF.
- Panneau « Autour du billet » : Carnet, Contributeurs, Digressions, Résonances, Versions.
- Loader Query pour le contenu Notion, métadonnées françaises et image sociale de couverture lorsqu’elle est disponible en HTTPS.
- Utilitaire de propriétés Notion et tests de couvertures URL/fichier/GIF et consentement des crédits ; test de route.

### Modifié

#### 2026-10-11 — Accès réel Notion et présentation
- Accès Notion par `NOTION_API_KEY` directement vers `api.notion.com`, version `2025-09-03`, remplaçant le connecteur envisagé initialement.
- En-tête : « Billet ouvert - une expérimentation de lecture immersive ».
- Versions déplacées hors du haut de page dans le panneau, sans suppression de leur fonctionnalité.
- Accès à la généalogie et à la modération déplacés en pied de page.
- Crédits de contributeurs limités aux champs publics des profils liés avec `Consentement crédits` actif.

### Supprimé

#### 2026-10-11 — Allègement de la lecture
- Surtitre orange « Billet ouvert » au-dessus du titre.
- Capsule « Contenu Notion ».
- Liste autonome de résonances dans le corps principal, remplacée par l’onglet du panneau.

### Corrigé

#### 2026-10-12 — Lecture sans distraction
- Menu supérieur persistant pendant le défilement, avec fond opaque dans les deux univers.
- Avis, enregistrement, mots-clés, notes et digressions applicatives entre paragraphes réservés au mode interactif, sans espace de commandes vide en lecture calme.
- Blocs et annotations éditoriales Notion conservés, ainsi que les séparateurs-portes ; aucune écriture Notion.

#### 2026-10-11 — Défenses et propriétés Notion
- Gestion défensive des effets / abonnements lors de l’investigation de `n is not a function`. L’incident n’a pas été reproduit : ces modifications ne prouvent pas une résolution définitive.
- Extraction dédiée des propriétés de couverture pour conserver les GIF externes et fichiers uploadés.

### Sécurité

#### 2026-10-11 — Confidentialité des clés et crédits
- Clés Notion, OpenRouter, Deepgram et Gradium utilisées côté serveur, pas exposées dans les documents ou le code client.
- Profils sans consentement de crédit exclus ; coordonnées privées non retournées.
- Ces mesures ne rendent pas `/moderation` privée et ne constituent pas un contrôle de quota des appels IA.

---


## 2026-10-13 — Carte retournée
### Added
- Le callout lié se retourne sur place puis s'agrandit sur la colonne de lecture, sans toucher à la colonne de gauche, et affiche la page liée en entier.
- Le lien d'un callout est aussi détecté dans sa dernière ligne.
- NOTION-CURSOR-AUDIT.md : état des lieux des ajouts Cursor dans Notion.
## Vérification documentaire — 2026-10-12

- Tests : **6 réussis dans 2 fichiers** (`bunx vitest run`).
- Lint : **189 erreurs, 6 avertissements**, dont 188 erreurs de formatage corrigeables automatiquement (`bun run lint`). Dette existante non corrigée par cette demande documentaire.
- Build : **contrôle automatique Lovable réussi** après rédaction, journal `build OK` à 18:48:28 UTC ; non exécuté manuellement. Typecheck séparé non exécuté manuellement.
- Documents : liens locaux, blocs Markdown, seize rubriques README et marqueurs Notion vérifiés ; aucun champ de modèle non remplacé.
- Aucun changement de fonctionnalité, publication ou synchronisation Notion pendant cette mise à jour.

## Limites documentées, non présentées comme livrées

- Conversation : décision de consentement persistée, transcript non sauvegardé malgré l’annonce de conservation.
- Voix : transcription après arrêt, pas en streaming ; parcours avec vrais services non rejoué cette session.
- Résonances Notion : affichées dans le panneau mais absentes du contexte du dialogue ; celui-ci utilise carnet et résonances locales approuvées.
- Versions et généalogie encore partiellement fictives ; marginalia Notion non intégrées.
- Tableau de modération basé sur le billet fictif, file locale publique et non partagée.
- Budget simulé, sans plafond serveur ni remise à zéro mensuelle.
- E-mail facultatif saisi mais non persisté, accord de licence non tracé par contribution.

Détails actuels : [README.md](README.md). Contexte et décisions : [STORY.md](STORY.md).

<!-- Maintenance : ajouter les évolutions sans réécrire les faits antérieurs. Employer Ajouté, Modifié, Déprécié, Supprimé, Corrigé, Sécurité selon le changement. Ne créer une section x.y.z datée qu’après attribution réelle d’une version ; 0.x pour prototype, 1.0 pour première release stable décidée. Ne jamais consigner secrets, coûts estimés comme réels ou succès non vérifiés. -->

## 2026-10-12 — Lot 1 lire/garder/rêver (non publié)

### Ajouté
- Cadre partagé, sidebar gauche et tiroir mobile, GIF nuage/vagues et comète/arbre fournis, pause et images fixes, reduced-motion et médias cachés démontés.
- Bascule volontaire jour/nuit, dosages sans distraction/interactif et connexion clairement simulée, préférences locales après hydration.
- Fil de quatre traces d’exemple, callout préparé et deux portes verticales avec retour à la position et au focus. Aucun changement Notion.
- Quatre tests de préférences ; dix tests au total réussis. Parcours Playwright avec le vrai billet et mobile vérifiés, aucun pageerror ; build automatique OK.

### Modifié
- Expérience recentrée sur le texte original ; formats journalistiques et onglet Versions retirés, avis et contributions conservés.
- README, prompt de régénération, brouillon Notion et STORY alignés sur le lot 1.

### Corrigé
- Débordement horizontal mobile et retour du focus du tiroir.

### Limites
- Traces, callout et rêve préparés : pas encore de récolte, grammaire Notion, glaçons 3D ou rêves/voix réels. Lots 2–6 en attente de validation du lot 1. Aucun sync ou publication effectué.

## 2026-10-12 — Lot 2, grammaire éditoriale Notion (sans publication)

### Ajouté
- Modèle de blocs browser-safe, enfants paginés avec récursion bornée, IDs stables, spans/annotations/liens sûrs, listes, citations et médias.
- Lecteur de callouts liés à la demande, contrôle serveur de la cible explicite du billet pilote, refus des liens arbitraires/cycles, callouts imbriqués inertes.
- Fragments éditoriaux explicitement désignés et repli relationnel Repères éditoriaux ; extrait exact ambigu ignoré, aucune identité de commentaire exposée.
- Proposition NOTION-LOT2-PROPOSAL.md : callout lié, second séparateur, repères, Citations et Prompts ; aucune création Notion.
- Tests de fidélité, confidentialité, autorisation et extraits ; test d’ouverture de callout lié avec fixture.

### Modifié
- Sidebar blanc pur (#FFFFFF) le jour, noir pur (#000000) la nuit, sans teinte.
- Rendu Notion initial structuré ; callout et divider réels remplacent les inserts de démonstration dans le billet réel. Original non modifié par marqueurs de digressions.
- Nouveaux avis Notion associés aux IDs des blocs, pas aux positions ; anciens avis non remappés arbitrairement.
- README, prompt de régénération, brouillon Notion et STORY alignés sur l’état réel.

### Vérifié / limites
- 106 blocs textuels non vides comparés au contenu API sans différence ; images/listes rendues, fonds exacts, nuit persistée, texte invariant et retour porte exact, mobile sans débordement et aucun pageerror.
- Commentaires Notion refusés (403 restricted_resource). Aucun callout lié ni repère réel créé ; test éditorial du pilote après ajout soumis à accord distinct.
- Suite complète : 16 tests réussis dans 5 fichiers ; contrôle automatique build OK. GIF comète et fond noir du tiroir vérifiés après chargement.
- Mondes et traces toujours préparés ; pas de collecte, 3D, rêve IA, voix nouvelle, écriture Notion ou publication dans ce lot.

## [Non publié] Lot 3
- Ajouté : garder un passage ou un mot-clé, chercher, supprimer et revenir au passage depuis le fil des traces (stockage local, doublons refusés).

### 2026-10-13 — Sidebar et commandes épurées

#### Modifié
- GIF jour/nuit pleine largeur depuis le haut de la sidebar ; bouton Pause supprimé, image fixe conservée en réduction des animations.
- Slogans permanents sous le GIF retirés ; poésie au survol ou au focus de l’image.
- En mode interactif, actions repliées derrière un petit + ; icônes Réagir, Garder et Mot-clé avec noms accessibles. Réactions/traces existantes ne forcent plus l’affichage.

#### Ajouté
- Bouton « Information » tout à droite du menu, ouvrant une présentation initiale du projet, des traces locales et de la connexion simulée.

#### Vérifié
- Parcours navigateur sur le billet réel : garder, mot-clé, réaction, replier, recherche sans accents, retour et suppression ; GIF jour/nuit chargés, poésie et Information visibles. Aucun pageerror ; onze tests ciblés réussis et build automatique OK.
- Blocs Notion et mode sans distraction conservés ; aucune écriture Notion, surlignage contextuel nouveau ou publication.

## 2026-10-13 — Rêve réel
- Le dé de la nuit génère un vrai rêve (OpenRouter, réglages en dur dans src/lib/ai-config.ts) et peut le lire à voix haute (Gradium) ; 3 rêves par jour par appareil.
- Proposition de base Notion « Organique IA » : NOTION-IA-BASE.md (non créée).
- Base Notion « Organique IA » créée à côté de « Réglages », 2 lignes initiales ; pas encore lue par l app.

## 2026-10-13 — Consolidation documentaire pour Cursor (sans nouvelle publication)

### Ajouté
- Guide de reprise README 7.7 : intentions « lire, garder, rêver », contrats UX, fichiers à examiner, limites et pistes de mutualisation Notion ; aucune synchronisation du code Cursor effectuée.
- Schéma et identifiant Organique IA documentés : data source `c66462b5-fbf0-404d-9527-1a96b864bdf5`, lignes `reve.nuit` et `dialogue.passage`, activation, modèles/secours, prompts, limites, voix et versions. Création confirmée précédemment, aucune lecture de réglages applicative.
- STORY complété avec fil personnel, callout retourné, deux portes, mondes HTML/CSS, activation IA, audit Cursor et objectif Coolify ; durées et preuves non inventées.

### Modifié
- README, prompt de régénération et brouillon de fiche Notion alignés sur les développements récents ; brouillon non envoyé. Les limites des anciennes étapes restent des faits historiques, pas l’état courant.
- Précision de l’entrée « Rêve réel » : la proposition a ensuite été créée sur demande ; « non créée » décrit l’étape initiale. La base n’est toujours pas branchée et aucun modèle de secours automatique ne s’exécute.
- Statut IA précisé : rêve `openai/gpt-4o-mini`, température 0,9, 700 jetons max ; 150–250 mots visés, non contrôlés en sortie ; 1–5 traces validées côté serveur, 1 200 caractères chacune. Seuls les textes choisis sont transmis.
- Plafond de trois rêves réussis/jour UTC/appareil décrit comme un compteur local contournable, pas un quota serveur ni une garantie de budget. Rêve et audio non sauvegardés ; lecture Gradium implémentée, parcours complet non revalidé ici.
- Réglages encore dispersés documentés : rêve dans `ai-config.ts`, dialogue dans `api.functions.ts`, limites UI dans `quotes.ts`, compteur dans `Worlds.tsx` ; pas de centralisation intégrale revendiquée.
- Repères Distribution / Réglementation / Expérience validés, usage contextuel reporté. Coolify envisagé, sans adaptateur/recette de production ou déploiement validés.

### Vérifié / limites
- `bunx vitest run` le 2026-10-13 à 09:33 UTC : **27 tests réussis, 6 fichiers**. Contrôles de sources séparés des essais navigateur/IA historiques.
- Aucun changement de fonctionnalité, nouvel appel payant IA/audio, écriture Notion, transfert Cursor ni publication pendant cette actualisation. Aucun lint, build ou typecheck manuel ; aucun résultat actuel de déploiement revendiqué.
- L’URL publiée fournie par le projet n’atteste pas de la parité avec le code actuel. Les services vocaux, erreurs réseau et refus après trois rêves restent à tester spécifiquement.
