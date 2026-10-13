# Base Notion « Organique IA » — branchée

Base créée et branchée le 2026-10-13, data source `c66462b5-fbf0-404d-9527-1a96b864bdf5`.
L'application lit côté serveur les lignes `reve.nuit` et `dialogue.passage` à chaque génération et demande vocale.
`src/lib/ai-config.ts` conserve les valeurs actuelles de secours ; `src/lib/ai-settings.ts` charge et valide les réglages Notion.

| Propriété | Type | Rôle |
|---|---|---|
| Clé | Titre | Identifiant stable lu par l'app (`reve.nuit`, `dialogue.passage`) |
| Usage | Texte | À quoi sert ce réglage, en clair |
| Actif | Case | Coupe l'usage sans toucher au code |
| Modèle | Texte | Identifiant OpenRouter (ex. `openai/gpt-4o-mini`) |
| Modèle de secours | Texte | Utilisé si le premier refuse |
| Prompt système | Texte | Consigne principale |
| Température | Nombre | Liberté d'invention |
| Jetons max | Nombre | Longueur maximale de la réponse |
| Mots min / max | Nombre | Longueur visée |
| Traces max | Nombre | Combien de traces le lecteur peut envoyer |
| Usages par jour | Nombre | Plafond par appareil |
| Voix | Texte | Identifiant de voix Gradium |
| Version | Texte | Pour comparer deux prompts |
| Notes | Texte | Leçons apprises |

Usages initiaux : `reve.nuit` (rêve de nuit), `dialogue.passage` (dialogue avec le texte).
Les lignes « prompt.* » et « cap.* » créées par Cursor dans « Réglages » pourront y être reprises.

## Contrat d’utilisation et reprise Cursor

- Une seule ligne non archivée par Clé exacte ; absence, doublon, erreur HTTP ou délai dépassé (5 secondes) : secours complet.
- Champ vide ou invalide : secours pour ce champ. `Actif=false` désactive génération et voix de l’usage, sans appel OpenRouter/Gradium.
- Modèle au format fournisseur/modèle ; secours distinct essayé si le principal échoue. Température : 0–2 ; jetons : 1–16 000 ; traces : 1–5 ; usages/jour : 0–100. Nombres entiers sauf température. Bornes de mots : 1–3 000, minimum ≤ maximum.
- Mots min/max déterminent une longueur visée dans le prompt du rêve, pas un contrôle de sortie. Traces max et Usages par jour concernent le rêve ; aucune nouvelle limitation quotidienne du dialogue n’est implémentée.
- Le serveur revalide la limite de traces (schéma dur : 1–5, 1 200 caractères chacune). Le compteur quotidien reste local à l’appareil, UTC, contournable : pas de protection budgétaire serveur.
- `getDreamSettings` expose seulement activation, limite de traces, quota, source et version ; le prompt n’est pas envoyé au navigateur. La query se réactualise à l’ouverture de la nuit et au retour du focus ; les contrôles sont relus au lancement du dé.
- Voix : champ Notion valide, sinon `GRADIUM_VOICE_ID`, sinon voix actuelle. Deepgram reste inchangé. Version et Notes documentent l’édition, sans historique automatique ; Usage est descriptif.
- Clés exclusivement dans les variables serveur, jamais dans la base. Aucun changement des données Notion effectué pendant le branchement.

## Anomalie constatée dans le pilote

Lors de la lecture réelle, « Prompt système » de `reve.nuit` contient des métadonnées concaténées (`reve.nuit`, intitulé et modèle), pas une consigne. Le lecteur rejette cette cellule et utilise le prompt `DREAM_AI` ; les autres champs valides restent lus dans Notion. Pour piloter aussi cette consigne, remplacer la cellule dans Notion par le texte souhaité. Le prompt du dialogue est valide.

## Vérification

36 tests réussis dans 7 fichiers, dont 9 tests de réglages (erreurs Notion, champs invalides, désactivation et modèle secours). Rêve et dialogue réels générés dans le navigateur sur `/`, sans erreur React ; bouton d’écoute du rêve visible. Le parcours audio réel et les quotas ne sont pas intégralement vérifiés de bout en bout.
