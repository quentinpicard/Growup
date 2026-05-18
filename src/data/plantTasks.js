/**
 * Plant Tasks — Règles + Générateur de tâches
 *
 * Fichier unique qui contient :
 *  - Les règles de tâches pour chaque plante (tomate cerise, fraise, ciboulette, carotte)
 *  - La fonction generateTasks() qui produit les tâches concrètes avec dates absolues
 *  - Les helpers getCurrentStage() et getTasksForDate()
 *
 * Trois types de règles :
 *  1. once       → 1 occurrence à plantedAt + offsetDays
 *  2. recurring  → N occurrences entre startOffsetDays et endOffsetDays
 *  3. seasonal   → occurrences sur triggerMonth/triggerDay du calendrier réel
 *
 * Modulation météo :
 *  - weatherModifier 'canicule_daily' double la fréquence d'arrosage si
 *    weatherData.isHeatwave(date) renvoie true.
 */

// ════════════════════════════════════════════════════════════════
// RÈGLES — TOMATE CERISE
// Cycle ~5-6 mois (mars à octobre)
// ════════════════════════════════════════════════════════════════
const tomateCeriseRules = {
  plantId: 'tomate-cerise',
  plantName: 'Tomate cerise',
  cycleType: 'annuel',
  stages: {
    semis: { startOffsetDays: 0, endOffsetDays: 42 },
    jeune_plant: { startOffsetDays: 42, endOffsetDays: 70 },
    production: { startOffsetDays: 70, endOffsetDays: 154 },
    fin_cycle: { startOffsetDays: 154, endOffsetDays: 180 },
  },
  rules: [
    // ─── SEMIS ───────────────────────────────────────────────
    {
      id: 'tomate-semis-semer',
      type: 'once',
      stage: 'semis',
      offsetDays: 0,
      title: 'Semer les graines',
      description: '3-4 graines par godet, 0,5 cm de profondeur.',
      category: 'semis',
      priority: 'high',
    },
    {
      id: 'tomate-semis-etiqueter',
      type: 'once',
      stage: 'semis',
      offsetDays: 0,
      title: 'Étiqueter le godet',
      description: 'Note le nom de la variété et la date de semis.',
      category: 'entretien',
      priority: 'normal',
    },
    {
      id: 'tomate-semis-eclaircir',
      type: 'once',
      stage: 'semis',
      offsetDays: 14,
      title: 'Éclaircir les semis',
      description: 'Garde le plant le plus vigoureux par godet.',
      category: 'entretien',
      priority: 'normal',
    },
    {
      id: 'tomate-semis-rempoter-godet',
      type: 'once',
      stage: 'semis',
      offsetDays: 28,
      title: 'Rempoter en godet plus grand si besoin',
      description: 'Vérifie si les racines sortent par le fond du godet.',
      category: 'entretien',
      priority: 'normal',
    },
    {
      id: 'tomate-semis-arrosage',
      type: 'recurring',
      stage: 'semis',
      startOffsetDays: 0,
      endOffsetDays: 42,
      intervalDays: 1,
      title: 'Arroser au pulvérisateur',
      description: 'Substrat toujours humide, jamais détrempé.',
      category: 'arrosage',
      priority: 'high',
    },
    {
      id: 'tomate-semis-luminosite',
      type: 'recurring',
      stage: 'semis',
      startOffsetDays: 0,
      endOffsetDays: 42,
      intervalDays: 3,
      title: 'Vérifier la luminosité',
      description: '12 h de lumière minimum par jour.',
      category: 'surveillance',
      priority: 'normal',
    },
    {
      id: 'tomate-semis-rotation',
      type: 'recurring',
      stage: 'semis',
      startOffsetDays: 0,
      endOffsetDays: 42,
      intervalDays: 3,
      title: 'Tourner le godet d\'un quart de tour',
      description: 'Évite que la tige se courbe vers la lumière.',
      category: 'entretien',
      priority: 'normal',
    },

    // ─── JEUNE PLANT ─────────────────────────────────────────
    {
      id: 'tomate-jeune-acclimater',
      type: 'once',
      stage: 'jeune_plant',
      offsetDays: 42,
      title: 'Commencer l\'acclimatation dehors',
      description: 'Sortir 1 h, puis 2 h, puis 4 h sur 5 jours.',
      category: 'entretien',
      priority: 'high',
    },
    {
      id: 'tomate-jeune-repiquer',
      type: 'once',
      stage: 'jeune_plant',
      offsetDays: 50,
      title: 'Repiquer en pot définitif',
      description: 'Minimum 15 L, terreau + compost.',
      category: 'entretien',
      priority: 'high',
    },
    {
      id: 'tomate-jeune-tuteur',
      type: 'once',
      stage: 'jeune_plant',
      offsetDays: 50,
      title: 'Installer le tuteur',
      description: '50 à 80 cm, planté au moment du repiquage.',
      category: 'entretien',
      priority: 'high',
    },
    {
      id: 'tomate-jeune-paillage',
      type: 'once',
      stage: 'jeune_plant',
      offsetDays: 55,
      title: 'Ajouter une couche de paillage',
      description: '3 à 5 cm autour du pied.',
      category: 'entretien',
      priority: 'normal',
    },
    {
      id: 'tomate-jeune-arrosage',
      type: 'recurring',
      stage: 'jeune_plant',
      startOffsetDays: 42,
      endOffsetDays: 70,
      intervalDays: 2,
      title: 'Arroser au pied',
      description: 'Jamais sur les feuilles.',
      category: 'arrosage',
      priority: 'high',
      weatherModifier: 'canicule_daily',
    },
    {
      id: 'tomate-jeune-humidite',
      type: 'recurring',
      stage: 'jeune_plant',
      startOffsetDays: 42,
      endOffsetDays: 70,
      intervalDays: 1,
      title: 'Vérifier l\'humidité du substrat',
      description: 'Teste avec le doigt sur les 2-3 premiers centimètres.',
      category: 'surveillance',
      priority: 'normal',
    },
    {
      id: 'tomate-jeune-parasites',
      type: 'recurring',
      stage: 'jeune_plant',
      startOffsetDays: 42,
      endOffsetDays: 70,
      intervalDays: 3,
      title: 'Surveiller les premiers parasites',
      description: 'Pucerons, aleurodes sous les feuilles.',
      category: 'surveillance',
      priority: 'normal',
    },

    // ─── PRODUCTION ──────────────────────────────────────────
    {
      id: 'tomate-prod-engrais-1',
      type: 'once',
      stage: 'production',
      offsetDays: 70,
      title: 'Premier apport d\'engrais tomate',
      description: 'Engrais liquide spécial tomate, dilué dans l\'eau d\'arrosage.',
      category: 'entretien',
      priority: 'high',
    },
    {
      id: 'tomate-prod-premiere-recolte',
      type: 'once',
      stage: 'production',
      offsetDays: 90,
      title: 'Première récolte attendue',
      description: 'Cueille les fruits bien rouges et fermes.',
      category: 'récolte',
      priority: 'high',
    },
    {
      id: 'tomate-prod-engrais-2',
      type: 'once',
      stage: 'production',
      offsetDays: 120,
      title: 'Deuxième apport d\'engrais',
      description: 'Engrais tomate pour soutenir la production.',
      category: 'entretien',
      priority: 'normal',
    },
    {
      id: 'tomate-prod-arrosage',
      type: 'recurring',
      stage: 'production',
      startOffsetDays: 70,
      endOffsetDays: 154,
      intervalDays: 2,
      title: 'Arroser en profondeur',
      description: 'Jusqu\'à ce que l\'eau sorte par les trous.',
      category: 'arrosage',
      priority: 'high',
      weatherModifier: 'canicule_daily',
    },
    {
      id: 'tomate-prod-gourmands',
      type: 'recurring',
      stage: 'production',
      startOffsetDays: 70,
      endOffsetDays: 154,
      intervalDays: 3,
      title: 'Tailler les gourmands',
      description: 'Pousses qui apparaissent entre la tige et les branches.',
      category: 'entretien',
      priority: 'normal',
    },
    {
      id: 'tomate-prod-tuteurage',
      type: 'recurring',
      stage: 'production',
      startOffsetDays: 70,
      endOffsetDays: 154,
      intervalDays: 3,
      title: 'Attacher la tige au tuteur',
      description: 'Au fur et à mesure de la croissance.',
      category: 'entretien',
      priority: 'normal',
    },
    {
      id: 'tomate-prod-recolte',
      type: 'recurring',
      stage: 'production',
      startOffsetDays: 90,
      endOffsetDays: 154,
      intervalDays: 3,
      title: 'Récolter les fruits mûrs',
      description: 'Cueille avec le pédoncule pour mieux conserver.',
      category: 'récolte',
      priority: 'high',
    },
    {
      id: 'tomate-prod-surveillance',
      type: 'recurring',
      stage: 'production',
      startOffsetDays: 70,
      endOffsetDays: 154,
      intervalDays: 1,
      title: 'Surveiller les feuilles',
      description: 'Jaunissement, taches, mildiou.',
      category: 'surveillance',
      priority: 'normal',
    },
    {
      id: 'tomate-prod-engrais-recurrent',
      type: 'recurring',
      stage: 'production',
      startOffsetDays: 70,
      endOffsetDays: 154,
      intervalDays: 14,
      title: 'Apport d\'engrais tomate',
      description: 'Engrais liquide dans l\'eau d\'arrosage.',
      category: 'entretien',
      priority: 'normal',
    },

    // ─── FIN DE CYCLE ────────────────────────────────────────
    {
      id: 'tomate-fin-eteter',
      type: 'once',
      stage: 'fin_cycle',
      offsetDays: 160,
      title: 'Étêter le plant',
      description: 'Coupe la tête pour concentrer la maturation des derniers fruits.',
      category: 'fin_cycle',
      priority: 'high',
    },
    {
      id: 'tomate-fin-recolte-vertes',
      type: 'once',
      stage: 'fin_cycle',
      offsetDays: 170,
      title: 'Récolter les dernières tomates vertes',
      description: 'À faire mûrir à l\'intérieur dans un sac en papier.',
      category: 'récolte',
      priority: 'high',
    },
    {
      id: 'tomate-fin-arracher',
      type: 'once',
      stage: 'fin_cycle',
      offsetDays: 180,
      title: 'Arracher le plant et vider le pot',
      description: 'Composte les parties saines, jette les parties malades.',
      category: 'fin_cycle',
      priority: 'high',
    },
    {
      id: 'tomate-fin-nettoyer',
      type: 'once',
      stage: 'fin_cycle',
      offsetDays: 180,
      title: 'Nettoyer le pot et stocker le tuteur',
      description: 'Rince le pot, range le tuteur au sec.',
      category: 'fin_cycle',
      priority: 'normal',
    },
    {
      id: 'tomate-fin-journal',
      type: 'once',
      stage: 'fin_cycle',
      offsetDays: 180,
      title: 'Noter le bilan dans le journal',
      description: 'Rendement, problèmes, à refaire l\'an prochain.',
      category: 'fin_cycle',
      priority: 'normal',
    },
    {
      id: 'tomate-fin-arrosage',
      type: 'recurring',
      stage: 'fin_cycle',
      startOffsetDays: 154,
      endOffsetDays: 180,
      intervalDays: 4,
      title: 'Arrosage réduit',
      description: 'On ralentit pour préparer la fin de cycle.',
      category: 'arrosage',
      priority: 'normal',
    },
  ],
};

// ════════════════════════════════════════════════════════════════
// RÈGLES — FRAISE
// Cycle pérenne (plant qui dure 3 ans)
// ════════════════════════════════════════════════════════════════
const fraiseRules = {
  plantId: 'fraise',
  plantName: 'Fraise',
  cycleType: 'perenne',
  perennialLifespanYears: 3,
  stages: {
    plantation: { startOffsetDays: 0, endOffsetDays: 21 },
    jeune_plant: { startOffsetDays: 21, endOffsetDays: 56 },
    production: { startOffsetDays: 56, endOffsetDays: 140 },
    fin_cycle_annuel: { startOffsetDays: 140, endOffsetDays: 240 },
  },
  rules: [
    // ─── PLANTATION ──────────────────────────────────────────
    {
      id: 'fraise-plant-planter',
      type: 'once',
      stage: 'plantation',
      offsetDays: 0,
      title: 'Planter le plant',
      description: 'Collet au niveau du sol, ni enterré ni à l\'air libre.',
      category: 'semis',
      priority: 'high',
    },
    {
      id: 'fraise-plant-arrosage-initial',
      type: 'once',
      stage: 'plantation',
      offsetDays: 0,
      title: 'Arroser abondamment après plantation',
      description: 'Bien tasser autour du plant pour éviter les poches d\'air.',
      category: 'arrosage',
      priority: 'high',
    },
    {
      id: 'fraise-plant-reprise',
      type: 'once',
      stage: 'plantation',
      offsetDays: 7,
      title: 'Vérifier la reprise',
      description: 'Feuilles bien dressées et pas de flétrissement.',
      category: 'surveillance',
      priority: 'high',
    },
    {
      id: 'fraise-plant-paillage',
      type: 'once',
      stage: 'plantation',
      offsetDays: 14,
      title: 'Ajouter un paillage',
      description: 'Paille, feuilles mortes ou BRF, sans enterrer le collet.',
      category: 'entretien',
      priority: 'normal',
    },
    {
      id: 'fraise-plant-arrosage',
      type: 'recurring',
      stage: 'plantation',
      startOffsetDays: 0,
      endOffsetDays: 21,
      intervalDays: 2,
      title: 'Arroser au pied',
      description: 'Garde le substrat frais sans le noyer.',
      category: 'arrosage',
      priority: 'high',
    },
    {
      id: 'fraise-plant-collet',
      type: 'recurring',
      stage: 'plantation',
      startOffsetDays: 0,
      endOffsetDays: 21,
      intervalDays: 3,
      title: 'Vérifier que le collet n\'est pas enterré',
      description: 'Le paillage ne doit pas recouvrir le coeur du plant.',
      category: 'surveillance',
      priority: 'normal',
    },

    // ─── JEUNE PLANT ─────────────────────────────────────────
    {
      id: 'fraise-jeune-couper-fleurs',
      type: 'once',
      stage: 'jeune_plant',
      offsetDays: 21,
      title: 'Couper les premières fleurs (1ʳᵉ année)',
      description: 'Renforce le système racinaire pour les saisons suivantes.',
      category: 'entretien',
      priority: 'normal',
    },
    {
      id: 'fraise-jeune-engrais',
      type: 'once',
      stage: 'jeune_plant',
      offsetDays: 35,
      title: 'Premier apport d\'engrais',
      description: 'Engrais fraisier ou compost mûr en surface.',
      category: 'entretien',
      priority: 'normal',
    },
    {
      id: 'fraise-jeune-arrosage',
      type: 'recurring',
      stage: 'jeune_plant',
      startOffsetDays: 21,
      endOffsetDays: 56,
      intervalDays: 3,
      title: 'Arroser au pied',
      description: 'Sans mouiller les feuilles pour limiter les maladies.',
      category: 'arrosage',
      priority: 'high',
      weatherModifier: 'canicule_daily',
    },
    {
      id: 'fraise-jeune-nettoyer',
      type: 'recurring',
      stage: 'jeune_plant',
      startOffsetDays: 21,
      endOffsetDays: 56,
      intervalDays: 3,
      title: 'Enlever les feuilles sèches ou jaunes',
      description: 'Évite la propagation des maladies.',
      category: 'entretien',
      priority: 'normal',
    },
    {
      id: 'fraise-jeune-limaces',
      type: 'recurring',
      stage: 'jeune_plant',
      startOffsetDays: 21,
      endOffsetDays: 56,
      intervalDays: 1,
      title: 'Surveiller les limaces',
      description: 'Surtout après les pluies et le matin.',
      category: 'surveillance',
      priority: 'normal',
    },

    // ─── PRODUCTION ──────────────────────────────────────────
    {
      id: 'fraise-prod-premiere-recolte',
      type: 'once',
      stage: 'production',
      offsetDays: 60,
      title: 'Première récolte attendue',
      description: 'Cueille les fraises bien rouges uniformément.',
      category: 'récolte',
      priority: 'high',
    },
    {
      id: 'fraise-prod-engrais-saison',
      type: 'once',
      stage: 'production',
      offsetDays: 90,
      title: 'Apport d\'engrais à mi-saison',
      description: 'Soutient la production de fruits.',
      category: 'entretien',
      priority: 'normal',
    },
    {
      id: 'fraise-prod-stolons',
      type: 'once',
      stage: 'production',
      offsetDays: 120,
      title: 'Décider du sort des stolons',
      description: 'Couper pour booster la fraise mère, ou garder 1-2 pour créer de nouveaux plants.',
      category: 'entretien',
      priority: 'normal',
    },
    {
      id: 'fraise-prod-recolte',
      type: 'recurring',
      stage: 'production',
      startOffsetDays: 60,
      endOffsetDays: 140,
      intervalDays: 2,
      title: 'Récolter les fraises mûres',
      description: 'Cueille tôt le matin, fruits rouges uniformément.',
      category: 'récolte',
      priority: 'high',
    },
    {
      id: 'fraise-prod-arrosage',
      type: 'recurring',
      stage: 'production',
      startOffsetDays: 56,
      endOffsetDays: 140,
      intervalDays: 2,
      title: 'Arroser au pied',
      description: 'Sans mouiller les fruits ni les feuilles.',
      category: 'arrosage',
      priority: 'high',
      weatherModifier: 'canicule_daily',
    },
    {
      id: 'fraise-prod-couper-stolons',
      type: 'recurring',
      stage: 'production',
      startOffsetDays: 56,
      endOffsetDays: 140,
      intervalDays: 3,
      title: 'Couper les stolons non gardés',
      description: 'Pour concentrer l\'énergie sur la production.',
      category: 'entretien',
      priority: 'normal',
    },
    {
      id: 'fraise-prod-surveillance',
      type: 'recurring',
      stage: 'production',
      startOffsetDays: 56,
      endOffsetDays: 140,
      intervalDays: 1,
      title: 'Surveiller oiseaux et limaces',
      description: 'Filet anti-oiseaux possible si pression forte.',
      category: 'surveillance',
      priority: 'normal',
    },

    // ─── FIN DE CYCLE ANNUEL ─────────────────────────────────
    {
      id: 'fraise-fin-couper-feuilles',
      type: 'once',
      stage: 'fin_cycle_annuel',
      offsetDays: 150,
      title: 'Couper les vieilles feuilles',
      description: 'À 5 cm du sol, sans abîmer le coeur du plant.',
      category: 'fin_cycle',
      priority: 'high',
    },
    {
      id: 'fraise-fin-compost',
      type: 'once',
      stage: 'fin_cycle_annuel',
      offsetDays: 160,
      title: 'Apport de compost en surface',
      description: 'Pour nourrir le plant en vue de la saison suivante.',
      category: 'entretien',
      priority: 'normal',
    },
    {
      id: 'fraise-fin-arrosage',
      type: 'recurring',
      stage: 'fin_cycle_annuel',
      startOffsetDays: 140,
      endOffsetDays: 240,
      intervalDays: 4,
      title: 'Arrosage réduit',
      description: 'On ralentit progressivement avant l\'hiver.',
      category: 'arrosage',
      priority: 'normal',
    },
    {
      id: 'fraise-fin-verif-feuilles',
      type: 'recurring',
      stage: 'fin_cycle_annuel',
      startOffsetDays: 140,
      endOffsetDays: 240,
      intervalDays: 3,
      title: 'Vérifier qu\'aucune feuille morte ne pourrit',
      description: 'Retire celles qui sont en décomposition.',
      category: 'surveillance',
      priority: 'normal',
    },

    // ─── TÂCHES SAISONNIÈRES (calendrier réel) ───────────────
    {
      id: 'fraise-saison-paillage-hiver',
      type: 'seasonal',
      triggerMonth: 11,
      triggerDay: 1,
      title: 'Renouveler le paillage pour l\'hiver',
      description: 'Couche épaisse de paille ou de feuilles mortes.',
      category: 'entretien',
      priority: 'high',
    },
    {
      id: 'fraise-saison-protection-gel',
      type: 'seasonal',
      triggerMonth: 12,
      triggerDay: 1,
      title: 'Protéger du gel si exposition exposée',
      description: 'Voile d\'hivernage si températures négatives prolongées.',
      category: 'entretien',
      priority: 'normal',
    },
  ],
};

// ════════════════════════════════════════════════════════════════
// RÈGLES — CIBOULETTE
// Cycle pérenne (plant qui dure plusieurs années)
// ════════════════════════════════════════════════════════════════
const cibouletteRules = {
  plantId: 'ciboulette',
  plantName: 'Ciboulette',
  cycleType: 'perenne',
  perennialLifespanYears: 5,
  stages: {
    semis: { startOffsetDays: 0, endOffsetDays: 28 },
    jeune_plant: { startOffsetDays: 28, endOffsetDays: 56 },
    production: { startOffsetDays: 56, endOffsetDays: 210 },
    fin_cycle_annuel: { startOffsetDays: 210, endOffsetDays: 280 },
  },
  rules: [
    // ─── SEMIS ───────────────────────────────────────────────
    {
      id: 'ciboulette-semis-semer',
      type: 'once',
      stage: 'semis',
      offsetDays: 0,
      title: 'Semer en surface',
      description: 'Graines à peine recouvertes, 0,2 à 0,5 cm de profondeur.',
      category: 'semis',
      priority: 'high',
    },
    {
      id: 'ciboulette-semis-tasser',
      type: 'once',
      stage: 'semis',
      offsetDays: 0,
      title: 'Tasser légèrement et humidifier',
      description: 'Au pulvérisateur pour ne pas déplacer les graines.',
      category: 'semis',
      priority: 'normal',
    },
    {
      id: 'ciboulette-semis-levee',
      type: 'once',
      stage: 'semis',
      offsetDays: 14,
      title: 'Première levée attendue',
      description: 'Patience : la germination est lente, jusqu\'à 3 semaines.',
      category: 'surveillance',
      priority: 'normal',
    },
    {
      id: 'ciboulette-semis-eclaircir',
      type: 'once',
      stage: 'semis',
      offsetDays: 28,
      title: 'Éclaircir les plants',
      description: 'Garde un bouquet de 5-6 brins par godet.',
      category: 'entretien',
      priority: 'normal',
    },
    {
      id: 'ciboulette-semis-arrosage',
      type: 'recurring',
      stage: 'semis',
      startOffsetDays: 0,
      endOffsetDays: 28,
      intervalDays: 1,
      title: 'Vaporiser pour garder le substrat humide',
      description: 'Au pulvérisateur, jusqu\'à la levée.',
      category: 'arrosage',
      priority: 'high',
    },
    {
      id: 'ciboulette-semis-lumiere',
      type: 'recurring',
      stage: 'semis',
      startOffsetDays: 0,
      endOffsetDays: 28,
      intervalDays: 3,
      title: 'Vérifier la lumière',
      description: 'Rebord de fenêtre lumineux idéalement.',
      category: 'surveillance',
      priority: 'normal',
    },

    // ─── JEUNE PLANT ─────────────────────────────────────────
    {
      id: 'ciboulette-jeune-repiquer',
      type: 'once',
      stage: 'jeune_plant',
      offsetDays: 30,
      title: 'Repiquer en pot définitif',
      description: '15 à 20 cm de profondeur suffisent.',
      category: 'entretien',
      priority: 'high',
    },
    {
      id: 'ciboulette-jeune-sortir',
      type: 'once',
      stage: 'jeune_plant',
      offsetDays: 30,
      title: 'Sortir le pot dehors si possible',
      description: 'Si les températures restent au-dessus de 10 °C la nuit.',
      category: 'entretien',
      priority: 'normal',
    },
    {
      id: 'ciboulette-jeune-arrosage',
      type: 'recurring',
      stage: 'jeune_plant',
      startOffsetDays: 28,
      endOffsetDays: 56,
      intervalDays: 3,
      title: 'Arroser au pied',
      description: 'Garde le substrat frais.',
      category: 'arrosage',
      priority: 'high',
      weatherModifier: 'canicule_daily',
    },
    {
      id: 'ciboulette-jeune-couleur',
      type: 'recurring',
      stage: 'jeune_plant',
      startOffsetDays: 28,
      endOffsetDays: 56,
      intervalDays: 3,
      title: 'Surveiller la couleur des brins',
      description: 'Jaunissement = trop d\'eau ou manque de lumière.',
      category: 'surveillance',
      priority: 'normal',
    },

    // ─── PRODUCTION ──────────────────────────────────────────
    {
      id: 'ciboulette-prod-premiere-recolte',
      type: 'once',
      stage: 'production',
      offsetDays: 60,
      title: 'Première récolte',
      description: 'Coupe aux ciseaux à 2-3 cm du sol.',
      category: 'récolte',
      priority: 'high',
    },
    {
      id: 'ciboulette-prod-fleurs',
      type: 'once',
      stage: 'production',
      offsetDays: 100,
      title: 'Couper les fleurs (ou les garder)',
      description: 'Coupe-les pour préserver les brins, ou garde-les : elles sont comestibles.',
      category: 'entretien',
      priority: 'normal',
    },
    {
      id: 'ciboulette-prod-diviser',
      type: 'once',
      stage: 'production',
      offsetDays: 150,
      title: 'Diviser la touffe si dense',
      description: 'Sépare en 2-3 morceaux et replante.',
      category: 'entretien',
      priority: 'normal',
    },
    {
      id: 'ciboulette-prod-recolte',
      type: 'recurring',
      stage: 'production',
      startOffsetDays: 60,
      endOffsetDays: 210,
      intervalDays: 3,
      title: 'Récolter les brins',
      description: 'Toujours à 2-3 cm du sol, jamais à la base.',
      category: 'récolte',
      priority: 'normal',
    },
    {
      id: 'ciboulette-prod-arrosage',
      type: 'recurring',
      stage: 'production',
      startOffsetDays: 56,
      endOffsetDays: 210,
      intervalDays: 3,
      title: 'Arroser au pied',
      description: 'Substrat frais sans excès.',
      category: 'arrosage',
      priority: 'high',
      weatherModifier: 'canicule_daily',
    },
    {
      id: 'ciboulette-prod-nettoyer',
      type: 'recurring',
      stage: 'production',
      startOffsetDays: 56,
      endOffsetDays: 210,
      intervalDays: 3,
      title: 'Retirer les brins jaunis ou secs',
      description: 'Pour garder la touffe saine et productive.',
      category: 'entretien',
      priority: 'normal',
    },

    // ─── FIN DE CYCLE ANNUEL ─────────────────────────────────
    {
      id: 'ciboulette-fin-couper-ras',
      type: 'once',
      stage: 'fin_cycle_annuel',
      offsetDays: 210,
      title: 'Couper la touffe à ras',
      description: 'À 5 cm du sol avant l\'hiver.',
      category: 'fin_cycle',
      priority: 'high',
    },
    {
      id: 'ciboulette-fin-pailler',
      type: 'once',
      stage: 'fin_cycle_annuel',
      offsetDays: 220,
      title: 'Pailler la base',
      description: 'Pour protéger les racines du froid.',
      category: 'entretien',
      priority: 'normal',
    },
    {
      id: 'ciboulette-fin-arrosage',
      type: 'recurring',
      stage: 'fin_cycle_annuel',
      startOffsetDays: 210,
      endOffsetDays: 280,
      intervalDays: 8,
      title: 'Arrosage minimal d\'hiver',
      description: 'Tous les 7-10 jours, suffisant pendant la dormance.',
      category: 'arrosage',
      priority: 'normal',
    },

    // ─── TÂCHES SAISONNIÈRES (calendrier réel) ───────────────
    {
      id: 'ciboulette-saison-protection-gel',
      type: 'seasonal',
      triggerMonth: 12,
      triggerDay: 15,
      title: 'Rentrer ou couvrir si gel sévère',
      description: 'Voile d\'hivernage ou pot rentré si températures très basses.',
      category: 'entretien',
      priority: 'high',
    },
    {
      id: 'ciboulette-saison-reprise',
      type: 'seasonal',
      triggerMonth: 3,
      triggerDay: 1,
      title: 'Reprise de printemps',
      description: 'Retire le paillis, fais le premier arrosage de la saison.',
      category: 'entretien',
      priority: 'high',
    },
  ],
};

// ════════════════════════════════════════════════════════════════
// RÈGLES — CAROTTE
// Cycle ~3-4 mois (semis échelonné mars à juillet)
// ════════════════════════════════════════════════════════════════
const carotteRules = {
  plantId: 'carotte',
  plantName: 'Carotte',
  cycleType: 'annuel',
  stages: {
    semis: { startOffsetDays: 0, endOffsetDays: 21 },
    jeune_plant: { startOffsetDays: 21, endOffsetDays: 49 },
    production: { startOffsetDays: 49, endOffsetDays: 98 },
    fin_cycle: { startOffsetDays: 98, endOffsetDays: 115 },
  },
  rules: [
    // ─── SEMIS ───────────────────────────────────────────────
    {
      id: 'carotte-semis-substrat',
      type: 'once',
      stage: 'semis',
      offsetDays: 0,
      title: 'Préparer un substrat fin et profond',
      description: 'Sans cailloux, 25-30 cm pour les variétés longues, 15-20 cm pour les rondes.',
      category: 'semis',
      priority: 'high',
    },
    {
      id: 'carotte-semis-semer',
      type: 'once',
      stage: 'semis',
      offsetDays: 0,
      title: 'Semer les graines',
      description: 'En ligne ou à la volée, 1 cm de profondeur, très espacées.',
      category: 'semis',
      priority: 'high',
    },
    {
      id: 'carotte-semis-tasser',
      type: 'once',
      stage: 'semis',
      offsetDays: 0,
      title: 'Tasser et arroser en pluie fine',
      description: 'Au pulvérisateur ou arrosoir à pomme fine.',
      category: 'semis',
      priority: 'normal',
    },
    {
      id: 'carotte-semis-etiqueter',
      type: 'once',
      stage: 'semis',
      offsetDays: 0,
      title: 'Étiqueter le pot',
      description: 'Nom de la variété et date de semis.',
      category: 'entretien',
      priority: 'normal',
    },
    {
      id: 'carotte-semis-patience',
      type: 'once',
      stage: 'semis',
      offsetDays: 10,
      title: 'Vérifier la levée (patience)',
      description: 'La carotte met du temps à sortir, 10 à 20 jours. C\'est normal.',
      category: 'surveillance',
      priority: 'normal',
    },
    {
      id: 'carotte-semis-levee',
      type: 'once',
      stage: 'semis',
      offsetDays: 14,
      title: 'Première levée attendue',
      description: 'Les premiers brins fins apparaissent.',
      category: 'surveillance',
      priority: 'normal',
    },
    {
      id: 'carotte-semis-humidite',
      type: 'recurring',
      stage: 'semis',
      startOffsetDays: 0,
      endOffsetDays: 21,
      intervalDays: 1,
      title: 'Maintenir le substrat humide en surface',
      description: 'Vaporisateur ou arrosoir à pomme fine.',
      category: 'arrosage',
      priority: 'high',
    },
    {
      id: 'carotte-semis-croute',
      type: 'recurring',
      stage: 'semis',
      startOffsetDays: 0,
      endOffsetDays: 21,
      intervalDays: 3,
      title: 'Vérifier qu\'aucune croûte ne se forme',
      description: 'Une surface croûtée empêche la levée.',
      category: 'surveillance',
      priority: 'normal',
    },

    // ─── JEUNE PLANT ─────────────────────────────────────────
    {
      id: 'carotte-jeune-eclaircir-1',
      type: 'once',
      stage: 'jeune_plant',
      offsetDays: 21,
      title: 'Premier éclaircissage',
      description: 'Garde un plant tous les 3-4 cm. Étape clé pour avoir de belles carottes.',
      category: 'entretien',
      priority: 'high',
    },
    {
      id: 'carotte-jeune-eclaircir-2',
      type: 'once',
      stage: 'jeune_plant',
      offsetDays: 35,
      title: 'Deuxième éclaircissage',
      description: 'Espace à 5-7 cm selon la variété.',
      category: 'entretien',
      priority: 'high',
    },
    {
      id: 'carotte-jeune-paillage',
      type: 'once',
      stage: 'jeune_plant',
      offsetDays: 35,
      title: 'Ajouter une fine couche de paillage',
      description: 'Entre les rangs, limite l\'évaporation et les adventices.',
      category: 'entretien',
      priority: 'normal',
    },
    {
      id: 'carotte-jeune-arrosage',
      type: 'recurring',
      stage: 'jeune_plant',
      startOffsetDays: 21,
      endOffsetDays: 49,
      intervalDays: 3,
      title: 'Arroser au pied en pluie fine',
      description: 'Régulier et modéré, sans à-coups.',
      category: 'arrosage',
      priority: 'high',
      weatherModifier: 'canicule_daily',
    },
    {
      id: 'carotte-jeune-desherber',
      type: 'recurring',
      stage: 'jeune_plant',
      startOffsetDays: 21,
      endOffsetDays: 49,
      intervalDays: 3,
      title: 'Désherber à la main',
      description: 'Sans abîmer les jeunes racines.',
      category: 'entretien',
      priority: 'normal',
    },
    {
      id: 'carotte-jeune-mouche',
      type: 'recurring',
      stage: 'jeune_plant',
      startOffsetDays: 21,
      endOffsetDays: 49,
      intervalDays: 3,
      title: 'Surveiller la mouche de la carotte',
      description: 'Petites galeries dans les feuilles.',
      category: 'surveillance',
      priority: 'normal',
    },

    // ─── PRODUCTION ──────────────────────────────────────────
    {
      id: 'carotte-prod-buter',
      type: 'once',
      stage: 'production',
      offsetDays: 60,
      title: 'Buter légèrement',
      description: 'Ramène un peu de terre au collet pour éviter le verdissement.',
      category: 'entretien',
      priority: 'normal',
    },
    {
      id: 'carotte-prod-verif-grosseur',
      type: 'once',
      stage: 'production',
      offsetDays: 75,
      title: 'Vérifier la grosseur',
      description: 'Gratte délicatement autour d\'une racine pour estimer la taille.',
      category: 'surveillance',
      priority: 'normal',
    },
    {
      id: 'carotte-prod-arrosage',
      type: 'recurring',
      stage: 'production',
      startOffsetDays: 49,
      endOffsetDays: 98,
      intervalDays: 3,
      title: 'Arroser régulièrement sans à-coups',
      description: 'Les variations brusques font fendre les racines.',
      category: 'arrosage',
      priority: 'high',
      weatherModifier: 'canicule_daily',
    },
    {
      id: 'carotte-prod-surveillance',
      type: 'recurring',
      stage: 'production',
      startOffsetDays: 49,
      endOffsetDays: 98,
      intervalDays: 3,
      title: 'Surveiller le feuillage',
      description: 'Jaunissement, taches, parasites.',
      category: 'surveillance',
      priority: 'normal',
    },
    {
      id: 'carotte-prod-nettoyer',
      type: 'recurring',
      stage: 'production',
      startOffsetDays: 49,
      endOffsetDays: 98,
      intervalDays: 3,
      title: 'Retirer les feuilles abîmées',
      description: 'Pour limiter la propagation des maladies.',
      category: 'entretien',
      priority: 'normal',
    },

    // ─── FIN DE CYCLE ────────────────────────────────────────
    {
      id: 'carotte-fin-premiere-recolte',
      type: 'once',
      stage: 'fin_cycle',
      offsetDays: 90,
      title: 'Première récolte des plus grosses',
      description: 'Arrache celles qui dépassent, laisse les autres grossir.',
      category: 'récolte',
      priority: 'high',
    },
    {
      id: 'carotte-fin-recolte-principale',
      type: 'once',
      stage: 'fin_cycle',
      offsetDays: 105,
      title: 'Récolte principale',
      description: 'Arrache avec une fourche-bêche si la terre est tassée.',
      category: 'récolte',
      priority: 'high',
    },
    {
      id: 'carotte-fin-couper-fanes',
      type: 'once',
      stage: 'fin_cycle',
      offsetDays: 110,
      title: 'Couper les fanes',
      description: 'À 2 cm au-dessus du collet pour la conservation.',
      category: 'récolte',
      priority: 'normal',
    },
    {
      id: 'carotte-fin-stocker',
      type: 'once',
      stage: 'fin_cycle',
      offsetDays: 110,
      title: 'Stocker au frais',
      description: 'Frigo (2-3 semaines) ou dans du sable (plusieurs mois).',
      category: 'récolte',
      priority: 'normal',
    },
    {
      id: 'carotte-fin-vider-pot',
      type: 'once',
      stage: 'fin_cycle',
      offsetDays: 115,
      title: 'Vider le pot et aérer le substrat',
      description: 'Mélange-le ou laisse-le reposer avant la prochaine culture.',
      category: 'fin_cycle',
      priority: 'normal',
    },
    {
      id: 'carotte-fin-journal',
      type: 'once',
      stage: 'fin_cycle',
      offsetDays: 115,
      title: 'Noter le bilan dans le journal',
      description: 'Variété, rendement, problèmes rencontrés.',
      category: 'fin_cycle',
      priority: 'normal',
    },
    {
      id: 'carotte-fin-arrosage',
      type: 'recurring',
      stage: 'fin_cycle',
      startOffsetDays: 98,
      endOffsetDays: 105,
      intervalDays: 5,
      title: 'Arrosage réduit avant récolte',
      description: 'Concentre les sucres dans les racines.',
      category: 'arrosage',
      priority: 'normal',
    },
  ],
};

// ════════════════════════════════════════════════════════════════
// REGISTRY
// ════════════════════════════════════════════════════════════════
export const plantRules = {
  'tomate-cerise': tomateCeriseRules,
  fraise: fraiseRules,
  ciboulette: cibouletteRules,
  carotte: carotteRules,
};

export const getPlantRules = (plantId) => plantRules[plantId] ?? null;

// ════════════════════════════════════════════════════════════════
// HELPERS DATE
// ════════════════════════════════════════════════════════════════
const MS_PER_DAY = 1000 * 60 * 60 * 24;

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const diffInDays = (a, b) => Math.floor((a - b) / MS_PER_DAY);

const formatDateKey = (date) => date.toISOString().slice(0, 10); // YYYY-MM-DD

// ════════════════════════════════════════════════════════════════
// GÉNÉRATEUR PRINCIPAL
// ════════════════════════════════════════════════════════════════
/**
 * Génère les tâches concrètes pour une instance de plante.
 *
 * @param {Object} plantInstance
 * @param {string} plantInstance.id           - ID unique de l'instance
 * @param {string} plantInstance.plantId      - 'tomate_cerise' | 'fraise' | ...
 * @param {Date}   plantInstance.plantedAt    - Date de plantation
 * @param {string} [plantInstance.zoneId]     - ID de la micro-zone
 * @param {string} [plantInstance.expositionId] - ID de l'exposition
 *
 * @param {Object} [options]
 * @param {Date}   [options.until]            - Date max de génération (défaut : +12 mois)
 * @param {Object} [options.weatherData]      - Service météo avec isHeatwave(date)
 *
 * @returns {Array<Task>} Tâches triées par date croissante
 */
export function generateTasks(plantInstance, options = {}) {
  const rules = getPlantRules(plantInstance.plantId);
  if (!rules) {
    console.warn(`[plantTasks] Aucune règle trouvée pour : ${plantInstance.plantId}`);
    return [];
  }

  const plantedAt = new Date(plantInstance.plantedAt ?? plantInstance.dateAjout);
  if (isNaN(plantedAt.getTime())) {
    console.warn(`[plantTasks] plantedAt invalide pour l'instance : ${plantInstance.id}`);
    return [];
  }
  plantedAt.setHours(0, 0, 0, 0);

  const until = options.until
    ? new Date(options.until)
    : addDays(plantedAt, 365);

  const weatherData = options.weatherData ?? null;

  const tasks = [];

  for (const rule of rules.rules) {
    switch (rule.type) {
      case 'once':
        tasks.push(...generateOnce(rule, plantInstance, plantedAt, until));
        break;
      case 'recurring':
        tasks.push(...generateRecurring(rule, plantInstance, plantedAt, until, weatherData));
        break;
      case 'seasonal':
        tasks.push(...generateSeasonal(rule, plantInstance, plantedAt, until));
        break;
      default:
        console.warn(`[plantTasks] Type de règle inconnu : ${rule.type}`);
    }
  }

  return tasks.sort((a, b) => a.date - b.date);
}

// ════════════════════════════════════════════════════════════════
// GÉNÉRATEURS PAR TYPE
// ════════════════════════════════════════════════════════════════
function generateOnce(rule, plantInstance, plantedAt, until) {
  const date = addDays(plantedAt, rule.offsetDays);
  if (date > until) return [];

  return [buildTask(rule, plantInstance, date)];
}

function generateRecurring(rule, plantInstance, plantedAt, until, weatherData) {
  const startDate = addDays(plantedAt, rule.startOffsetDays);
  const endDate = addDays(plantedAt, rule.endOffsetDays);
  const generationEnd = endDate < until ? endDate : until;

  const tasks = [];
  let currentDate = new Date(startDate);

  while (currentDate <= generationEnd) {
    let interval = rule.intervalDays;

    // Modulation météo : canicule double la fréquence d'arrosage
    if (
      rule.weatherModifier === 'canicule_daily' &&
      weatherData?.isHeatwave?.(currentDate)
    ) {
      interval = 1;
    }

    tasks.push(buildTask(rule, plantInstance, new Date(currentDate)));
    currentDate = addDays(currentDate, interval);
  }

  return tasks;
}

function generateSeasonal(rule, plantInstance, plantedAt, until) {
  const tasks = [];

  let year = plantedAt.getFullYear();
  const endYear = until.getFullYear();

  while (year <= endYear) {
    const date = new Date(year, rule.triggerMonth - 1, rule.triggerDay);
    date.setHours(0, 0, 0, 0);

    if (date >= plantedAt && date <= until) {
      tasks.push(buildTask(rule, plantInstance, date));
    }
    year++;
  }

  return tasks;
}

// ════════════════════════════════════════════════════════════════
// CONSTRUCTION DE LA TÂCHE
// ════════════════════════════════════════════════════════════════
function buildTask(rule, plantInstance, date) {
  return {
    id: `${rule.id}-${plantInstance.id}-${formatDateKey(date)}`,
    ruleId: rule.id,
    plantInstanceId: plantInstance.id,
    plantId: plantInstance.plantId,
    date,
    stage: rule.stage ?? null,
    title: rule.title,
    description: rule.description,
    category: rule.category,
    priority: rule.priority,
    type: rule.type,
    isDaily: rule.type === 'recurring', // ← tâche quotidienne / récurrente
    intervalDays: rule.type === 'recurring' ? rule.intervalDays : null,
    done: false,
  };
}

// ════════════════════════════════════════════════════════════════
// HELPERS UTILITAIRES (consommés par le moteur agenda)
// ════════════════════════════════════════════════════════════════

/** Renvoie le stade actuel d'une instance à une date donnée. */
export function getCurrentStage(plantInstance, atDate = new Date()) {
  const rules = getPlantRules(plantInstance.plantId);
  if (!rules) return null;

  const plantedAt = new Date(plantInstance.plantedAt);
  plantedAt.setHours(0, 0, 0, 0);

  const daysSincePlanting = diffInDays(atDate, plantedAt);

  for (const [stageId, range] of Object.entries(rules.stages)) {
    if (daysSincePlanting >= range.startOffsetDays && daysSincePlanting < range.endOffsetDays) {
      return stageId;
    }
  }
  return null;
}

/** Renvoie les tâches d'un jour précis pour une ou plusieurs instances. */
export function getTasksForDate(plantInstances, targetDate, options = {}) {
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);
  const targetKey = formatDateKey(target);

  return plantInstances
    .flatMap((instance) => generateTasks(instance, options))
    .filter((task) => formatDateKey(task.date) === targetKey);
}
