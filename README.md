# Billets ouverts

> Un prototype de lecture immersive en français : lire un essai, réagir à ses passages, explorer ses prolongements et dialoguer avec le texte.
>
> **Type :** Prototype expérimental · **État :** En cours de construction, non publié · **Version :** instantané `c0c31ea` (sans release numérotée) · **Mémoire vérifiée le :** 2026-10-12 · **Commit analysé :** `c0c31ea`

## 1. Fiche d’identité

| Élément | Valeur actuelle |
|---|---|
| Nom | Billets ouverts |
| Problème exploré | Transformer un article linéaire en expérience de lecture participative sans surcharger le texte |
| Public principal | Lecteurs d’essais sur le cinéma et le web ; contributeurs au billet |
| Responsable du projet | Ulrich Fischer, demandeur du prototype ; relation Notion non résolue |
| Agent / outil de création | Lovable |
| Type / état | Prototype expérimental / En cours de construction |
| Version documentée | Code `c0c31ea` ; aucun tag de release vérifié |
| Début du développement spécifique | 2026-10-11, d’après l’historique Git ; template antérieur du 2026-10-07 |
| Date de lancement public | Aucun lancement public constaté |
| Dernière vérification documentaire | 2026-10-12 |

## 2. Vue d’ensemble produit

### 2.1 Proposition de valeur

L’application ouvre l’essai « Et si… le cinéma embrassait le web ? » à des lectures alternatives et à des contributions passage par passage. Les lecteurs peuvent donner un avis, écrire un commentaire, proposer une tangente et consulter les matériaux liés. Un dialogue textuel ou vocal explore le passage à partir de matériaux limités. Le prototype privilégie la fidélité des interactions ; il ne constitue pas un service collaboratif de production.

### 2.2 Objectifs actuels

- **Principal :** expérimenter dix interactions de lecture sur une page d’article.
- **Pour le lecteur :** rester dans le texte tout en pouvant le prolonger.
- **Pour le projet :** tester l’intérêt d’un billet ouvert alimenté par Notion.
- **Critère prioritaire :** des parcours utilisables avec un retour clair, sans inventer de persistance partagée.

### 2.3 Périmètre actuel

**Inclus :** article, couverture GIF, avis, commentaires, tangentes, digressions, marginalia de démonstration, versions, dialogue, généalogie, contribution, modération locale et panneau « Autour du billet ».

**Hors périmètre :** comptes, Lovable Cloud, base partagée, publication automatique des contributions dans Notion, véritable administration sécurisée, paiement et suivi budgétaire comptable.

### 2.4 Contexte et genèse

Le brief demandait une page française avec dix interactions, sans comptes, avec un stockage local. Le premier texte fictif a été conservé comme secours. La connexion Notion a ensuite permis de lire le billet réel et ses relations. Une révision a simplifié l’en-tête, déplacé les versions et regroupé les matériaux liés dans un panneau. Voir [STORY.md](STORY.md).

## 3. Sources de vérité et liens

| Source | Lien ou chemin | Rôle / fraîcheur |
|---|---|---|
| Production | Non publiée | Aucune URL publique de production |
| Preview | https://id-preview--00a5b37b-26c1-429d-abb8-0f07b490bbd4.lovable.app | URL fournie par le projet ; accès externe non retesté le 2026-10-12 |
| Dépôt GitHub | À confirmer — aucune URL GitHub vérifiée | Ne pas confondre stockage Git interne et GitHub |
| Brief approuvé | [.lovable/plan/billets-ouverts-ux-prototype-2026-10-11.md](.lovable/plan/billets-ouverts-ux-prototype-2026-10-11.md) | Intention initiale ; détails Notion dépassés |
| Architecture | [AGENTS.md](AGENTS.md) | Règles actuelles |
| Design | [src/styles.css](src/styles.css) | Tokens et typographie |
| Historique / récit | [CHANGELOG.md](CHANGELOG.md), [STORY.md](STORY.md) | Créés le 2026-10-12 |
| Fiche « Applications générées » | À confirmer — fiche non identifiée | Aucune synchronisation effectuée par cette mise à jour |
| Vérifications | Section 9 | Résultats datés, sans secrets |

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
| Matériaux et versions | « Autour du billet » → onglet → version → retour à l’original | Implémenté, versions partiellement fictives | `src/components/billet/RelatedPanel.tsx`, `src/routes/index.tsx` |
| Dialogue | Passage → consentement → question → réponse ; voix facultative | Partiel, services non retestés de bout en bout cette session | `src/components/billet/Dialogue.tsx`, `src/lib/api.functions.ts` |
| Contribution / modération | Formulaire → file locale → `/moderation` → approuver/rejeter | Implémenté, non partagé | `src/components/billet/Contribute.tsx`, `src/routes/moderation.tsx` |

### 4.3 Écrans, routes et états importants

| Route | Rôle | États | Accès | Fichier |
|---|---|---|---|---|
| `/` | Billet et panneaux | Notion / secours, version originale / alternative, panneaux fermés / ouverts | Public | `src/routes/index.tsx` |
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

- Lecture de type magazine, colonne centrale et marge pour les notes sur grand écran.
- Playfair Display pour les titres, Roboto pour le corps, Oswald pour les petits labels ; couleurs et états dans `src/styles.css`.
- En-tête : « Billet ouvert - une expérimentation de lecture immersive ».
- GIF sous le titre ; pas de surtitre orange ni de badge « Contenu Notion ».
- Carnet, contributeurs, digressions, résonances et versions dans un panneau ; généalogie et modération en pied de page.
- Notes de démonstration dans la marge à partir du breakpoint `lg`, panneau inférieur sur petit écran ; voir la limite Notion en section 11.
- Boutons de digression avec `aria-expanded`, formulaires étiquetés, primitives Radix, animations réduites selon la préférence système. Conformité AA complète non auditée.

## 5. Fonctionnalités et règles métier

### 5.1 Couverture fonctionnelle

| Fonction | État | Limites / preuve |
|---|---|---|
| Avis | Implémenté | Quatre réactions ; une réaction par passage remplace l’ancienne ; compteurs fictifs + avis local (`Passage.tsx`, `store.ts`) |
| Commentaire | Implémenté | « Pourquoi ? » facultatif, confirmation et file locale (`Passage.tsx`) |
| Tangente | Implémenté localement | Dialogue amorcé ou proposition ; approbation visible dans la généalogie locale, pas de publication distante |
| Digressions | Implémenté | Ancres `[[dN|fragment]]`, dépliage fermé par défaut ; données Notion liées ou secours |
| Marginalia | Partiel | Notes fictives ; pas de chargement de la base Marginalia Notion |
| Versions | Partiel | Six choix ; seule la première version Notion avec paragraphes alimente « Relecture », autres variantes fictives |
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
| Billet | Titre, date, couverture, sections et paragraphes | Notion, page `3f651168-2fc3-8163-9bc3-f108577ca8b8` ; secours `src/data/billet.ts` | Contenu éditorial |
| Matériaux liés | Carnet, digressions, résonances, contributeurs, versions | Relations explicites du billet Notion | Crédits publics filtrés |
| `myAvis` | Dictionnaire passage → réaction | localStorage | Préférences de lecture |
| `queue` | `id`, `kind`, `passageId?`, `text`, `url?`, `name?`, `status`, `createdAt` | localStorage | Texte et pseudonyme saisis |
| `consent` | `boolean` ou `null` | localStorage | Décision du lecteur |
| `spent` | Nombre, initialisé à `4.2` | localStorage | Estimation illustrative |
| Messages / audio | Historique en mémoire React, enregistrement envoyé pour transcription | Navigateur et prestataires | Contenu de conversation / voix |

Pas de schéma SQL, migration ou base partagée. Clé locale : `billets-ouverts-v1`.

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

Notion est lu, puis converti en sections et ancres. Les contributions produisent une confirmation et des objets locaux identifiés par UUID, non des utilisateurs UUID. Les passages sont renumérotés `p1`, `p2`, etc. : un changement éditorial peut déplacer la correspondance avec les avis enregistrés. Les sorties IA sont du texte et éventuellement de l’audio, sans export de document ni écriture Notion.

### 6.4 Intégrations et contrats externes

| Service | Usage / contrat | Authentification côté serveur | Échec |
|---|---|---|---|
| Notion | Lecture `/v1/pages/{id}` et `/v1/blocks/{id}/children`, pagination ; version `2025-09-03` | `NOTION_API_KEY`, Bearer direct vers `api.notion.com` ; pas de gateway | Secours fictif pour l’ensemble du billet |
| OpenRouter | POST `/api/v1/chat/completions`, `openai/gpt-4o-mini` | `OPENROUTER_API_KEY`, Bearer | Message d’indisponibilité / erreur |
| Deepgram | POST `/v1/listen?model=nova-2&language=fr&smart_format=true` | `DEEPGRAM_API_KEY`, Token | Retour au texte pour les erreurs gérées |
| Gradium | POST `https://eu.api.gradium.ai/api/post/speech/tts`, WAV | `GRADIUM_API_KEY`, `x-api-key` | Retour au texte |

Preuve : `src/lib/api.functions.ts`. Les bases découvertes pendant l’intégration ne sont pas toutes consommées : le code actuel suit les relations du billet, pas une recherche globale des bases.

### 6.5 Confidentialité, sécurité et rétention

- Stockage local sans durée de rétention ni synchronisation ; effacement possible via les données du site dans le navigateur, sans bouton dédié.
- Consentement et coût restent enregistrés même dans le mode de conversation dit éphémère ; les messages restent en mémoire dans les deux modes.
- Le mode éphémère n’empêche pas le traitement des messages et de la voix par les prestataires ; leurs durées de rétention ne sont pas vérifiées.
- Secrets gérés dans Lovable / variables serveur ; aucune valeur à ajouter à ces documents.
- Validation Zod des entrées IA : passage ≤ 8 000 caractères, contexte ≤ 12 000, ≤ 30 messages de ≤ 4 000 caractères ; audio base64 ≤ 15 000 000 caractères ; TTS ≤ 3 000 caractères.
- Pas de contrôle de rôle, de limitation de fréquence ou de plafond budgétaire serveur spécifique observé. Une exposition publique exige un arbitrage de sécurité.

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
| Cible d’exécution | Lovable, runtime serveur compatible Worker | Publication non effectuée |

### 7.2 Flux principal

```text
Lecteur → / → loader + cache Query (60 s) → getNotionContent → API Notion
                   └→ article de secours si échec
Lecteur → avis / contribution → store → localStorage → modération locale
Lecteur → dialogue → fonction serveur → OpenRouter → texte
                  └→ Deepgram (audio entrant) / Gradium (audio sortant)
```

### 7.3 Structure du dépôt

```text
src/routes/                 # Billet, modération, layout racine
src/components/billet/      # Passage, Dialogue, Contribute, RelatedPanel
src/components/ui/          # Primitives d’interface
src/data/billet.ts          # Texte et données fictives de secours
src/lib/api.functions.ts    # Appels externes côté serveur
src/lib/store.ts            # État local du lecteur
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
| `OPENROUTER_API_KEY` | Dialogue | Serveur ; OpenRouter |
| `DEEPGRAM_API_KEY` | Transcription | Serveur ; Deepgram |
| `GRADIUM_API_KEY` | Synthèse vocale | Serveur ; Gradium |
| `GRADIUM_VOICE_ID` | Choix de voix facultatif | Serveur ; voix par défaut prévue dans le code |

`NOTION_PAGE_ID` du plan initial n’est pas utilisé : la page actuelle est fixée dans le code. Présence des secrets non réinspectée dans cette session documentaire.

### 8.4 Commandes usuelles

| Action | Commande existante | État de cette session |
|---|---|---|
| Développement | `bun run dev` | Serveur déjà géré par Lovable ; non redémarré |
| Lint | `bun run lint` | Exécuté, échec existant |
| Tests | `bunx vitest run` ou `bun run test` | Six tests réussis |
| Typecheck | Pas de script dédié | Non exécuté ; contrôles gérés par Lovable |
| Build | `bun run build` | Script présent, non exécuté manuellement |
| Preview de build | `bun run preview` | Non exécuté |
| Format | `bun run format` | Non exécuté ; éviter un reformatage global pour une demande documentaire |

## 9. Tests, qualité et preuves

### 9.1 Stratégie de test

Tests ciblés : couvertures URL/fichiers/GIF, consentement des crédits, route de base. Aucun test automatisé complet des dix interactions, du stockage ou des services vocaux. Les parcours IA nécessitent de vrais appels et une validation dédiée.

### 9.2 Vérifications de la dernière mise à jour

| Vérification | Méthode | Résultat | Date |
|---|---|---|---|
| Tests | `bunx vitest run` | Réussi : 2 fichiers, 6 tests | 2026-10-12 |
| Lint | `bun run lint` | Échec : 189 erreurs, 6 avertissements ; 188 erreurs de formatage corrigeables automatiquement, une erreur d’expression inutilisée | 2026-10-12 |
| Typecheck | Non exécuté | Interdit manuellement dans le sandbox ; aucun succès actuel revendiqué | 2026-10-12 |
| Build | Contrôle automatique Lovable | Réussi après rédaction : journal `build OK` à 18:48:28 UTC ; non exécuté manuellement | 2026-10-12 |
| Parcours / revue visuelle | Non rejoués | Documentation seule ; couverture, panneau et changement de version vérifiés dans la session précédente, pas une preuve actuelle IA | 2026-10-12 |
| Documentation | Contrôle des liens locaux, blocs Markdown, rubriques et marqueurs | Réussi : trois documents, seize rubriques README, marqueurs Notion présents, aucun champ de modèle non remplacé | 2026-10-12 |

### 9.3 Critères d’acceptation globaux

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
| Production | Aucune | Non publiée |

Publication via Lovable uniquement après décision explicite. Aucune migration à appliquer. Rollback, monitoring de production, sauvegardes et responsable d’astreinte : non définis/vérifiés. Le stockage local n’est pas une sauvegarde partagée. Les journaux Lovable sont des signaux de développement, pas un service d’exploitation prouvé.

## 11. État actuel, limites et suite

### 11.1 Stable dans le code actuel

Article Notion avec secours, extraction de couverture GIF, panneaux liés, avis et file locale, sélecteur de versions déplacé. Tests d’extraction et routage réussis.

### 11.2 Partiel

Conservation des dialogues, variantes éditoriales, marginalia Notion, contexte des résonances Notion et modération du texte réel. Les relations Résonances et Contributions étaient vides lors de la vérification précédente ; leur état distant n’a pas été relu aujourd’hui.

### 11.3 Bugs et dette connus

| Sujet | Impact | Contournement / prochaine vérification |
|---|---|---|
| `n is not a function`, signalé auparavant | Écran vide possible | Non reproduit ; modifications défensives, résolution définitive non prouvée |
| Lint en échec | Qualité / automatisation | Session de correction distincte, pas de changement de code ici |
| IDs de passages positionnels | Avis attachés à un autre passage après réorganisation | Stabiliser les identifiants avant usage durable |
| Notes mobiles fictives sur texte Notion | Associations potentiellement incorrectes | Audit des deux présentations, pas seulement de la marge desktop |
| Appels réseau du dialogue | Certains rejets peuvent laisser un état occupé | Tester les exceptions et les limites Zod |
| Consentement annoncé / non réalisé | Attente trompeuse sur la conservation | Clarifier le texte ou implémenter le choix dans une future demande |

### 11.4 Prochaines étapes décidées

La demande actuelle porte uniquement sur ces trois documents. Aucune nouvelle évolution fonctionnelle ou publication n’est décidée ; les points ci-dessus sont des sujets d’arbitrage, pas une promesse de livraison.

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
| Tests | 6 réussis dans 2 fichiers | Vitest, 2026-10-12 |
| Lint | 189 erreurs, 6 avertissements | ESLint, 2026-10-12 |
| Passages Notion | 105 observés lors de la précédente session ; non recomptés aujourd’hui | Vérification rapportée du 2026-10-11 |
| Budget | Initial 4,20 $, jauge 30 $ ; aucune dépense réelle déduite | `store.ts`, `Dialogue.tsx` |
| Usage, coût réel, durée de développement | Non mesurés / à confirmer | Aucun rapport vérifié |

### 12.4 Hypothèses à tester

Le panneau préserve-t-il l’attention ? Le dialogue apporte-t-il davantage qu’une relecture ? Les contributions sont-elles comprises comme locales ? Aucun de ces effets produit n’a été mesuré.

## 13. Prompt de régénération

> **Version du prompt :** instantané documentaire 2026-10-12 · **Aligné sur :** `c0c31ea` · Aucun secret ni ressource privée indispensable.

```text
Construis « Billets ouverts », un prototype français de lecture immersive d’un essai sur le cinéma et le web. Public : lecteurs et contributeurs. Objectif : lire, réagir et prolonger le texte sans surcharger la page. Ce n’est ni un réseau social ni un service de production.

STACK
React 19, TanStack Start v1 et TanStack Router, Query pour le chargement, TypeScript, Vite, Tailwind v4 avec tokens sémantiques, primitives Radix/shadcn. Routes / (billet) et /moderation (file locale publique), métadonnées françaises propres à chacune. Runtime serveur compatible Worker. Pas de comptes, pas de Cloud, pas de base SQL.

INTERFACE
En-tête exact « Billet ouvert - une expérimentation de lecture immersive ». Titre « Et si… le cinéma embrassait le web ? », couverture Notion sous le titre sans convertir le GIF. Playfair Display / Roboto / Oswald. Bleu #1e73be, accents #e06f0d / #dd9933 / #d3347b définis en tokens, fonds clairs et gris. Colonne de lecture et marge desktop, panneau inférieur pour les notes mobiles. Ne pas remettre le surtitre orange, la capsule Notion, la généalogie/modération ni les versions dans le menu du haut. Bouton « Autour du billet » ouvrant Carnet, Contributeurs, Digressions, Résonances, Versions ; généalogie et modération en pied de page. Respecter navigation clavier, libellés accessibles, aria-expanded et réduction des animations.

DIX INTERACTIONS
1. Quatre avis par passage : parle, nuancer, conteste, question. Un avis remplace le précédent ; compteurs après réaction, base de démonstration explicite et trait marginal.
2. Champ facultatif « Pourquoi ? », envoi dans une file locale, confirmation « Merci, contribution en attente de modération ».
3. Tangente : dialogue amorcé ou proposition locale soumise à modération.
4. Digressions fermées par défaut, ancres [[id|fragment]], bouton accessible et dépliage inline.
5. Marginalia de démonstration : écho, contrepoint, prolongement, source/auteur/année/langue, marge desktop et panneau mobile. Ne pas prétendre importer des marginalia Notion non intégrées.
6. Original, Brève, Grand format, Relecture, Variation étudiant en cinéma, Remix ; retour en un clic à l’original. Alternatives de démonstration, sauf première version Notion non vide utilisée pour Relecture.
7. Dialogue depuis les passages/sections, choix de consentement, texte ou voix, repli textuel. Dans cet instantané, seul le choix est persisté, aucun transcript : documenter l’écart et ne pas présenter la conservation comme réalisée. Jauge illustrative 4,20 $ initial / 30 $, pas de plafond réel ni reset mensuel.
8. Généalogie de démonstration + tangentes locales approuvées.
9. Formulaire note/commentaire/résonance/tangente ; texte, nom/pseudonyme, URL requise pour résonance, e-mail facultatif non persisté dans cet instantané, acceptation licence et modération. Licence CC BY-NC-SA 4.0.
10. /moderation permet d’approuver/rejeter la file du même navigateur, sans rôle admin. Tableau d’avis fictif dans cet instantané : ne pas le présenter comme modération complète du texte Notion.

DONNÉES
Fournir un essai français de secours d’environ 1 200 mots en cinq sections, passages identifiés, quatre digressions, environ six notes et des variantes de démonstration. localStorage billets-ouverts-v1 : myAvis (passage→réaction), queue (id UUID de contribution, kind, passageId?, text, url?, name?, status pending/approved/rejected, createdAt), consent boolean/null, spent nombre. Pas d’expiration, d’export ou de synchronisation. Messages React en mémoire. Signaler le risque d’IDs de passage positionnels.

NOTION
Fonctions serveur uniquement, clé NOTION_API_KEY, accès direct api.notion.com avec Notion-Version 2025-09-03, jamais gateway. Page du billet 3f651168-2fc3-8163-9bc3-f108577ca8b8 configurable dans le code. Charger page, propriété « image couverture » (url ou files externe/uploadé), blocs paginés paragraphes/quotes/headings, relations explicites Digressions, Résonances, Carnet, Versions et contributeurs directs ou Contributions→Contributeur. Conserver les URL GIF originales. Retourner les crédits seulement si « Consentement crédits » est true, avec Nom affiché, Rôle, Lien public, jamais coordonnées privées. Ne pas inventer les relations vides. Cache Query 60 secondes. Clé absente/échec : article de secours. Sans accès à cette page, le secours rend le clone utilisable.

DIALOGUE ET VOIX
OpenRouter POST /api/v1/chat/completions avec OPENROUTER_API_KEY, modèle openai/gpt-4o-mini. Prompt français réflexif, deux à cinq phrases, strictement passage + carnet + résonances approuvées de la file locale ; résonances Notion du panneau non envoyées dans cet instantané. Deepgram POST /v1/listen?model=nova-2&language=fr&smart_format=true, DEEPGRAM_API_KEY ; MediaRecorder, traitement après arrêt, pas de streaming. Gradium POST https://eu.api.gradium.ai/api/post/speech/tts, GRADIUM_API_KEY, GRADIUM_VOICE_ID facultatif, WAV/base64. Clés absentes : état indisponible clair, jamais valeurs privées côté navigateur. Les prestataires reçoivent messages/audio même si la conversation est éphémère localement ; ne pas affirmer leur rétention.

VALIDATION ET LIVRABLES
Zod côté serveur : passage 8 000 caractères max, contexte 12 000, 30 messages max de 4 000 caractères, audio base64 15 000 000 caractères max, TTS 3 000. Fonctions internes via createServerFn, pas de Node-only dans les handlers. Aucun secret en dur. Modules : données de secours, store, fonctions API, utilitaire browser-safe de propriétés Notion, composants Passage/Dialogue/Contribute/RelatedPanel. Fournir README, STORY, CHANGELOG, variables documentées sans valeurs et tests pour extraction GIF, consentement crédits et routes. Scripts Bun/Vite dev, build, preview, lint, test. Déploiement Lovable non déclenché sans demande.

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
"Description": "Prototype français de lecture immersive : article Notion avec couverture GIF, avis et contributions locaux, matériaux liés et versions dans un panneau. Dialogue textuel/vocal via OpenRouter, Deepgram et Gradium ; plusieurs fonctions restent de démonstration ou partielles. Sans comptes ni stockage partagé."
"Type": "Prototype expérimental"
"État": "En cours de construction"
"Metrics clés": |-
  2026-10-12 : 2 routes de contenu dans le code ; 6 tests réussis dans 2 fichiers.
  Lint : 189 erreurs, 6 avertissements. Usage, coûts et temps non mesurés.
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

## 15. Journal des évolutions de la mémoire

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
