// Mock content for the prototype. Digression anchors use the syntax [[id|texte ancré]].

export type Passage = { id: string; text: string };
export type Section = { id: string; title: string; passages: Passage[] };

export const BILLET = {
  title: "Et si… le cinéma embrassait le web ?",
  author: "Ulrich Fischer",
  date: "14 mars 2019",
  kicker: "Billet ouvert",
};

export const SECTIONS: Section[] = [
  {
    id: "s1",
    title: "Une salle obscure, un écran lumineux",
    passages: [
      {
        id: "p1",
        text: "Il y a quelque chose de paradoxal dans notre manière de parler du cinéma aujourd'hui. Nous le célébrons comme l'art de la salle obscure, du rituel collectif, de l'attention captive — et pourtant la plupart des films que nous voyons, nous les regardons seuls, sur un écran qui tient dans la paume, entre deux notifications.",
      },
      {
        id: "p2",
        text: "Ce n'est pas une plainte. C'est un constat qui ouvre une question : et si, au lieu de défendre une forteresse, le cinéma acceptait d'habiter le web comme un territoire propre, avec ses grammaires, ses rythmes, ses [[d1|formes ouvertes]] ?",
      },
      {
        id: "p3",
        text: "Car le web n'est pas seulement un canal de diffusion. C'est un milieu. Il a ses propres lois de circulation, de citation, de réponse. Un film posé sur une plateforme reste un objet clos, déposé dans un milieu qui, lui, ne demande qu'à s'ouvrir.",
      },
    ],
  },
  {
    id: "s2",
    title: "Le film comme objet fermé",
    passages: [
      {
        id: "p4",
        text: "Depuis plus d'un siècle, le film se pense comme une œuvre achevée. Le montage final, le « director's cut », la copie de projection : tout dans l'économie et la mythologie du cinéma converge vers l'idée d'une forme définitive, protégée, que l'on reçoit mais que l'on ne touche pas.",
      },
      {
        id: "p5",
        text: "Cette clôture a ses vertus. Elle garantit une intention, une durée, une expérience partagée. Quand nous sortons d'une salle, nous avons tous vu le même film — ou du moins nous le croyons. Mais elle a aussi un prix : elle fait du spectateur un destinataire, jamais un interlocuteur.",
      },
      {
        id: "p6",
        text: "Le web, lui, est né d'une autre intuition : celle de [[d2|l'hypertexte]], où chaque document renvoie à d'autres, où la lecture est un parcours, où l'auteur propose plus qu'il n'impose. Entre ces deux cultures, le malentendu est profond.",
      },
    ],
  },
  {
    id: "s3",
    title: "Ce que le web sait faire",
    passages: [
      {
        id: "p7",
        text: "Le web sait fragmenter sans détruire. Un passage peut être cité, commenté, détourné, sans que l'original disparaisse. Il sait aussi accumuler : chaque réaction, chaque note marginale enrichit l'objet au lieu de l'user.",
      },
      {
        id: "p8",
        text: "Il sait surtout faire de la conversation une forme. Les blogs des années 2000, les forums de cinéphiles, les vidéo-essais d'aujourd'hui en témoignent : une part considérable de la pensée sur le cinéma s'élabore désormais en ligne, dans un échange continu que les films eux-mêmes ignorent superbement.",
      },
      {
        id: "p9",
        text: "Imaginons un film qui se laisserait annoter scène par scène, qui exposerait ses rushes, ses versions abandonnées, ses [[d3|variantes de montage]]. Un film qui accepterait d'être une matière autant qu'une œuvre.",
      },
    ],
  },
  {
    id: "s4",
    title: "Embrasser sans se dissoudre",
    passages: [
      {
        id: "p10",
        text: "La crainte est légitime : à trop s'ouvrir, l'œuvre ne risque-t-elle pas de se dissoudre dans le bruit ? Le web est aussi le lieu du flux, de la distraction, de l'oubli rapide. Embrasser n'est pas se fondre.",
      },
      {
        id: "p11",
        text: "C'est pourquoi l'ouverture doit rester discrète. L'original doit demeurer lisible de bout en bout, intact, premier. Les couches de lecture viennent ensuite, comme des invitations que l'on peut ignorer. Une œuvre ouverte n'est pas une œuvre inachevée : c'est une œuvre hospitalière.",
      },
      {
        id: "p12",
        text: "Umberto Eco parlait déjà, en 1962, de l'[[d4|œuvre ouverte]]. Ce qui change avec le web, ce n'est pas l'idée — c'est l'outillage. Nous avons enfin les moyens techniques de rendre visible ce que chaque spectateur fait déjà en silence : interpréter.",
      },
    ],
  },
  {
    id: "s5",
    title: "Pour un cinéma hospitalier",
    passages: [
      {
        id: "p13",
        text: "Je ne crois pas que la salle disparaîtra. Je crois qu'elle deviendra un moment parmi d'autres dans la vie d'un film : le moment de l'attention pleine, avant ou après les moments de la conversation, de la reprise, du remix.",
      },
      {
        id: "p14",
        text: "Le cinéma qui embrassera le web ne sera pas un cinéma au rabais, découpé pour les réseaux. Ce sera un cinéma qui assume d'avoir des lecteurs, et pas seulement des spectateurs — des gens qui reviennent, qui pointent un plan, qui disent « là, je ne suis pas d'accord ».",
      },
      {
        id: "p15",
        text: "Ce billet lui-même est une tentative en ce sens. Il reste tel que je l'ai écrit. Mais vous pouvez y réagir, le contredire, le prolonger. Il est ouvert. À vous de voir ce que vous voulez en faire.",
      },
    ],
  },
];

export const DIGRESSIONS: Record<string, { title: string; body: string }> = {
  d1: {
    title: "Formes ouvertes",
    body: "Par « forme ouverte », j'entends une œuvre dont la structure prévoit sa propre reprise : des points d'entrée multiples, des chemins de lecture non linéaires, une place laissée à l'autre. Le webdocumentaire des années 2010 en a été un laboratoire, souvent maladroit, toujours stimulant.",
  },
  d2: {
    title: "L'hypertexte",
    body: "Ted Nelson forge le mot en 1965. Son projet Xanadu rêvait de liens bidirectionnels et de citations qui garderaient la trace de leur source — une ambition que le web de Tim Berners-Lee, plus simple et plus pragmatique, n'a jamais tout à fait réalisée.",
  },
  d3: {
    title: "Variantes de montage",
    body: "Il existe au moins sept versions officielles de Blade Runner. Les cinéphiles les comparent, les discutent, en préfèrent une. Le film est déjà, de fait, un objet pluriel — simplement, l'industrie ne l'assume pas.",
  },
  d4: {
    title: "L'œuvre ouverte",
    body: "Dans Opera aperta (1962), Eco distingue l'ouverture de toute œuvre — qui appelle l'interprétation — et les « œuvres en mouvement », que le lecteur ou l'interprète achève matériellement. Le web rend la seconde catégorie banale.",
  },
};

export type Marginalia = {
  id: string;
  passageId: string;
  type: "écho" | "contrepoint" | "prolongement";
  voice: "auteur reconnu" | "praticien";
  author: string;
  text: string;
  source: string;
  year: number;
  lang: "FR" | "EN";
};

export const MARGINALIA: Marginalia[] = [
  { id: "m1", passageId: "p1", type: "écho", voice: "auteur reconnu", author: "Serge Daney", text: "« Le cinéma, c'est ce qui se voit en salle ; la télévision, ce qui se voit chez soi. » La frontière n'a jamais été aussi poreuse.", source: "Le Salaire du zappeur", year: 1988, lang: "FR" },
  { id: "m2", passageId: "p3", type: "prolongement", voice: "auteur reconnu", author: "Lev Manovich", text: "New media objects are not fixed once and for all, but can exist in different, potentially infinite versions.", source: "The Language of New Media", year: 2001, lang: "EN" },
  { id: "m3", passageId: "p5", type: "contrepoint", voice: "praticien", author: "Céline Sciamma", text: "La salle n'est pas un format, c'est un pacte. Ouvrir le film, c'est risquer de rompre ce pacte d'attention qui fait sa force.", source: "Entretien, Les Inrocks", year: 2020, lang: "FR" },
  { id: "m4", passageId: "p8", type: "écho", voice: "praticien", author: "Kogonada", text: "The video essay is film criticism that speaks the language of cinema itself.", source: "Sight & Sound", year: 2014, lang: "EN" },
  { id: "m5", passageId: "p11", type: "prolongement", voice: "auteur reconnu", author: "Henry Jenkins", text: "Participatory culture shifts the focus of literacy from individual expression to community involvement.", source: "Confronting the Challenges of Participatory Culture", year: 2009, lang: "EN" },
  { id: "m6", passageId: "p13", type: "contrepoint", voice: "auteur reconnu", author: "Martin Scorsese", text: "Content became a business term for all moving images… The art of cinema is being systematically devalued.", source: "Harper's Magazine", year: 2021, lang: "EN" },
];

export const VERSIONS = [
  { id: "original", label: "Original" },
  { id: "breve", label: "Brève" },
  { id: "grand", label: "Grand format" },
  { id: "relecture", label: "Relecture" },
  { id: "variation", label: "Variation" },
  { id: "remix", label: "Remix" },
] as const;
export type VersionId = (typeof VERSIONS)[number]["id"];

export const VERSION_META: Record<Exclude<VersionId, "original">, { note: string; paragraphs: string[] }> = {
  breve: {
    note: "Lecture ≈ 2 minutes — condensé par l'auteur.",
    paragraphs: [
      "Nous célébrons le cinéma comme l'art de la salle obscure, mais nous regardons la plupart des films seuls, sur un petit écran. Plutôt que de défendre une forteresse, le cinéma pourrait habiter le web comme un milieu à part entière.",
      "Le film s'est toujours pensé comme une œuvre close, définitive. Cette clôture garantit une intention, mais fait du spectateur un destinataire, jamais un interlocuteur. Le web, né de l'hypertexte, propose au contraire des parcours.",
      "Le web sait fragmenter sans détruire, accumuler les lectures, faire de la conversation une forme. Un film pourrait se laisser annoter, exposer ses rushes et ses variantes.",
      "Le risque de dissolution est réel : l'ouverture doit donc rester discrète, l'original premier et intact. Une œuvre ouverte n'est pas inachevée, elle est hospitalière.",
      "La salle ne disparaîtra pas ; elle deviendra un moment parmi d'autres dans la vie d'un film qui assume enfin d'avoir des lecteurs.",
    ],
  },
  grand: {
    note: "Version augmentée — exemples, références et développements supplémentaires.",
    paragraphs: [
      "Il y a quelque chose de paradoxal dans notre manière de parler du cinéma aujourd'hui. Nous le célébrons comme l'art de la salle obscure — Barthes parlait de « l'hypnose » du cinéma, de ce corps du spectateur abandonné dans le noir — et pourtant la plupart des films que nous voyons, nous les regardons seuls, sur un écran qui tient dans la paume.",
      "Les chiffres le confirment : depuis 2015, la consommation de films hors salle dépasse largement la fréquentation en Europe. Mais l'enjeu n'est pas statistique. Il est formel. Que devient une œuvre pensée pour l'immersion collective quand elle est reçue dans la fragmentation individuelle ?",
      "Le web n'est pas seulement un canal de diffusion ; c'est un milieu, au sens où les écologues l'entendent : un ensemble de conditions qui modèlent ce qui y vit. Les textes y deviennent des hypertextes, les images des mèmes, les sons des samples. Seul le film, ou presque, y reste tel quel, comme un visiteur qui refuserait d'enlever son manteau.",
      "Depuis plus d'un siècle, le film se pense comme une œuvre achevée. Cette clôture est économique (la copie, le droit d'auteur), technique (la pellicule, le montage final) et mythologique (le génie de l'auteur). Les trois piliers vacillent aujourd'hui, mais la mythologie résiste le mieux.",
      "Pourtant, des contre-exemples existent : Chris Marker et son CD-ROM Immemory (1997), les projets interactifs de l'ONF, les vidéo-essais de Kogonada ou de Every Frame a Painting. Chacun, à sa manière, a ouvert une brèche entre l'œuvre et sa lecture.",
      "Ce que le web sait faire — fragmenter sans détruire, accumuler, converser — le cinéma pourrait l'apprendre sans renoncer à ce qu'il est. L'enjeu est de concevoir des dispositifs où l'original reste premier, et où les couches de lecture s'offrent sans s'imposer.",
      "Umberto Eco parlait déjà, en 1962, de l'œuvre ouverte. Ce qui change avec le web, ce n'est pas l'idée, c'est l'outillage. Nous avons enfin les moyens de rendre visible ce que chaque spectateur fait déjà en silence : interpréter, comparer, contester.",
      "Je ne crois pas que la salle disparaîtra. Je crois qu'elle deviendra le moment de l'attention pleine dans la vie d'un film qui, avant et après, vivra de conversations, de reprises et de remix. Un cinéma hospitalier, en somme.",
    ],
  },
  relecture: {
    note: "Relecture 2026 — l'auteur revient sur son texte, sept ans plus tard.",
    paragraphs: [
      "En 2019, j'écrivais que le cinéma pourrait « habiter le web comme un territoire propre ». Sept ans plus tard, je dois admettre que c'est plutôt le web qui a habité le cinéma — par les plateformes, les algorithmes de recommandation, le format vertical.",
      "L'objet fermé que je décrivais est resté fermé ; il s'est simplement multiplié. Le catalogue a remplacé l'œuvre. Ce n'est pas l'ouverture que j'espérais.",
      "Ce qui me semble toujours juste, c'est l'exigence de discrétion : l'original doit rester premier. Les outils de réaction et d'annotation que j'imaginais existent désormais — mais ils sont presque toujours bruyants, intrusifs, pensés pour l'engagement plutôt que pour la lecture.",
      "Je maintiens l'idée d'une œuvre hospitalière. Je la crois aujourd'hui plus politique que je ne le pensais : elle suppose de résister à la logique du flux.",
    ],
  },
  variation: {
    note: "Variation — pour un étudiant en cinéma.",
    paragraphs: [
      "Tu as sans doute appris que le film est une œuvre finie : le montage final fait autorité, et ton rôle de spectateur est de le recevoir. C'est une convention historique, pas une loi naturelle.",
      "Pense au web : un texte en ligne renvoie à d'autres, on le cite, on le commente. Pourquoi un film ne pourrait-il pas fonctionner pareil ? Exercice : choisis une scène que tu aimes et imagine trois annotations qui l'enrichiraient sans la trahir.",
      "Attention au piège : ouvrir ne veut pas dire découper pour TikTok. L'enjeu est de garder l'original lisible, puis d'ajouter des couches facultatives — rushes, versions, notes.",
      "Lectures conseillées : Eco, L'Œuvre ouverte (1962) ; Manovich, The Language of New Media (2001) ; et les vidéo-essais de Kogonada pour voir la critique parler le langage du cinéma.",
    ],
  },
  remix: {
    note: "Remix proposé par Léa M. — un détournement en forme de manifeste.",
    paragraphs: [
      "UN : Le film n'est pas un tombeau. Ouvrez-le.",
      "DEUX : Le spectateur n'est pas une cible. C'est un lecteur.",
      "TROIS : La salle est un moment, pas une frontière.",
      "QUATRE : Toute œuvre est déjà plurielle. Il suffit de l'admettre.",
      "CINQ : Ouvrir, oui. Dissoudre, non. L'original reste au centre.",
      "SIX : Le web n'est pas un tuyau. C'est un milieu. Habitez-le.",
    ],
  },
};

export const CARNET = [
  "Notes de l'auteur (2018) : le webdoc a échoué parce qu'il demandait trop d'effort au spectateur. L'ouverture doit être facultative.",
  "Carnet : relire Eco, Opera aperta. Distinguer ouverture interprétative et œuvre en mouvement.",
  "Idée : un film comme un wiki, mais avec une version de référence protégée.",
  "Doute : la conversation en ligne est-elle compatible avec l'attention longue que demande le cinéma ?",
];

export const GENEALOGY = [
  { id: "g0", kind: "Original", title: "Et si… le cinéma embrassait le web ?", by: "Ulrich Fischer", date: "2019-03-14", depth: 0 },
  { id: "g1", kind: "Version", title: "Brève", by: "Ulrich Fischer", date: "2019-03-20", depth: 1 },
  { id: "g2", kind: "Version", title: "Grand format", by: "Ulrich Fischer", date: "2020-01-08", depth: 1 },
  { id: "g3", kind: "Version", title: "Variation — étudiant en cinéma", by: "Atelier ECAL", date: "2022-10-02", depth: 1 },
  { id: "g4", kind: "Remix", title: "Manifeste en six points", by: "Léa M.", date: "2023-05-17", depth: 1 },
  { id: "g5", kind: "Tangente", title: "Et si le jeu vidéo avait déjà répondu ?", by: "Samir K.", date: "2023-06-01", depth: 2 },
  { id: "g6", kind: "Version", title: "Relecture 2026", by: "Ulrich Fischer", date: "2026-02-11", depth: 1 },
  { id: "g7", kind: "Tangente", title: "La salle comme rituel laïc", by: "Claire D.", date: "2026-04-22", depth: 2 },
];

export const REACTIONS = [
  { id: "parle", label: "Ça me parle", tone: "primary" },
  { id: "nuancer", label: "À nuancer", tone: "gold" },
  { id: "conteste", label: "Je conteste", tone: "rose" },
  { id: "question", label: "J'ai une question", tone: "orange" },
] as const;
export type ReactionId = (typeof REACTIONS)[number]["id"];

// Seed counts from "other readers" (mock).
export const SEED_AVIS: Record<string, Partial<Record<ReactionId, number>>> = {
  p2: { parle: 12, nuancer: 3, question: 1 },
  p5: { parle: 4, conteste: 6, nuancer: 2 },
  p8: { parle: 9 },
  p11: { parle: 15, nuancer: 4 },
  p13: { conteste: 3, question: 2, parle: 5 },
};
