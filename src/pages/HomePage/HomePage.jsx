import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import useWeather from '../../hooks/useWeather'
import PlantCard from '../../components/PlantCard/PlantCard'
import styles from './HomePage.module.scss'

import plants from '../../mocks/plants.json'
import zones  from '../../data/zones.json'

import brunoImg from '../../assets/Mascotte 1.png'

import IconHome    from '../../assets/icons/Home_fill.svg?react'
import IconJardin  from '../../assets/icons/Jardin.svg?react'
import IconCalendar from '../../assets/icons/Date_range_fill.svg?react'
import IconUser    from '../../assets/icons/User_fill.svg?react'
import IconCloud   from '../../assets/icons/Cloud_fill.svg?react'
import IconDesk    from '../../assets/icons/Desk_alt_fill.svg?react'
import IconAdd     from '../../assets/icons/Add_round.svg?react'

export default function HomePage() {
  const navigate      = useNavigate()
  const { user, plantInstances } = useApp()
  const [taskDone, setTaskDone] = useState(false)
  const { temp, message: weatherMsg, loading: weatherLoading } = useWeather(user.city)

  // — Contexte plante
  const cleContexte = user.zone_id && user.exposition_id
    ? `${user.zone_id}_${user.exposition_id}`
    : null

  const plantesRecommandees = plants.filter(plant => {
    if (!cleContexte) return true
    const ctx = plant.contextes?.[cleContexte]
    if (!ctx) return plant.compatibilite.niveau !== 'deconseille'
    return ctx.compatibilite.niveau !== 'deconseille'
  })

  // — Nom de zone affiché
  const nomZone = cleContexte
    ? zones.find(z => z.id === user.zone_id)?.nom_zone?.[user.exposition_id] ?? null
    : null

  const messageBruno = nomZone
    ? `Avec ${nomZone}, t'as de quoi bien démarrer. Voilà ce qui pousse ici.`
    : "Dis-moi où tu jardines et je t'aide à choisir les bonnes plantes."

  const isEmptyState = plantInstances.length === 0

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

        {/* Status bar */}
        <div className={styles.statusBar}>
          <span className={styles.statusTime}>12:00</span>
          <div className={styles.statusIcons}>
            <span className={styles.statusIcon}>▲▲▲</span>
            <span className={styles.statusIcon}>◈</span>
            <span className={styles.statusBattery}>▊</span>
          </div>
        </div>

        {/* Greeting + agenda button */}
        <div className={styles.greeting}>
          <div className={styles.agendaBtnWrapper}>
            <button
              className={styles.agendaBtn}
              aria-label="Mes tâches"
              onClick={() => navigate('/taches')}
            >
              <IconDesk width={24} height={24} aria-hidden="true" />
              <span className={styles.agendaBadge}>1</span>
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
              <span className={styles.badge}>1</span>
            </div>
            <button className={styles.iconBtn} aria-label="Voir les tâches" onClick={() => navigate('/taches')}>
              <IconDesk width={24} height={24} aria-hidden="true" />
            </button>
          </div>

          {isEmptyState && (
            <button
              className={`${styles.taskCard} ${taskDone ? styles.taskCardDone : ''}`}
              onClick={() => setTaskDone(v => !v)}
            >
              <div className={styles.taskCardLeft}>
                <div className={styles.taskMeta}>
                  <span className={styles.taskTag}>Premier jour</span>
                  <span className={styles.taskDuration}>~5 min</span>
                </div>
                <p className={styles.taskTitle}>Ajoute ta première plante</p>
                <p className={styles.taskSubtitle}>Appuie sur le + en bas pour commencer.</p>
              </div>
              <div
                className={`${styles.taskCheckbox} ${taskDone ? styles.taskCheckboxDone : ''}`}
                aria-hidden="true"
              />
            </button>
          )}
        </section>

        {/* Section Jardin */}
        <section className={styles.sectionJardin}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Jardin</h2>
            <button className={styles.iconBtn} aria-label="Voir le jardin">
              <IconJardin width={24} height={24} aria-hidden="true" />
            </button>
          </div>

          <div className={styles.mascotteMsg}>
            <img src={brunoImg} alt="" className={styles.mascotteMini} aria-hidden="true" />
            <div className={styles.bubbleBeige}>
              <p className={styles.bubbleText}>
                C'est calme pour l'instant. Ajoute une plante et on s'occupe du reste.
              </p>
            </div>
          </div>
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
              const contexte     = cleContexte ? plant.contextes?.[cleContexte] ?? null : null
              const colorVariant = (index % 4 === 0 || index % 4 === 3) ? 'primary' : 'tertiary'
              return (
                <PlantCard
                  key={plant.id}
                  plant={plant}
                  contexte={contexte}
                  colorVariant={colorVariant}
                  variant="add"
                  onAdd={() => navigate('/ajout-plante')}
                />
              )
            })}
          </div>
        </section>
      </main>

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
