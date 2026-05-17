import { useState, useRef, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import useWeather from '../../hooks/useWeather'
import PlantCard from '../../components/PlantCard/PlantCard'
import TaskCard from '../../components/Card/TaskCard'
import { generateTasks, getPlantRules } from '../../data/plantTasks'
import styles from './HomePage.module.scss'

import plants from '../../mocks/plants.json'
import zones   from '../../data/zones.json'
import { getContexteFromCatalogue } from '../../data/getCompatibilite'

const PLANTS_BY_ID = Object.fromEntries(plants.map(p => [p.id, p]))

import brunoImg from '../../assets/Mascotte 1.png'

import IconHome     from '../../assets/icons/Home_fill.svg?react'
import IconJardin   from '../../assets/icons/Jardin.svg?react'
import IconCalendar from '../../assets/icons/Date_range_fill.svg?react'
import IconUser     from '../../assets/icons/User_fill.svg?react'
import IconCloud    from '../../assets/icons/Cloud_fill.svg?react'
import IconDesk     from '../../assets/icons/Desk_alt_fill.svg?react'
import IconAdd      from '../../assets/icons/Add_round.svg?react'

import IconPlanterSvg  from '../../assets/pictos/Planter.svg?react'
import IconArroserSvg  from '../../assets/pictos/Arroser 1.svg?react'
import IconGraineSvg   from '../../assets/pictos/Graine.svg?react'
import IconRecolterSvg from '../../assets/pictos/Récolter.svg?react'

import PictoTomateCerise from '../../assets/pictos/fruits_legumes/Tomate cerise.svg?react'
import PictoFraise       from '../../assets/pictos/fruits_legumes/Fraise.svg?react'
import PictoCarotte      from '../../assets/pictos/fruits_legumes/Carotte.svg?react'
import PictoCiboulette   from '../../assets/pictos/aromatiques/Ciboulette.svg?react'

// ─── Constantes tâches ────────────────────────────────────────────────────────

const MS_PER_DAY = 1000 * 60 * 60 * 24
const SECTION_ORDER = { surveiller: 0, today: 1, tomorrow: 2 }

const CATEGORY_LABELS = {
  arrosage:    'Arrosage',
  récolte:     'Récolte',
  semis:       'Semis',
  entretien:   'Entretien',
  surveillance:'Surveillance',
  fin_cycle:   'Fin de cycle',
}

const PLANT_PICTOS = {
  'tomate-cerise': <PictoTomateCerise width={12} height={12} aria-hidden="true" />,
  'fraise':        <PictoFraise       width={12} height={12} aria-hidden="true" />,
  'carotte':       <PictoCarotte      width={12} height={12} aria-hidden="true" />,
  'ciboulette':    <PictoCiboulette   width={12} height={12} aria-hidden="true" />,
}

function dateToSection(date, today) {
  const diff = Math.floor((date - today) / MS_PER_DAY)
  if (diff < 0)   return 'surveiller'
  if (diff === 0) return 'today'
  if (diff === 1) return 'tomorrow'
  return null
}

function getCategoryIcon(category) {
  switch (category) {
    case 'arrosage': return <IconArroserSvg  width={40} height={40} aria-hidden="true" />
    case 'récolte':  return <IconRecolterSvg width={40} height={40} aria-hidden="true" />
    case 'semis':    return <IconGraineSvg   width={40} height={40} aria-hidden="true" />
    default:         return <IconPlanterSvg  width={40} height={40} aria-hidden="true" />
  }
}

function urgencyComparator(a, b) {
  if (a.priority === 'high' && b.priority !== 'high') return -1
  if (b.priority === 'high' && a.priority !== 'high') return 1
  const sa = SECTION_ORDER[a.section] ?? 99
  const sb = SECTION_ORDER[b.section] ?? 99
  if (sa !== sb) return sa - sb
  return a.date - b.date
}

// Sélectionne les tâches pour la home :
// — au moins 1 tâche par plante distincte (jusqu'à 5 plantes garanties)
// — puis remplit les slots restants avec les suivantes les plus urgentes
function buildHomeTaskPool(sortedTasks, plantInstances) {
  const numPlants = new Set(plantInstances.map(i => i.plantId)).size
  const guarantee = Math.min(numPlants, 5)

  const guaranteedTasks = []
  const coveredPlants   = new Set()
  const remainingTasks  = []

  for (const task of sortedTasks) {
    if (guaranteedTasks.length < guarantee && !coveredPlants.has(task.plantId)) {
      guaranteedTasks.push(task)
      coveredPlants.add(task.plantId)
    } else {
      remainingTasks.push(task)
    }
  }

  guaranteedTasks.sort(urgencyComparator)
  return [...guaranteedTasks, ...remainingTasks]
}

// ─── Composant ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const navigate = useNavigate()
  const { user, plantInstances, dispatch } = useApp()
  const [toast, setToast]               = useState(null)
  const [checkedTaskIds, setCheckedTaskIds] = useState(new Set())

  const { temp, message: weatherMsg, loading: weatherLoading } = useWeather(user.city)

  // — Contexte plante
  const cleContexte = user.zone_id && user.exposition_id
    ? `${user.zone_id}_${user.exposition_id}`
    : null

  // — Labels d'instances (gère les doublons ex: "Tomate cerise #2")
  const instanceLabels = useMemo(() => {
    const counts = {}
    for (const inst of plantInstances) {
      const name = getPlantRules(inst.plantId)?.plantName ?? inst.plantId
      counts[name] = (counts[name] ?? 0) + 1
    }
    const nums   = {}
    const labels = {}
    for (const inst of plantInstances) {
      const name = getPlantRules(inst.plantId)?.plantName ?? inst.plantId
      if (counts[name] > 1) {
        nums[name]    = (nums[name] ?? 0) + 1
        labels[inst.id] = `${name} #${nums[name]}`
      } else {
        labels[inst.id] = name
      }
    }
    return labels
  }, [plantInstances])

  // — Pool de tâches pour la home (surveiller + today + tomorrow, triées + règle 1/plante)
  const homeTaskPool = useMemo(() => {
    if (plantInstances.length === 0) return []

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const rawTasks = plantInstances.flatMap(inst =>
      generateTasks(inst).flatMap(task => {
        const section = dateToSection(task.date, today)
        if (!section) return []
        return [{ ...task, section }]
      })
    )

    rawTasks.sort(urgencyComparator)
    return buildHomeTaskPool(rawTasks, plantInstances)
  }, [plantInstances])

  // — Les 5 premières tâches non cochées
  const visibleHomeTasks = useMemo(
    () => homeTaskPool.filter(t => !checkedTaskIds.has(t.id)).slice(0, 5),
    [homeTaskPool, checkedTaskIds]
  )

  const handleCheckTask = useCallback((taskId) => {
    setCheckedTaskIds(prev => new Set([...prev, taskId]))
  }, [])

  // — Ajouter une plante depuis la home
  const handleAddPlant = useCallback((plant) => {
    dispatch({
      type: 'ADD_PLANT_INSTANCE',
      payload: {
        id: `${Date.now()}-${plant.id}`,
        plantId: plant.id,
        stade: plant.stade_par_defaut,
        dateAjout: new Date().toISOString(),
        plantedAt: new Date().toISOString(),
      },
    })
    setToast(plant.nom)
    setTimeout(() => setToast(null), 2000)
  }, [dispatch])

  const plantesRecommandees = useMemo(() => {
    if (!cleContexte) return plants

    const idealeFacile = plants.filter(plant => {
      const ctx = getContexteFromCatalogue(plant.id, cleContexte)
      return ctx?.compatibilite.niveau === 'ideale' && ctx?.difficulte.niveau === 'facile'
    })

    if (idealeFacile.length > 0) return idealeFacile

    return plants.filter(plant => {
      const ctx = getContexteFromCatalogue(plant.id, cleContexte)
      if (!ctx) return plant.compatibilite?.niveau !== 'deconseille'
      return ctx.compatibilite.niveau !== 'deconseille'
    })
  }, [cleContexte])

  const nomZone = cleContexte
    ? zones.find(z => z.id === user.zone_id)?.nom_zone?.[user.exposition_id] ?? null
    : null

  const messageBruno = nomZone
    ? `Avec ${nomZone}, t'as de quoi bien démarrer. Voilà ce qui pousse ici.`
    : "Dis-moi où tu jardines et je t'aide à choisir les bonnes plantes."

  const isEmptyState = plantInstances.length === 0

  const myPlants = plantInstances
    .map(inst => ({ inst, plant: PLANTS_BY_ID[inst.plantId] }))
    .filter(({ plant }) => plant != null)

  const touchStartX = useRef(null)

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = e.changedTouches[0].clientX - touchStartX.current
    if (diff > 80) navigate('/taches')
    touchStartX.current = null
  }

  return (
    <div
      className={styles.page}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >

      {/* ─── Header sticky ──────────────────────────────────── */}
      <header className={styles.header}>

        {/* Greeting + agenda button */}
        <div className={styles.greeting}>
          <div className={styles.agendaBtnWrapper}>
            <button
              className={styles.agendaBtn}
              aria-label="Mes tâches"
              onClick={() => navigate('/taches')}
            >
              <IconDesk width={24} height={24} aria-hidden="true" />
              {visibleHomeTasks.length > 0 && (
                <span className={styles.agendaBadge}>{visibleHomeTasks.length}</span>
              )}
            </button>
          </div>

          <div className={styles.greetingText}>
            <p className={styles.greetingHello}>Bonjour !</p>
            <p className={styles.greetingName}>{user.prenom ?? 'toi'}</p>
          </div>
        </div>

        {/* Weather banner */}
        <div className={styles.weather}>
          <div className={styles.weatherInner}>
            <div className={styles.weatherTempGroup}>
              {user.city && <p className={styles.weatherCity}>{user.city}</p>}
              <div className={styles.weatherTemp}>
                <IconCloud width={24} height={24} className={styles.weatherIcon} aria-hidden="true" />
                <span className={styles.weatherDegrees}>
                  {weatherLoading ? '…' : temp !== null ? `${temp}°c` : '—'}
                </span>
              </div>
            </div>
            <p className={styles.weatherMsg}>
              {weatherLoading
                ? 'Chargement de la météo…'
                : weatherMsg ?? (user.city ? 'Météo indisponible.' : 'Renseigne ta ville pour la météo.')}
            </p>
          </div>
        </div>
      </header>

      {/* ─── Contenu scrollable ─────────────────────────────── */}
      <main className={styles.content}>

        {/* Section Tâches */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <h2 className={styles.sectionTitle}>Tâches</h2>
              {visibleHomeTasks.length > 0 && (
                <span className={styles.badge}>{visibleHomeTasks.length}</span>
              )}
            </div>
            <button className={styles.iconBtn} aria-label="Voir les tâches" onClick={() => navigate('/taches')}>
              <IconDesk width={24} height={24} aria-hidden="true" />
            </button>
          </div>

          {isEmptyState ? (
            <div className={styles.taskList}>
              <TaskCard
                title="Ajouter ta première plante"
                conseil="Commence ton jardin dès maintenant"
                icon={<IconPlanterSvg width={40} height={40} aria-hidden="true" />}
                onChange={() => navigate('/ajout-plante')}
              />
            </div>
          ) : visibleHomeTasks.length === 0 ? (
            <p className={styles.emptyTaskMsg}>
              Toutes les tâches du jour sont faites !
            </p>
          ) : (
            <div className={styles.taskList}>
              {visibleHomeTasks.map(task => (
                <TaskCard
                  key={task.id}
                  title={task.title}
                  frequency={CATEGORY_LABELS[task.category] ?? null}
                  conseil={task.description}
                  icon={getCategoryIcon(task.category)}
                  plantLabel={instanceLabels[task.plantInstanceId]}
                  plantIcon={PLANT_PICTOS[task.plantId] ?? null}
                  variant={task.section === 'surveiller' ? 'surveiller' : undefined}
                  onChange={(checked) => { if (checked) handleCheckTask(task.id) }}
                />
              ))}
            </div>
          )}
        </section>

        {/* Section Jardin */}
        <section className={styles.sectionJardin}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleRow}>
              <h2 className={styles.sectionTitle}>Jardin</h2>
              {!isEmptyState && (
                <span className={styles.badge}>{myPlants.length}</span>
              )}
            </div>
            <button className={styles.iconBtn} aria-label="Voir le jardin" onClick={() => navigate('/jardin')}>
              <IconJardin width={24} height={24} aria-hidden="true" />
            </button>
          </div>

          {isEmptyState ? (
            <div className={styles.mascotteMsg}>
              <img src={brunoImg} alt="" className={styles.mascotteMini} aria-hidden="true" />
              <div className={styles.bubbleBeige}>
                <p className={styles.bubbleText}>
                  C'est calme pour l'instant. Ajoute une plante et on s'occupe du reste.
                </p>
              </div>
            </div>
          ) : (
            <div className={styles.plantGrid}>
              {myPlants.map(({ inst, plant }, index) => {
                const contexte    = cleContexte ? getContexteFromCatalogue(plant.id, cleContexte) : null
                const colorVariant = (index % 4 === 0 || index % 4 === 3) ? 'primary' : 'tertiary'
                return (
                  <PlantCard
                    key={inst.id}
                    plant={plant}
                    contexte={contexte}
                    colorVariant={colorVariant}
                    variant="link"
                    onAdd={() => navigate(`/plante/${plant.id}`)}
                  />
                )
              })}
            </div>
          )}
        </section>

        {/* Section Recommandation */}
        <section className={styles.sectionReco}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recommandation</h2>
          </div>

          <div className={styles.recoRow}>
            <div className={styles.bubbleGreen}>
              <p className={styles.bubbleText}>{messageBruno}</p>
            </div>
          </div>

          <img
            src={brunoImg}
            alt="Bruno le brocoli"
            className={styles.mascotteReco}
            aria-hidden="true"
          />

          <div className={styles.plantGrid}>
            {plantesRecommandees.map((plant, index) => {
              const contexte     = cleContexte ? getContexteFromCatalogue(plant.id, cleContexte) : null
              const colorVariant = (index % 4 === 0 || index % 4 === 3) ? 'primary' : 'tertiary'
              return (
                <PlantCard
                  key={plant.id}
                  plant={plant}
                  contexte={contexte}
                  colorVariant={colorVariant}
                  variant="add"
                  onAdd={() => handleAddPlant(plant)}
                  onClick={() => navigate(`/info-plante/${plant.id}`)}
                />
              )
            })}
          </div>
        </section>
      </main>

      {/* ─── Toast ──────────────────────────────────────────── */}
      {toast && (
        <div className={styles.toast} role="status" aria-live="polite">
          <span className={styles.toastIcon}>✓</span>
          <span><strong>{toast}</strong> ajoutée à ton jardin !</span>
        </div>
      )}

      {/* ─── Bouton + flottant ──────────────────────────────── */}
      <button
        className={styles.fab}
        onClick={() => navigate('/ajout-plante')}
        aria-label="Ajouter une plante"
      >
        <IconAdd width={32} height={32} aria-hidden="true" />
      </button>

      {/* ─── NavBar ─────────────────────────────────────────── */}
      <nav className={styles.navbar} aria-label="Navigation principale">
        <button className={styles.navItemActive} aria-current="page">
          <IconHome width={32} height={32} aria-hidden="true" />
          <span className={styles.navLabel}>Accueil</span>
        </button>
        <button className={styles.navItem} aria-label="Jardin" onClick={() => navigate('/jardin')}>
          <IconJardin width={32} height={32} aria-hidden="true" />
        </button>
        <button className={styles.navItem} aria-label="Calendrier">
          <IconCalendar width={32} height={32} aria-hidden="true" />
        </button>
        <button className={styles.navItem} aria-label="Profil">
          <IconUser width={32} height={32} aria-hidden="true" />
        </button>
      </nav>
    </div>
  )
}
