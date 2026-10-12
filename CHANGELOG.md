# Changelog

Toutes les modifications notables de ce projet sont documentées ici.

Format basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/).

Aucune release numérotée ni publication n’a été vérifiée. Les changements applicatifs ci-dessous sont regroupés dans **Non publié**, à partir du code `c0c31ea` et de l’historique du 2026-10-11 ; les dates d’entrées ne constituent pas des dates de release. Première reconstitution documentaire : 2026-10-12. Les futures entrées préservent cet historique.

## [Non publié]

### Ajouté

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

#### 2026-10-11 — Défenses et propriétés Notion
- Gestion défensive des effets / abonnements lors de l’investigation de `n is not a function`. L’incident n’a pas été reproduit : ces modifications ne prouvent pas une résolution définitive.
- Extraction dédiée des propriétés de couverture pour conserver les GIF externes et fichiers uploadés.

### Sécurité

#### 2026-10-11 — Confidentialité des clés et crédits
- Clés Notion, OpenRouter, Deepgram et Gradium utilisées côté serveur, pas exposées dans les documents ou le code client.
- Profils sans consentement de crédit exclus ; coordonnées privées non retournées.
- Ces mesures ne rendent pas `/moderation` privée et ne constituent pas un contrôle de quota des appels IA.

---

## Vérification documentaire — 2026-10-12

- Tests : **6 réussis dans 2 fichiers** (`bunx vitest run`).
- Lint : **189 erreurs, 6 avertissements**, dont 188 erreurs de formatage corrigeables automatiquement (`bun run lint`). Dette existante non corrigée par cette demande documentaire.
- Build et typecheck : **non exécutés manuellement**, contrôles gérés par Lovable ; aucune preuve actuelle de succès revendiquée ici.
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
