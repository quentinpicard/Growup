import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import PlantSelectionCard from '../../components/Card/PlantSelectionCard'
import InputSearch from '../../components/Input/InputSearch'
import styles from './AjoutPlantePage.module.scss'

import plants from '../../mocks/plants.json'
import { getContexteFromCatalogue } from '../../data/getCompatibilite'

import IconArrowRight from '../../assets/icons/Arrow_alt_lright.svg?react'
import IconFilter     from '../../assets/icons/Filter.svg?react'
import IconHome       from '../../assets/icons/Home_fill.svg?react'
import IconJardin     from '../../assets/icons/Jardin.svg?react'
import IconCalendar   from '../../assets/icons/Date_range_fill.svg?react'
import IconUser       from '../../assets/icons/User_fill.svg?react'

import tomateSvg        from '../../assets/pictos/fruits_legumes/Tomate.svg'
import tomate_ceriseSvg from '../../assets/pictos/fruits_legumes/Tomate cerise.svg'
import fraiseSvg        from '../../assets/pictos/fruits_legumes/Fraise.svg'
import courgetteSvg     from '../../assets/pictos/fruits_legumes/Courgette.svg'
import aubergineSvg     from '../../assets/pictos/fruits_legumes/Aubergine.svg'
import carotteSvg       from '../../assets/pictos/fruits_legumes/Carotte.svg'
import concombreSvg     from '../../assets/pictos/fruits_legumes/Concombre.svg'
import saladeSvg        from '../../assets/pictos/fruits_legumes/Salade.svg'
import chouSvg          from '../../assets/pictos/fruits_legumes/Chou.svg'
import courgeSvg        from '../../assets/pictos/fruits_legumes/Courge.svg'
import oignonSvg        from '../../assets/pictos/fruits_legumes/Oignon.svg'
import poireauSvg       from '../../assets/pictos/fruits_legumes/Poireau.svg'
import pommeSvg         from '../../assets/pictos/fruits_legumes/Pomme.svg'
import pommeDeterreSvg  from '../../assets/pictos/fruits_legumes/Pomme de terre.svg'
import brocotieSvg      from '../../assets/pictos/fruits_legumes/Brocolie.svg'
import basilicSvg       from '../../assets/pictos/aromatiques/Basilic.svg'
import cibouletteSvg    from '../../assets/pictos/aromatiques/Ciboulette.svg'
import coriandreSvg     from '../../assets/pictos/aromatiques/Coriandre.svg'
import mentheSvg        from '../../assets/pictos/aromatiques/Menthe.svg'
import origanSvg        from '../../assets/pictos/aromatiques/Origan.svg'
import persilSvg        from '../../assets/pictos/aromatiques/Persil.svg'
import romSvg           from '../../assets/pictos/aromatiques/Romarin.svg'
import thymSvg          from '../../assets/pictos/aromatiques/Thym.svg'

const PICTO_MAP = {
  'Tomate':        tomateSvg,
  'Tomate cerise': tomate_ceriseSvg,
  'Fraise':        fraiseSvg,
  'Courgette':     courgetteSvg,
  'Aubergine':     aubergineSvg,
  'Carotte':       carotteSvg,
  'Concombre':     concombreSvg,
  'Salade':        saladeSvg,
  'Chou':          chouSvg,
  'Courge':        courgeSvg,
  'Oignon':        oignonSvg,
  'Poireau':       poireauSvg,
  'Pomme':         pommeSvg,
  'Pomme de terre': pommeDeterreSvg,
  'Brocolie':      brocotieSvg,
  'Basilic':       basilicSvg,
  'Ciboulette':    cibouletteSvg,
  'Coriandre':     coriandreSvg,
  'Menthe':        mentheSvg,
  'Origan':        origanSvg,
  'Persil':        persilSvg,
  'Romarin':       romSvg,
  'Thym':          thymSvg,
}

export default function AjoutPlantePage() {
  const navigate = useNavigate()
  const { user, dispatch } = useApp()
  const [search, setSearch]   = useState('')
  const [toast, setToast]     = useState(null)

  const contextKey = user.zone_id && user.exposition_id
    ? `${user.zone_id}_${user.exposition_id}`
    : null

  const filteredPlants = useMemo(() => {
    if (!search.trim()) return plants
    const q = search.trim().toLowerCase()
    return plants.filter(p => p.nom.toLowerCase().includes(q))
  }, [search])

  function handleAdd(plant) {
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
    setTimeout(() => {
      setToast(null)
      navigate(`/plante/${plant.id}`)
    }, 1500)
  }

  return (
    <div className={styles.page}>

      {/* ─── Header ─────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Sélection de plantes</h1>
          <button
            className={styles.backBtn}
            onClick={() => navigate(-1)}
            aria-label="Retour"
          >
            <IconArrowRight aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* ─── Barre de recherche ─────────────────────────────────── */}
      <div className={styles.searchRow}>
        <InputSearch
          className={styles.searchInput}
          placeholder="Rechercher une plante…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          variant="outline"
        />
        <button className={styles.filterBtn} aria-label="Filtrer" disabled>
          <IconFilter aria-hidden="true" />
        </button>
      </div>

      {/* ─── Grille de plantes ──────────────────────────────────── */}
      <main className={styles.content}>
        {filteredPlants.length === 0 ? (
          <p className={styles.emptyMsg}>Aucune plante trouvée.</p>
        ) : (
          <div className={styles.grid}>
            {filteredPlants.map((plant, index) => {
              const catalogueCtx = contextKey ? getContexteFromCatalogue(plant.id, contextKey) : null
              const compat       = catalogueCtx?.compatibilite ?? null
              const diff         = catalogueCtx?.difficulte    ?? null
              const picto        = PICTO_MAP[plant.icone]
              const colorVariant = (index % 4 === 0 || index % 4 === 3) ? 'primary' : 'tertiary'

              return (
                <PlantSelectionCard
                  key={plant.id}
                  planteName={plant.nom}
                  periode={plant.periode_plantation?.label ?? 'N/A'}
                  icon={picto ? <img src={picto} alt="" /> : null}
                  difficulte={diff?.label ?? null}
                  compatibilite={compat?.label ?? null}
                  colorVariant={colorVariant}
                  onAdd={() => handleAdd(plant)}
                  onClick={() => navigate(`/info-plante/${plant.id}`)}
                  className={styles.plantCard}
                />
              )
            })}
          </div>
        )}
      </main>

      {/* ─── Toast ──────────────────────────────────────────────── */}
      {toast && (
        <div className={styles.toast} role="status" aria-live="polite">
          <span className={styles.toast__icon}>✓</span>
          <span><strong>{toast}</strong> ajoutée à ton jardin !</span>
        </div>
      )}

      {/* ─── Navbar ─────────────────────────────────────────────── */}
      <nav className={styles.navbar} aria-label="Navigation principale">
        <button className={styles.navItem} aria-label="Accueil" onClick={() => navigate('/')}>
          <IconHome width={32} height={32} aria-hidden="true" />
        </button>
        <button className={styles.navItemActive} onClick={() => navigate('/jardin')}>
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
