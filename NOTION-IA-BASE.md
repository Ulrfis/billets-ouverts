# Proposition — base Notion « Organique IA »

Aujourd'hui, tout est écrit en dur dans `src/lib/ai-config.ts` (une entrée par usage).
Demain, chaque entrée devient une ligne de cette base ; l'application la lit côté serveur,
et garde les valeurs en dur comme secours si Notion ne répond pas. Base créée le 2026-10-13 (data source c66462b5-fbf0-404d-9527-1a96b864bdf5), avec les lignes reve.nuit et dialogue.passage ; l app ne la lit pas encore.

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
