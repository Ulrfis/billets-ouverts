/**
 * Corpus d'exemple pour le monde de jour (les glaçons).
 * Phrases préparées pour la maquette, sans attribution : aucune fausse
 * référence n'est présentée comme authentique. Le corpus réel viendra de
 * la base Notion « Citations » une fois validée.
 */
export type Quote = {
  id: string;
  text: string;
  keywords: string[];
};

export const EXAMPLE_QUOTES: Quote[] = [
  { id: "g1", text: "Une image peut devenir un chemin.", keywords: ["image", "chemin"] },
  { id: "g2", text: "Ce que l’on garde continue de bouger.", keywords: ["trace", "mouvement"] },
  { id: "g3", text: "La lenteur est une forme d’attention.", keywords: ["lenteur", "attention"] },
  { id: "g4", text: "Un texte ouvert ne se termine pas, il se prolonge.", keywords: ["ouverture"] },
  { id: "g5", text: "Les idées ne nous appartiennent pas, elles nous traversent.", keywords: ["idées", "traverse"] },
  { id: "g6", text: "Regarder ensemble, ce n’est pas regarder la même chose.", keywords: ["regard"] },
  { id: "g7", text: "La page est un lieu où l’on peut revenir.", keywords: ["page", "lieu"] },
  { id: "g8", text: "Une digression est une manière de rester fidèle.", keywords: ["digression"] },
  { id: "g9", text: "Le silence d’un texte fait partie de sa voix.", keywords: ["silence", "voix"] },
  { id: "g10", text: "On n’entre jamais deux fois dans la même lecture.", keywords: ["lecture"] },
  { id: "g11", text: "La marge est une promesse de dialogue.", keywords: ["marge", "dialogue"] },
  { id: "g12", text: "Un fragment gardé devient une carte.", keywords: ["fragment", "carte"] },
  { id: "g13", text: "La nuit rend les mots plus visibles.", keywords: ["nuit"] },
  { id: "g14", text: "Toute archive rêve d’être relue autrement.", keywords: ["archive", "rêve"] },
  { id: "g15", text: "Le web est un cinéma qui attend ses spectateurs.", keywords: ["web", "cinéma"] },
];

export const DREAM_PROMPT =
  "À partir des traces sélectionnées, écris en français un rêve bref, sensoriel et délicatement absurde. " +
  "Métamorphose les idées plutôt que les résumer. Une comète rencontre la Terre et fait naître un arbre. " +
  "Traverse une branche comme un sillon de lumière. Ne présente aucune invention comme une citation authentique.";

/** Limites proposées du lot 5 : valeurs modifiables, affichées telles quelles. */
export const DREAM_LIMITS = { maxTraces: 5, minWords: 150, maxWords: 250, perDay: 3 } as const;
