import catalogue from './catalogue_compatibilite.json'

const COMPAT_LABELS = {
  ideale:      'Idéale',
  possible:    'Possible',
  deconseille: 'Déconseillée',
}

const DIFF_LABELS = {
  facile:    'Facile',
  moyen:     'Moyen',
  difficile: 'Difficile',
}

export function getContexteFromCatalogue(plantId, contextKey) {
  if (!contextKey) return null
  const catalogueKey = plantId.replace(/-/g, '_')
  const plantData = catalogue.plantes[catalogueKey]
  if (!plantData || !plantData[contextKey]) return null
  const { compatibilite, difficulte } = plantData[contextKey]
  return {
    compatibilite: { niveau: compatibilite, label: COMPAT_LABELS[compatibilite] ?? compatibilite },
    difficulte:    { niveau: difficulte,    label: DIFF_LABELS[difficulte]    ?? difficulte    },
  }
}
