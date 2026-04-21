export const STEP_TEXTS = {
  splash: {
    title: 'Growup',
    subtitle: 'Des plantes chez toi. Sans te prendre la tête.',
    ctaPrimary: 'Commencer',
    ctaSecondary: "J'ai déjà un compte",
  },
  brunoHello: {
    bubble: "Salut, moi, c'est Bruno le broco",
    cta: 'Hello bruno !',
  },
  brunoMission: {
    bubble:
      "Je vais t'aider à faire pousser des légumes, fruits ou même des fleurs chez toi. Simple, concret, sans te prendre la tête.",
    cta: "C'est parti !",
  },
  experience: {
    bubble:
      "Avant de commencer, t'as déjà eu une plante, un légume, quelque chose de vert chez toi ?",
    cta: "Voilà, c'est moi",
  },
  location: {
    cta: "C'est là que je jardine",
  },
  light: {
    cta: "Voilà l'ambiance",
  },
  objectives: {
    bubble: "C'est quoi un peu tes objectifs ? ",
    cta: "C'est ce que je veux",
  },
  city: {
    bubble:
      "Dernière chose, et après je te laisse respirer : tu habites dans quel coin ?",
    placeholder: 'Paris, Lyon, Marseille…',
    cta: 'Continuer',
    ctaSkip: 'Je préfère ne pas dire',
  },
  done: {
    title: 'Tout est prêt !',
    text: "Bruno a tout ce qu'il faut pour t'accompagner. À toi de jouer !",
    cta: 'Découvrir mon jardin',
  },
}

export const SKIP_MODAL = {
  warning: "Sans l'intro, Bruno aura moins d'infos pour t'aider.",
  info: 'Pas de souci, tu pourras compléter ton profil plus tard.',
  ctaContinue: "Je fais l'intro",
  ctaSkip: "Je passe pour l'instant",
}

export const EXPERIENCE_OPTIONS = [
  { value: 'jamais',    label: 'Nan, je commence de zéro' },
  { value: 'un_peu',   label: "J'ai essayer d'en avoir" },
  { value: 'oui_deja', label: "Oui j'en ai déjà" },
]

export const LOCATION_QUESTION = {
  debutant: "OK, on va faire avec ce qu'on a. Ou est-ce que tu veux jardines où chez toi ?",
  avance:   "Ah, déjà des plantes. Bien, elles sont où ?",
}

export const LOCATION_OPTIONS = [
  { value: 'fenetre',   label: 'Rebord extérieur de fenêtre' },
  { value: 'balcon',    label: 'Balcon ou terrasse' },
  { value: 'interieur', label: "Intérieur près d'une fenêtre" },
  { value: 'jardin',    label: 'Petit coin de jardin' },
  { value: 'autre',     label: 'Autre' },
]

export const LIGHT_QUESTIONS = {
  fenetre: {
    question: 'Et la lumière, sur le rebord de ta fenêtre, elle est plutôt comment ?',
    options: [
      { value: 'direct',   label: 'Plein soleil direct' },
      { value: 'indirect', label: 'Lumière indirecte / tamisée' },
      { value: 'ombre',    label: 'Assez sombre' },
    ],
  },
  balcon: {
    question: 'Ton balcon/Terrasse, il prend le soleil plutôt combien de temps dans la journée ?',
    options: [
      { value: 'moins_2h', label: 'Moins de 2h' },
      { value: '2_4h',     label: 'Entre 2h et 4h' },
      { value: 'plus_4h',  label: 'Plus de 4h, plein soleil' },
    ],
  },
  interieur: {
    question: 'Ta fenêtre, elle fait face à quel côté ?',
    options: [
      { value: 'sud',       label: 'Sud (plein soleil)' },
      { value: 'est_ouest', label: 'Est ou Ouest (soleil matin/soir)' },
      { value: 'nord',      label: 'Nord (peu de lumière)' },
      { value: 'sais_pas',  label: 'Je sais pas trop' },
    ],
  },
  jardin: {
    question: "Ce coin de jardin, il est plutôt ensoleillé ou à l'ombre ?",
    options: [
      { value: 'plein_soleil', label: 'Plein soleil toute la journée' },
      { value: 'mi_ombre',     label: 'Mi-ombre (soleil matin ou soir)' },
      { value: 'ombre',        label: "Plutôt à l'ombre" },
    ],
  },
  autre: {
    question: "Et la lumière chez toi, c'est plutôt comment ?",
    options: [
      { value: 'bien_eclaire', label: 'Bien éclairé, beaucoup de fenêtres' },
      { value: 'moyen',        label: 'Moyen, quelques fenêtres' },
      { value: 'sombre',       label: 'Assez sombre' },
    ],
  },
}

export const OBJECTIVES_OPTIONS = [
  { value: 'aromatiques', label: 'Cuisiner avec des aromatiques' },
  { value: 'legumes',     label: 'Avoir 2 ou 3 légumes faciles' },
  { value: 'fleuri',      label: 'Faire un balcon joli et fleuri' },
  { value: 'biodiversite', label: 'Aider les insectes et la biodiversité' },
  { value: 'sais_pas',    label: 'Je ne sais pas encore' },
]
