# Billets ouverts — Development Story

> **Status**: 🟡 In Progress — prototype utilisable, intégrations et parcours partiellement vérifiés  
> **Creator**: Ulrich Fischer ; réalisation assistée par Lovable  
> **Started**: 2026-10-11 — développement spécifique, selon Git  
> **Last Updated**: 2026-10-12

Ce récit est reconstitué après développement à partir du brief, de la conversation disponible, de Git et du code. Les prompts reformulés sont signalés ; les durées, émotions et motivations personnelles non exprimées ne sont pas inventées. Référence analysée : `c0c31ea`.

---

## Genesis Block

### The Friction

Un article linéaire ne laisse pas facilement le lecteur réagir à un fragment, explorer une digression et contribuer tout en restant dans la lecture. C’est le problème exploré par le brief ; aucune anecdote personnelle d’Ulrich n’a été recueillie.

### The Conviction

L’hypothèse produit : un essai peut devenir un espace de lecture ouvert grâce à des interactions discrètes et des matériaux liés. Le cinéma et le web constituent le sujet du billet. Le « pourquoi moi / pourquoi maintenant » personnel reste à confirmer auprès d’Ulrich.

### Initial Vision

Résumé du brief initial, **pas une citation verbatim** :

```text
Créer un prototype UX français sur un seul billet, « Et si… le cinéma embrassait le web ? ». Dix interactions : avis, commentaire, tangente, digressions, marginalia, versions, dialogue texte/voix, généalogie, contribution, modération. Sans comptes ni Lovable Cloud ; localStorage. Notion pour le contenu, OpenRouter pour le dialogue, Deepgram pour la transcription, Gradium pour la synthèse. Fidélité des interactions avant finition visuelle. Playfair Display, Roboto, Oswald et palette bleue avec accents orange/or/rose.
```

Le plan approuvé est conservé dans `.lovable/plan/billets-ouverts-ux-prototype-2026-10-11.md`. Sa prescription du connecteur Notion a été remplacée ensuite par la clé d’intégration directe.

### Target Human

- **Archétype produit, non personne réelle :** lecteur d’essais sur le cinéma et le web.
- **Context:** lire sur ordinateur ou téléphone, puis approfondir un passage.
- **Struggle:** les liens et discussions interrompent souvent la lecture.
- **Success:** explorer, questionner et contribuer sans perdre le fil du texte.
- **How this helps:** dépliages et panneaux contextualisés ; l’efficacité réelle reste une hypothèse non mesurée.

### Tools Arsenal

| Tool | Role |
|---|---|
| Lovable | Construction et preview du prototype |
| Notion | Billet et matériaux éditoriaux liés |
| OpenRouter | Réponses textuelles |
| Deepgram / Gradium | Transcription / synthèse vocale |
| Vitest / Playwright | Tests ciblés / vérifications antérieures d’interactions |

---

## Feature Chronicle

Les changements applicatifs visibles dans Git sont datés du 2026-10-11. Les étapes ci-dessous sont regroupées par sujet ; la durée de chaque étape n’a pas été mesurée.

### 2026-10-11 — Prototype des dix interactions 🔷

**Intent**: rendre le billet participatif sans comptes ni infrastructure partagée.

**Prompt(s)**: brief initial résumé dans « Initial Vision » ; formulation exacte intégrale non reproduite.

**Tool**: Lovable.

**Outcome**:
- Routes `/` et `/moderation`, texte français de secours en cinq sections.
- Avis, commentaires, propositions, digressions, notes, variantes et généalogie.
- Store local `billets-ouverts-v1` : avis, file, consentement et estimation budgétaire.
- Dialogue et formulaires de contribution ; licence CC BY-NC-SA 4.0.

**Surprise**: l’interface couvre les dix idées, mais certains contenus et comportements restent de démonstration.

**Friction**: distinguer une modération locale d’un service partagé et une jauge illustrative d’un quota réel.

**Resolution**: contraintes documentées ; pas de comptes ou de stockage partagé ajoutés implicitement.

**Time**: à confirmer — aucune mesure disponible.

### 2026-10-11 — Dialogue et clés des services 🔷

**Intent**: permettre de questionner le passage par texte et voix.

**Prompt(s)**: demande de saisir les clés des différents services, puis activation des fonctionnalités ; résumé de conversation.

**Tool**: Lovable, OpenRouter, Deepgram, Gradium.

**Outcome**:
- Fonctions serveur `dialogueReply`, `transcribe`, `speak`, `getFeatureStatus` dans `src/lib/api.functions.ts`.
- Modèle `openai/gpt-4o-mini`, transcription française après enregistrement, TTS WAV.
- Choix de consentement, repli textuel pour les erreurs vocales gérées.

**Surprise**: le code persiste la décision, pas les messages, même lorsque l’écran annonce une conservation.

**Friction**: présence d’une clé ≠ parcours audio validé ; transcription après arrêt ≠ streaming.

**Resolution**: garder les clés côté serveur ; documenter les écarts sans annoncer une conservation ou un test vocal non prouvé.

**Time**: à confirmer — aucune mesure disponible.

### 2026-10-11 — Connexion au billet et aux relations Notion 🔷

**Intent**: remplacer le contenu arbitraire par le vrai billet et ses matériaux.

**Prompt(s)**: demandes de se connecter réellement aux bases et de saisir une clé d’intégration ; résumé, pas citation exacte.

**Tool**: Lovable et API Notion directe.

**Outcome**:
- Billet `3f651168-2fc3-8163-9bc3-f108577ca8b8` ; blocs paginés, titres et paragraphes.
- Relations Carnet, Digressions, Résonances, Versions ; version non vide utilisée pour Relecture.
- Ancres de digression injectées, secours fictif en cas d’absence/échec.
- 105 passages rapportés dans la vérification précédente, non recomptés le 2026-10-12.

**Surprise**: une cartographie de bases accessibles ne signifie pas qu’elles alimentent toutes l’écran ; les relations du billet font foi.

**Friction**: le connecteur initial n’était pas utilisable comme prévu ; différences d’identifiants database/data_source et accès aux secrets.

**Resolution**: clé `NOTION_API_KEY`, appels directs `api.notion.com`, version `2025-09-03`, décision enregistrée dans `AGENTS.md`.

**Time**: à confirmer — aucune mesure disponible.

### 2026-10-11 — Couverture GIF, panneau et en-tête simplifié 🔷

**Intent**: mieux présenter les catégories liées et désencombrer le haut du billet.

**Prompt(s)** — extraits exacts de la demande disponible :

> « Pas enlever la fonctionnalité, mais enlever de là. »  
> « image couverture »  
> « Dans un panneau »

**Tool**: Lovable.

**Outcome**:
- En-tête « Billet ouvert - une expérimentation de lecture immersive ».
- Suppression du surtitre orange et de la capsule Notion ; GIF original sous le titre.
- `RelatedPanel.tsx` : Carnet, Contributeurs, Digressions, Résonances, Versions.
- Généalogie et modération déplacées au pied de page.
- Extraction de couverture et filtre `Consentement crédits` dans un utilitaire testé ; champs de contact non retournés.
- Loader Query et métadonnées sociales propres au billet.

**Surprise**: onglet vide possible parce qu’une relation Notion est vide, sans panne du panneau.

**Friction**: respecter l’animation GIF et ne pas afficher un profil sans autorisation de crédit.

**Resolution**: conserver l’URL originale ; lire les profils liés autorisés uniquement. Couverture, panneau et retour à l’original vérifiés dans la session précédente.

**Time**: à confirmer — aucune mesure disponible.

### 2026-10-11 — Défenses contre l’erreur React signalée 🔹

**Intent**: investiguer l’écran vide `n is not a function`.

**Outcome**: erreur non reproduite localement ; ajustements défensifs des effets / abonnement du store rapportés. Cause racine et résolution définitive **non prouvées**.

**Time**: à confirmer — aucune mesure disponible.

### 2026-10-12 — Documentation MemoWays 🔹

**Intent**: ajouter et adapter les trois documents fournis dans leurs formats.

**Outcome**:
- README structuré en seize rubriques avec preuves, limites, prompt autonome et brouillon Notion.
- STORY reconstitué sans inventer de ressenti ni de durée ; CHANGELOG au format Keep a Changelog.
- Six tests réussis ; lint existant en échec (189 erreurs, 6 avertissements).
- Build automatique Lovable réussi après rédaction (18:48:28 UTC) ; structure et liens des trois documents contrôlés.
- Aucun changement fonctionnel, publication ou écriture Notion.

**Time**: non mesuré.

---

## Lot 1 — 2026-10-12, lire/garder/rêver 🔷

**Intent** : valider un lieu sensible, pas un média, avant les scènes et les dépenses IA.

**Outcome** : cadre partagé, sidebar/tiroir, GIF fournis jour et nuit, pause fixe, choix volontaires persistés et deux dosages. Formats journalistiques retirés ; callout et deux portes séparés du texte Notion. Le fil et le rêve sont préparés, explicitement non personnels/non générés.

**Verification** : 10 tests réussis ; Playwright avec billet réel, texte identique entre univers, reload, routes, portes avec retour exact, mobile sans débordement, focus et reduced-motion. Aucun pageerror. Build automatique OK.

**Friction / resolution** : débordement horizontal résolu par confinement de la colonne ; retour du focus du tiroir explicite. Cache serveur de développement interrompu rétabli, puis parcours rejoué entièrement.

**Time** : non mesuré. **Next** : validation du lot 1 avant le lot 2 ; aucune écriture Notion, IA de rêve, 3D ou publication.

---

## Pivots & Breakages

### 2026-10-12 — Menu persistant et lecture calme

**Intent** : garder le menu en haut et réserver les ajouts entre paragraphes au mode interactif.

**Outcome** : commandes, formulaires ouverts, marqueurs d’avis et digressions applicatives retirés en mode sans distraction ; blocs et annotations éditoriales Notion et portes conservés. Aucune écriture Notion.

**Verification** : essai sur le billet réel : menu à 0 px après défilement, texte identique entre modes, passage enregistré conservé, formulaire mot-clé absent en lecture calme, callout et porte présents ; aucun pageerror et 22 tests réussis.

## Lot 2 — 2026-10-12, grammaire Notion 🔷

**Intent** : passer au lot 2 à la demande d’Ulrich et rendre la sidebar totalement blanche le jour, noire la nuit, sans teinte.

**Outcome** : lecture des blocs et enfants Notion, IDs stables, liens et typographie conservés, listes et images rendues. Le callout existant contient trois citations sans page liée ; le divider existant ouvre la porte. Les inserts fictifs restent seulement dans le secours. Lecteur de page liée contrôlé côté serveur, imbriqués inertes ; fragments par commentaire explicitement éditorial ou repli relationnel, extraits ambigus rejetés.

**Verification** : 106 blocs textuels non vides identiques à l’API Notion, fonds blanc/noir exacts, texte identique entre univers, reload, porte/retour et mobile sans débordement ; aucun pageerror. Tests ciblés de fidélité/confidentialité/autorisations réussis ; callout lié vérifiable avec fixture seulement.

**Friction / resolution** : commentaires refusés par Notion (`403 restricted_resource`) ; aucune note privée exposée, repli Repères éditoriaux proposé. Les ajouts réels du pilote, la page cible, Citations et Prompts sont proposés dans NOTION-LOT2-PROPOSAL.md, non créés.

**Time** : non mesuré. **Next** : accord distinct avant écritures Notion et test éditorial réel ; validation du lot 2 avant lot 3. Pas d’IA de rêve, 3D ou publication.

### 2026-10-11 — Connecteur Notion remplacé par l’intégration directe

**What broke / What changed**: le plan visait le connecteur ; l’application appelle finalement Notion avec une clé d’intégration serveur.

**Why**: la connexion du connecteur n’était pas exploitable comme prévu dans le projet ; l’utilisateur a demandé la clé et l’accès réel aux bases.

**What you learned**:
- Vérifier le chemin d’accès réel avant d’annoncer une intégration.
- Distinguer base accessible, relation renseignée et donnée affichée.

**Emotional state**: non recueilli ; aucun sentiment attribué à Ulrich.

### 2026-10-11 — Écran vide et erreur minifiée non reproduite

**What broke / What changed**: `n is not a function`, trace React minifiée signalée par l’utilisateur.

**Why**: cause inconnue ; un problème de cleanup a été envisagé mais non démontré.

**What you learned**: une correction défensive ne suffit pas à prouver qu’un incident est résolu ; demander le déclencheur si l’erreur revient.

**Emotional state**: non recueilli.

### 2026-10-12 — Audit : l’interface promet plus que la persistance

**What broke / What changed**: la documentation distingue désormais consentement, conservation effective et simulation.

**Why**: les messages vivent en mémoire ; `consent` et `spent` seuls sont persistés pour le dialogue.

**What you learned**: inspecter le flux des données, pas seulement les labels visibles. Les résonances liées affichées ne sont pas automatiquement du contexte IA.

**Emotional state**: non recueilli.

---

## Pulse Checks

### 2026-10-12 — État factuel, pas un ressenti attribué

**Energy level**: non recueilli.  
**Current doubt**: ressenti d’Ulrich non recueilli ; limites techniques listées ci-dessous.  
**Current satisfaction**: non recueillie.  
**If you stopped now, what would you regret?**: non recueilli.  
**One word for how this feels**: non recueilli.

Ces champs restent explicitement inconnus ; la demande documentaire n’exige pas d’interrompre le travail pour un entretien personnel.

---

## Insights Vault

- **2026-10-11 — Observation technique :** conserver l’URL originale permet de préserver le GIF sans reconversion.
- **2026-10-11 — Observation produit :** déplacer les variantes ne signifie pas supprimer la fonctionnalité.
- **2026-10-12 — Audit :** la donnée effectivement persistée doit primer sur l’annonce de conservation dans l’interface.
- **2026-10-12 — Audit :** ne pas présenter des compteurs fictifs, une file locale ou un budget simulé comme des métriques collectives.

Aucun de ces constats n’est présenté comme une citation personnelle d’Ulrich.

---

## Artifact Links

| Date | Type | Link/Location | Note |
|---|---|---|---|
| 2026-10-11 | Plan | `.lovable/plan/billets-ouverts-ux-prototype-2026-10-11.md` | Intention initiale ; Notion a évolué |
| 2026-10-11 | Code | `src/components/billet/RelatedPanel.tsx`, `src/lib/notion-properties.test.ts` | Panneau et extraction testée |
| 2026-10-12 | Preview | https://id-preview--00a5b37b-26c1-429d-abb8-0f07b490bbd4.lovable.app | Non publié ; accès externe non retesté |
| 2026-10-12 | Documentation | [README.md](README.md), [CHANGELOG.md](CHANGELOG.md) | Mémoire actuelle et historique |

Pas de capture durable ou vidéo livrée ; les captures temporaires d’une session ne sont pas des artefacts permanents du dépôt.

---

## Narrative Seeds

- « Pas enlever la fonctionnalité, mais enlever de là. » — Ulrich, au sujet des versions.
- « Dans un panneau » — choix de présentation des catégories liées.
- « Billet ouvert - une expérimentation de lecture immersive » — en-tête demandé.
- Observation d’audit, pas citation : relier des données n’est pas encore relier toutes les expériences.

---

## Story Synthesis Prompt

```text
Aide à écrire l’histoire de « Billets ouverts » à partir du STORY fourni.
Format : article de 800 à 1 200 mots, français, honnête, précis, humble.
1. Ouvrir sur la friction d’un article linéaire.
2. Exposer l’hypothèse de lecture ouverte, sans inventer de motivation personnelle.
3. Raconter le prototype puis le pivot vers les vrais contenus Notion.
4. Décrire le GIF, le panneau et le déplacement des versions.
5. Conserver les difficultés : erreur React non reproduite, données fictives, consentement non suivi de conservation, lint en échec.
6. Conclure par les apprentissages durables et les limites à arbitrer.
Utiliser seulement les citations attestées. Ne pas inventer temps, coûts, émotions, utilisateurs, succès commercial, publication ou vérification vocale. Distinguer intentions, réalisation et preuves. Les ressentis absents peuvent être mentionnés comme non recueillis, pas comblés.
```

---

## Open Windows 🪟

| Date | Description | Impact | Plan de fix / décision |
|---|---|---|---|
| 2026-10-11 | Erreur `n is not a function` non reproduite | Haut si récurrence | Reproduire avec le déclencheur exact ; fix définitif non affirmé |
| 2026-10-12 | Conservation du dialogue annoncée mais non implémentée | Haut | Arbitrer rétention réelle ou clarification de l’interface |
| 2026-10-12 | Résonances Notion absentes du contexte IA | Moyen | Définir quelles résonances validées doivent être transmises |
| 2026-10-12 | Variantes/généalogie fictives ; marginalia mobiles potentiellement décalées sur Notion | Moyen | Auditer les sources et identifiants avant intégration complète |
| 2026-10-12 | Modération locale publique, tableau d’avis fictif | Haut avant publication | Choisir la portée du service ; ne pas assimiler à une administration |
| 2026-10-12 | Budget simulé sans contrôle serveur ni reset | Haut avant publication IA | Décision spécifique sur quotas et coûts |
| 2026-10-12 | E-mail saisi non enregistré ; acceptation non tracée par contribution | Moyen | Clarifier l’usage ou adapter la collecte sur demande |
| 2026-10-12 | Anciens avis positionnels | Moyen | Lot 2 : nouveaux avis Notion sur IDs stables ; aucun remappage arbitraire des anciens avis, modération toujours basée sur le secours |
| 2026-10-12 | Commentaires Notion refusés et aucun callout lié du pilote | Bloque le test éditorial réel du lot 2 | Repli et ajouts proposés, attendent accord distinct avant écriture |
| 2026-10-12 | Lint : 189 erreurs, 6 avertissements | Moyen | Correction dédiée ; pas de reformatage global dans cette demande |
| 2026-10-12 | Exceptions réseau / limites IA non testées de bout en bout | Moyen | Tests dédiés avec services réels et erreurs |
| 2026-10-12 | Fiche/relations de synchronisation Notion inconnues | Bas | Résoudre les pages cibles avant toute écriture |

Ces sujets sont documentés, **pas ajoutés implicitement au périmètre de la présente demande**.

---

## Contrats de session (DBC)

### Dernière session — 2026-10-12, adaptation documentaire

**Préconditions vérifiées au départ :**
- [x] Modèles fournis et ancien README lus.
- [x] Code, architecture et historique disponibles examinés ; référence `c0c31ea`.
- [x] Limites du projet recensées.
- [ ] Build actuel prouvé au départ — journal d’observabilité absent ; non exécuté manuellement.
- [ ] État des branches externes vérifié — hors périmètre, aucune opération Git d’écriture.

**Postconditions de fin de session :**
- [x] README, STORY et CHANGELOG adaptés ; historique non réécrit.
- [x] Open Windows et résultats de qualité documentés.
- [x] Tests : 6 réussis, 2 fichiers.
- [x] Build automatique réussi après rédaction ; contrôle des liens et formats des trois documents réussi.
- [ ] Lint vert — échec existant, détail dans README.
- [ ] Build/typecheck exécutés manuellement — non, contrôles gérés par Lovable.
- [ ] Commit/push manuel — non effectué ; état Git géré par Lovable.
- [ ] Sync Notion / publication — non demandées, non effectuées.

---

## AI Instructions

### STORY.md MAINTENANCE PROTOCOL — Pragmatic Edition

1. Ajouter une entrée après chaque évolution significative, en distinguant majeure 🔷 et mineure 🔹 ; ne pas marquer « Complete » sans preuve adaptée.
2. Préserver l’historique. Indiquer date ISO, intention, résultat, outil, friction, résolution et durée seulement si mesurée ; sinon « non mesuré ».
3. Documenter erreurs/pivots et limites non corrigées dans Open Windows, sans affirmer une cause non démontrée.
4. Recueillir le ressenti du créateur uniquement lorsqu’approprié ; jamais l’inventer ni bloquer une demande indépendante pour remplir Pulse Checks.
5. Distinguer citations exactes, résumés de prompts et observations d’audit.
6. Référencer les artefacts durables ; ne jamais publier secrets, sessions ou liens authentifiés.
7. Revoir les contrats de session et fenêtres ouvertes au début ; noter les contrôles effectivement réalisés à la fin.
8. Mettre à jour Last Updated, README et CHANGELOG après changement significatif. Le README porte les faits actuels, ce fichier le récit, AGENTS les règles d’architecture.
9. Ne pas modifier Git manuellement pour satisfaire une checklist ; respecter sa gestion par Lovable. Builds/typechecks du sandbox sont gérés automatiquement, consigner les preuves disponibles et les contrôles non exécutés.
10. Ne pas transformer une dette documentée en demande de fonctionnalité ; demander un arbitrage lorsque nécessaire.
