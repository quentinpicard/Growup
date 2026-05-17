import carotteData from './carotte_plants.json'
import cibouletteData from './ciboulette_plants.json'
import fraiseData from './fraise_plants.json'
import tomateCeriseData from './tomate_cerise_plants.json'

const PLANT_DATA = {
  carotte: carotteData,
  ciboulette: cibouletteData,
  fraise: fraiseData,
  tomate_cerise: tomateCeriseData,
}

export function getPlantContextData(plantId, contextKey) {
  if (!plantId || !contextKey) return null
  const plantData = PLANT_DATA[plantId]
  if (!plantData) return null
  return plantData.matrice_contextes?.[contextKey] ?? null
}
