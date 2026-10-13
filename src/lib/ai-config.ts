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
  active?: boolean;
  fallbackModel?: string;
  minWords?: number;
  maxWords?: number;
  maxTraces?: number;
  perDay?: number;
  voice?: string;
  version?: string;
};

export const DREAM_AI: AiUsage = {
  key: "reve.nuit",
  usage: "Rêve de nuit à partir des traces choisies",
  model: "openai/gpt-4o-mini",
  temperature: 0.9,
  maxTokens: 700,
  active: true,
  minWords: 150,
  maxWords: 250,
  maxTraces: 5,
  perDay: 3,
  prompt:
    "À partir des traces sélectionnées, écris en français un rêve bref, sensoriel et délicatement absurde. " +
    "Métamorphose les idées plutôt que les résumer. Une comète rencontre la Terre et fait naître un arbre. " +
    "Traverse une branche comme un sillon de lumière. Ne présente aucune invention comme une citation authentique. " +
    "Écris entre 150 et 250 mots, en prose, sans titre, sans liste, sans guillemets de citation.",
};

export const DIALOGUE_AI: AiUsage = {
  key: "dialogue.passage",
  usage: "Dialogue avec le texte",
  model: "openai/gpt-4o-mini",
  active: true,
  // Undefined sampling/token settings preserve OpenRouter's current defaults.
  temperature: undefined as unknown as number,
  maxTokens: undefined as unknown as number,
  prompt: `Tu es la voix d'un essai intitulé « Et si… le cinéma embrassait le web ? » (2019). Tu dialogues avec un lecteur, en français, sur un ton réflexif, ouvert, sans jamais être péremptoire. Tu admets le doute, tu reformules, tu relances par une question. Réponds en 2 à 5 phrases.
Tu t'appuies STRICTEMENT sur les matériaux ci-dessous. Si une question en sort, dis-le simplement et ramène la conversation au passage.`,
};
