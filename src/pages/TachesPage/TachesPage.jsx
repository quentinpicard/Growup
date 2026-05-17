import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { TaskCard } from '../../components/index'
import Tag from '../../components/Tag/Tag'
import styles from './TachesPage.module.scss'

import IconFilterSvg  from '../../assets/icons/Filter.svg?react'
import IconCloseSvg   from '../../assets/icons/Close_round.svg?react'
import IconBackSvg    from '../../assets/icons/Arrow_alt_lright.svg?react'
import IconPlanterSvg   from '../../assets/pictos/Planter.svg?react'
import IconArroserSvg   from '../../assets/pictos/Arroser 1.svg?react'
import IconGraineSvg    from '../../assets/pictos/Graine.svg?react'
import IconRecolterSvg  from '../../assets/pictos/Récolter.svg?react'

import { generateTasks } from '../../data/plantTasks'

// ─── Données statiques ───────────────────────────────────────────────────────

function getMonthName(offsetMonths) {
  const d = new Date()
  d.setMonth(d.getMonth() + offsetMonths)
  const name = d.toLocaleString('fr-FR', { month: 'long' })
  return name.charAt(0).toUpperCase() + name.slice(1)
}

const FILTERS = [
  { id: 'toutes',        label: 'Toutes les tâches' },
  { id: 'urgent',        label: 'Urgent' },
  { id: 'today',         label: "Aujourd'hui" },
  { id: 'tomorrow',      label: 'Demain' },
  { id: '2jours',        label: 'Dans 2 jours' },
  { id: 'recolte-cours', label: 'Récolte en cours' },
  { id: 'recolte-venir', label: 'Récolte à venir' },
  { id: 'aromatiques',   label: 'Aromatiques en cours' },
]

// Sections de la timeline dans l'ordre d'affichage
const SECTIONS = [
  { id: 'surveiller', label: 'À surveiller', variant: 'surveiller' },
  { id: 'today',      label: "Aujourd'hui" },
  { id: 'tomorrow',   label: 'Demain' },
  { id: '2-3jours',   label: 'Dans 2-3 jours' },
  { id: '1semaine',   label: 'Dans 1 semaine' },
  { id: '2semaines',  label: 'Dans 2 semaines' },
  ...Array.from({ length: 6 }, (_, i) => ({
    id:    `month-${i + 1}`,
    label: getMonthName(i + 1),
  })),
]

// Tâche d'onboarding (première connexion, aucune plante)
const ONBOARDING_TASKS = [
  {
    id:        'first-plant',
    section:   'today',
    filterTags: ['today'],
    title:     "Ajoute ta première plante",
    frequency: "Premier jour",
    duration:  "~5 min",
    conseil:   "Clique sur le plus en bas de l'écran",
    icon:      <IconPlanterSvg width={40} height={40} aria-hidden="true" />,
  },
]

// ─── Helpers tâches plantes ──────────────────────────────────────────────────

const MS_PER_DAY = 1000 * 60 * 60 * 24

const AROMATIQUES = new Set([
  'basilic', 'coriandre', 'menthe', 'origan', 'persil', 'romarin', 'thym', 'ciboulette',
])

const CATEGORY_LABELS = {
  arrosage:    'Arrosage',
  récolte:     'Récolte',
  semis:       'Semis',
  entretien:   'Entretien',
  surveillance:'Surveillance',
  fin_cycle:   'Fin de cycle',
}

function dateToSection(date, today) {
  const diff = Math.floor((date - today) / MS_PER_DAY)
  if (diff < 0)  return 'surveiller'
  if (diff === 0) return 'today'
  if (diff === 1) return 'tomorrow'
  if (diff <= 3)  return '2-3jours'
  if (diff <= 7)  return '1semaine'
  if (diff <= 14) return '2semaines'
  for (let m = 1; m <= 6; m++) {
    const limit = new Date(today)
    limit.setMonth(today.getMonth() + m)
    if (date <= limit) return `month-${m}`
  }
  return null
}

function buildFilterTags(task, section) {
  const tags = []
  if (section === 'today')    tags.push('today')
  if (section === 'tomorrow') tags.push('tomorrow')
  if (section === '2-3jours') tags.push('2jours')
  if (task.priority === 'high' && ['surveiller', 'today', 'tomorrow'].includes(section))
    tags.push('urgent')
  if (task.category === 'récolte') {
    const near = ['surveiller', 'today', 'tomorrow', '2-3jours', '1semaine', '2semaines']
    tags.push(near.includes(section) ? 'recolte-cours' : 'recolte-venir')
  }
  if (AROMATIQUES.has(task.plantId)) tags.push('aromatiques')
  return tags
}

function getCategoryIcon(category) {
  switch (category) {
    case 'arrosage':  return <IconArroserSvg  width={40} height={40} aria-hidden="true" />
    case 'récolte':   return <IconRecolterSvg width={40} height={40} aria-hidden="true" />
    case 'semis':     return <IconGraineSvg   width={40} height={40} aria-hidden="true" />
    default:          return <IconPlanterSvg  width={40} height={40} aria-hidden="true" />
  }
}

// ─── Composant ───────────────────────────────────────────────────────────────

export default function TachesPage() {
  const navigate = useNavigate()
  const { plantInstances } = useApp()

  const [showFilters, setShowFilters]     = useState(false)
  const [activeFilters, setActiveFilters] = useState(['toutes'])

  const isEmptyState = plantInstances.length === 0

  const allTasks = useMemo(() => {
    if (isEmptyState) return ONBOARDING_TASKS
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return plantInstances.flatMap(instance =>
      generateTasks(instance).flatMap(task => {
        const section = dateToSection(task.date, today)
        if (!section) return []
        if (task.intervalDays >= 1 && task.intervalDays <= 3 && !['today', 'tomorrow'].includes(section)) return []
        return [{
          ...task,
          section,
          filterTags: buildFilterTags(task, section),
          frequency: CATEGORY_LABELS[task.category] ?? null,
          conseil: task.description,
          icon: getCategoryIcon(task.category),
        }]
      })
    )
  }, [plantInstances, isEmptyState])

  const visibleTasks = allTasks.filter(task => {
    if (activeFilters.includes('toutes')) return true
    return task.filterTags.some(tag => activeFilters.includes(tag))
  })

  const getTasksForSection = (sectionId) =>
    visibleTasks.filter(t => t.section === sectionId)

  const hasAnyVisibleTask = visibleTasks.length > 0

  // Gestion des filtres
  const toggleFilter = (id) => {
    if (id === 'toutes') {
      setActiveFilters(['toutes'])
      return
    }
    setActiveFilters(prev => {
      const without = prev.filter(f => f !== 'toutes')
      if (without.includes(id)) {
        const next = without.filter(f => f !== id)
        return next.length === 0 ? ['toutes'] : next
      }
      return [...without, id]
    })
  }

  const removeFilter = (id) => {
    setActiveFilters(prev => {
      const next = prev.filter(f => f !== id)
      return next.length === 0 ? ['toutes'] : next
    })
  }

  const activeFilterLabels = FILTERS.filter(f => activeFilters.includes(f.id))

  return (
    <div className={styles.page}>

      {/* ─── Header sticky ──────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.statusBar}>
          <span className={styles.statusTime}>12:00</span>
          <div className={styles.statusIcons}>
            <span className={styles.statusIcon}>▲▲▲</span>
            <span className={styles.statusIcon}>◈</span>
            <span className={styles.statusBattery}>▊</span>
          </div>
        </div>

        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Mes Tâches</h1>
          <button
            className={styles.headerBtn}
            aria-label="Retour"
            onClick={() => navigate(-1)}
          >
            <IconBackSvg width={24} height={24} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* ─── Barre de filtres ───────────────────────────────── */}
      <div className={styles.filterBar}>
        <button
          className={styles.filterIconBtn}
          onClick={() => setShowFilters(true)}
          aria-label="Ouvrir les filtres"
        >
          <IconFilterSvg width={20} height={20} aria-hidden="true" />
        </button>

        <div className={styles.filterTags}>
          {activeFilterLabels.map(f => (
            <Tag
              key={f.id}
              color="primary"
              variant="outline"
              onRemove={f.id === 'toutes' ? undefined : () => removeFilter(f.id)}
            >
              {f.label}
            </Tag>
          ))}
        </div>
      </div>

      {/* ─── Contenu scrollable ─────────────────────────────── */}
      <main className={styles.content}>

        {/* Bannière état vide (toujours visible si pas de plantes) */}
        {isEmptyState && (
          <div className={styles.emptyBanner}>
            <p className={styles.emptyBannerText}>
              Ajoute des plantes pour pouvoir suivre les bonnes étapes afin de voir les meilleurs résultats
            </p>
          </div>
        )}

        {/* Message aucune tâche pour ce filtre */}
        {!hasAnyVisibleTask && !activeFilters.includes('toutes') && (
          <p className={styles.emptyFilter}>
            Aucune tâche pour ce filtre.
          </p>
        )}

        {/* Sections chronologiques */}
        {SECTIONS.map(section => {
          const tasks = getTasksForSection(section.id)
          if (tasks.length === 0) return null

          return (
            <section key={section.id} className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitleRow}>
                  <h2 className={styles.sectionTitle}>{section.label}</h2>
                  <span className={styles.badge}>{tasks.length}</span>
                </div>
              </div>

              <div className={styles.taskList}>
                {tasks.map(task => (
                  <TaskCard
                    key={task.id}
                    title={task.title}
                    frequency={task.frequency}
                    duration={task.duration}
                    conseil={task.conseil}
                    icon={task.icon}
                    variant={section.variant}
                  />
                ))}
              </div>
            </section>
          )
        })}

      </main>

      {/* ─── Modal filtres ──────────────────────────────────── */}
      {showFilters && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Filtres"
          onClick={(e) => e.target === e.currentTarget && setShowFilters(false)}
        >
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Filtres</h2>
              <button
                className={styles.modalClose}
                onClick={() => setShowFilters(false)}
                aria-label="Fermer les filtres"
              >
                <IconCloseSvg width={24} height={24} aria-hidden="true" />
              </button>
            </div>

            <div className={styles.filterGrid}>
              {FILTERS.map(f => {
                const isActive = activeFilters.includes(f.id)
                return (
                  <button
                    key={f.id}
                    className={`${styles.filterChip} ${isActive ? styles['filterChip--active'] : ''}`}
                    onClick={() => toggleFilter(f.id)}
                  >
                    <span>{f.label}</span>
                    <span className={styles.filterChipIcon} aria-hidden="true">
                      {isActive ? '×' : '+'}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
