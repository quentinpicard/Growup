import { createContext, useContext, useReducer } from 'react'
import { getProfile } from '../utils/storage'

const LOCATION_TO_ZONE_ID = {
  fenetre:   'rebord_ext_fenetre',
  balcon:    'balcon_terrasse',
  interieur: 'interieur_fenetre',
  jardin:    'jardin',
  autre:     null,
}

const LIGHT_TO_EXPOSITION_ID = {
  fenetre: {
    direct:   'sud',
    indirect: 'est',
    ombre:    'nord',
  },
  balcon: {
    moins_2h: 'nord',
    '2_4h':   'est',
    plus_4h:  'sud',
  },
  interieur: {
    sud:       'sud',
    est_ouest: 'est',
    nord:      'nord',
    sais_pas:  'est',
  },
  jardin: {
    plein_soleil: 'plein_soleil',
    mi_ombre:     'mi_ombre',
    ombre:        'ombre',
  },
  autre: {
    bien_eclaire: 'sud',
    moyen:        'est',
    sombre:       'nord',
  },
}

function mapOnboardingToUserProfile({ location, light, prenom, city }) {
  const zone_id = LOCATION_TO_ZONE_ID[location] ?? null
  const expositionMap = LIGHT_TO_EXPOSITION_ID[location] ?? {}
  const exposition_id = expositionMap[light] ?? null
  return { prenom: prenom ?? null, zone_id, exposition_id, city: city ?? null }
}

const BASE_STATE = {
  user: {
    prenom: null,
    zone_id: null,
    exposition_id: null,
    city: null,
    onboarding_complete: false,
  },
  zones: [],
  plantInstances: [],
  tasks: [],
}

function getInitialState() {
  const saved = getProfile()
  if (saved?.onboardingDone) {
    const profile = mapOnboardingToUserProfile({
      prenom:   saved.prenom ?? null,
      location: saved.location,
      light:    saved.light,
      city:     saved.city ?? null,
    })
    return {
      ...BASE_STATE,
      user: { ...profile, onboarding_complete: true },
    }
  }
  return BASE_STATE
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ONBOARDING_COMPLETE': {
      const profile = mapOnboardingToUserProfile({
        ...action.payload,
        city: action.payload.city ?? null,
      })
      return {
        ...state,
        user: { ...state.user, ...profile, onboarding_complete: true },
      }
    }
    case 'ADD_ZONE':
      return { ...state, zones: [...state.zones, action.payload] }
    case 'ADD_PLANT_INSTANCE':
      return { ...state, plantInstances: [...state.plantInstances, action.payload] }
    case 'COMPLETE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload.taskId ? { ...t, completed: true } : t
        ),
      }
    case 'RESET_ONBOARDING':
      return BASE_STATE
    default:
      return state
  }
}

export const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, getInitialState)
  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
