import { useState, useMemo, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import PlantCard from '../../components/PlantCard/PlantCard'
import { SpeechBubble } from '../../components/index'
import styles from './JardinPage.module.scss'

import plants from '../../mocks/plants.json'
import { getContexteFromCatalogue } from '../../data/getCompatibilite'

import brunoImg     from '../../assets/Mascotte 1.png'
import IconSearch   from '../../assets/icons/Search_alt_fill.svg?react'
import IconHome     from '../../assets/icons/Home_fill.svg?react'
import IconJardin   from '../../assets/icons/Jardin.svg?react'
import IconCalendar from '../../assets/icons/Date_range_fill.svg?react'
import IconUser     from '../../assets/icons/User_fill.svg?react'
import IconAdd      from '../../assets/icons/Add_round.svg?react'
import IconClose    from '../../assets/icons/Close_round.svg?react'

const PLANTS_BY_ID = Object.fromEntries(plants.map(p => [p.id, p]))

const CATEGORY_LABELS = {
  'legume':       'Légumes',
  'legume-fruit': 'Légumes-fruits',
  'aromatique':   'Aromatiques',
  'fruit':        'Fruits',
}

const ALL_CATEGORIES = [...new Set(plants.map(p => p.categorie))]

export default function JardinPage() {
  const navigate = useNavigate()
  const { plantInstances, user } = useApp()
  const [activeCategory, setActiveCategory] = useState(null)
  const [showSearch, setShowSearch]         = useState(false)
  const [searchQuery, setSearchQuery]       = useState('')
  const searchInputRef                      = useRef(null)

  useEffect(() => {
    if (showSearch) searchInputRef.current?.focus()
  }, [showSearch])

  const closeSearch = () => {
    setShowSearch(false)
    setSearchQuery('')
  }

  const contextKey = user.zone_id && user.exposition_id
    ? `${user.zone_id}_${user.exposition_id}`
    : null

  const resolvedPlants = useMemo(() =>
    plantInstances
      .map(inst => ({ instance: inst, plant: PLANTS_BY_ID[inst.plantId] }))
      .filter(({ plant }) => Boolean(plant)),
    [plantInstances]
  )

  const categoryCounts = useMemo(() => {
    const counts = {}
    ALL_CATEGORIES.forEach(cat => { counts[cat] = 0 })
    resolvedPlants.forEach(({ plant }) => {
      if (counts[plant.categorie] !== undefined) counts[plant.categorie]++
    })
    return counts
  }, [resolvedPlants])

  const visiblePlants = useMemo(() => {
    let list = activeCategory
      ? resolvedPlants.filter(({ plant }) => plant.categorie === activeCategory)
      : resolvedPlants
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      list = list.filter(({ plant }) => plant.nom.toLowerCase().includes(q))
    }
    return list
  }, [resolvedPlants, activeCategory, searchQuery])

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
          <h1 className={styles.pageTitle}>Mon jardin</h1>
          <button
            className={styles.addPlantBtn}
            onClick={() => navigate('/ajout-plante')}
          >
            + Ajouter une plante
          </button>
        </div>

        <div className={styles.tabBar}>
          <button className={styles.tabActive}>Mes plantes</button>
        </div>
      </header>

      {/* ─── Filtres / recherche ────────────────────────────── */}
      <div className={styles.filterBar}>
        {showSearch ? (
          <>
            <span className={`${styles.filterChip} ${styles['filterChip--active']} ${styles['filterChip--icon']}`}>
              <IconSearch width={16} height={16} aria-hidden="true" />
            </span>
            <input
              ref={searchInputRef}
              type="search"
              className={styles.searchInput}
              placeholder="Rechercher une plante…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => e.key === 'Escape' && closeSearch()}
              aria-label="Rechercher une plante"
            />
            <button
              className={styles.searchCloseBtn}
              onClick={closeSearch}
              aria-label="Fermer la recherche"
            >
              <IconClose width={18} height={18} aria-hidden="true" />
            </button>
          </>
        ) : (
          <>
            <button
              className={`${styles.filterChip} ${styles['filterChip--icon']} ${!activeCategory ? styles['filterChip--active'] : ''}`}
              onClick={() => setShowSearch(true)}
              aria-label="Rechercher"
            >
              <IconSearch width={16} height={16} aria-hidden="true" />
            </button>

            {ALL_CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`${styles.filterChip} ${activeCategory === cat ? styles['filterChip--active'] : ''}`}
                onClick={() => setActiveCategory(prev => prev === cat ? null : cat)}
              >
                <strong className={styles.filterCount}>{categoryCounts[cat]}</strong>
                <span>{CATEGORY_LABELS[cat] ?? cat}</span>
              </button>
            ))}
          </>
        )}
      </div>

      {/* ─── Contenu ────────────────────────────────────────── */}
      <main className={styles.content}>
        <p className={styles.plantCount}>
          <strong>{visiblePlants.length}</strong>{' '}
          Plante{visiblePlants.length !== 1 ? 's' : ''}
        </p>

        {visiblePlants.length === 0 ? (
          <div className={styles.emptyState}>
            <img
              src={brunoImg}
              alt="Bruno le brocoli"
              className={styles.brunoImg}
              aria-hidden="true"
            />
            <SpeechBubble>
              C&apos;est calme pour l&apos;instant. Ajoute une plante et on s&apos;occupe du reste.
            </SpeechBubble>
          </div>
        ) : (
          <div className={styles.plantGrid}>
            {visiblePlants.map(({ instance, plant }, index) => {
              const contexte     = contextKey ? getContexteFromCatalogue(plant.id, contextKey) ?? plant.contextes?.[contextKey] ?? null : null
              const colorVariant = (index % 4 === 0 || index % 4 === 3) ? 'primary' : 'tertiary'
              return (
                <PlantCard
                  key={instance.id}
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
      </main>

      {/* ─── FAB ────────────────────────────────────────────── */}
      <button
        className={styles.fab}
        onClick={() => navigate('/ajout-plante')}
        aria-label="Ajouter une plante"
      >
        <IconAdd width={32} height={32} aria-hidden="true" />
      </button>

      {/* ─── Navbar ─────────────────────────────────────────── */}
      <nav className={styles.navbar} aria-label="Navigation principale">
        <button className={styles.navItem} aria-label="Accueil" onClick={() => navigate('/')}>
          <IconHome width={32} height={32} aria-hidden="true" />
        </button>
        <button className={styles.navItemActive} aria-current="page">
          <IconJardin width={32} height={32} aria-hidden="true" />
          <span className={styles.navLabel}>Jardin</span>
        </button>
        <button className={styles.navItem} aria-label="Tâches" onClick={() => navigate('/taches')}>
          <IconCalendar width={32} height={32} aria-hidden="true" />
        </button>
        <button className={styles.navItem} aria-label="Profil">
          <IconUser width={32} height={32} aria-hidden="true" />
        </button>
      </nav>

    </div>
  )
}
