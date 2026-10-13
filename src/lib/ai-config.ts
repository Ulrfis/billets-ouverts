/**
 * Réglages IA « en dur », un seul endroit. Chaque entrée correspond à une
 * future ligne de la base Notion « Organique IA » (clé, usage, modèle,
 * prompt, limites) : le jour où la base existe, seule la lecture change.
 */
export type AiUsage = {
  key: string;
  usage: string;
  model: string;
  temperature: number;
  maxTokens: number;
  prompt: string;
};

export const DREAM_AI: AiUsage = {
  key: "reve.nuit",
  usage: "Rêve de nuit à partir des traces choisies",
  model: "anthropic/claude-3.5-haiku",
  temperature: 0.9,
  maxTokens: 700,
  prompt:
    "À partir des traces sélectionnées, écris en français un rêve bref, sensoriel et délicatement absurde. " +
    "Métamorphose les idées plutôt que les résumer. Une comète rencontre la Terre et fait naître un arbre. " +
    "Traverse une branche comme un sillon de lumière. Ne présente aucune invention comme une citation authentique. " +
    "Écris entre 150 et 250 mots, en prose, sans titre, sans liste, sans guillemets de citation.",
};
