import { useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Tag from '../../components/Tag/Tag'
import Button from '../../components/Button/Button'
import styles from './PlantInfosAjoutPage.module.scss'

import plants from '../../mocks/plants.json'
import { getContexteFromCatalogue } from '../../data/getCompatibilite'
import brunoImg from '../../assets/Mascotte 1.png'

import IconArrowLeft  from '../../assets/icons/Arrow_alt_left.svg?react'
import IconCheck      from '../../assets/icons/Check_round_fill.svg?react'
import IconLol        from '../../assets/icons/Lol.svg?react'
import IconMedium     from '../../assets/icons/Medium.svg?react'
import IconSad        from '../../assets/icons/Sad.svg?react'
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

import graineSvg    from '../../assets/pictos/Graine.svg'
import planterSvg   from '../../assets/pictos/Planter.svg'
import recolterSvg  from '../../assets/pictos/Récolter.svg'
import arroserSvg   from '../../assets/pictos/Arroser 1.svg'
import bac1Svg      from '../../assets/pictos/Bac 1.svg'
import rempoterSvg  from '../../assets/pictos/Rempoter.svg'

const PLANTS_BY_ID = Object.fromEntries(plants.map(p => [p.id, p]))

const PICTO_MAP = {
  'Tomate':         tomateSvg,
  'Tomate cerise':  tomate_ceriseSvg,
  'Fraise':         fraiseSvg,
  'Courgette':      courgetteSvg,
  'Aubergine':      aubergineSvg,
  'Carotte':        carotteSvg,
  'Concombre':      concombreSvg,
  'Salade':         saladeSvg,
  'Chou':           chouSvg,
  'Courge':         courgeSvg,
  'Oignon':         oignonSvg,
  'Poireau':        poireauSvg,
  'Pomme':          pommeSvg,
  'Pomme de terre': pommeDeterreSvg,
  'Brocolie':       brocotieSvg,
  'Basilic':        basilicSvg,
  'Ciboulette':     cibouletteSvg,
  'Coriandre':      coriandreSvg,
  'Menthe':         mentheSvg,
  'Origan':         origanSvg,
  'Persil':         persilSvg,
  'Romarin':        romSvg,
  'Thym':           thymSvg,
}

const NEIGHBOR_PICTO_MAP = {
  basilic:    basilicSvg,
  carotte:    carotteSvg,
  persil:     persilSvg,
  ciboulette: cibouletteSvg,
  menthe:     mentheSvg,
  salade:     saladeSvg,
  chou:       chouSvg,
  ail:        null,
  haricot:    null,
  radis:      null,
  aneth:      null,
  fenouil:    null,
}

const STADE_PICTO = {
  semis:          graineSvg,
  jeune_plant:    bac1Svg,
  plantation:     planterSvg,
  croissance:     arroserSvg,
  floraison:      arroserSvg,
  fructification: arroserSvg,
  recolte:        recolterSvg,
  mature:         recolterSvg,
  bouturage:      planterSvg,
}

const STADE_DISPLAY = {
  semis:          'Semis',
  jeune_plant:    'Repiquage',
  plantation:     'Plantation',
  croissance:     'Croissance',
  floraison:      'Floraison',
  fructification: 'Fructification',
  recolte:        'Récolte',
  mature:         'Mature',
  bouturage:      'Bouturage',
}

const COMPAT_CONFIG = {
  ideale:      { cardClass: styles.cardGreen,  Icon: IconCheck,  textClass: styles.textGreen },
  possible:    { cardClass: styles.cardYellow, Icon: IconMedium, textClass: styles.textYellow },
  deconseille: { cardClass: styles.cardRed,    Icon: IconSad,    textClass: styles.textRed },
}

const DIFF_CONFIG = {
  facile:    { cardClass: styles.cardGreen,  Icon: IconLol,    textClass: styles.textGreen },
  moyen:     { cardClass: styles.cardYellow, Icon: IconMedium, textClass: styles.textYellow },
  difficile: { cardClass: styles.cardRed,    Icon: IconSad,    textClass: styles.textRed },
}

export default function PlantInfosAjoutPage() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const { user, dispatch } = useApp()
  const [toast, setToast] = useState(false)

  const plant = PLANTS_BY_ID[id]
  if (!plant) return <Navigate to="/ajout-plante" replace />

  const contextKey   = user.zone_id && user.exposition_id ? `${user.zone_id}_${user.exposition_id}` : null
  const catalogueCtx = contextKey ? getContexteFromCatalogue(plant.id, contextKey) : null
  const plantCtx     = contextKey ? plant.contextes?.[contextKey] ?? null : null
  const compat       = catalogueCtx?.compatibilite ?? plantCtx?.compatibilite ?? plant.compatibilite
  const difficulte   = catalogueCtx?.difficulte    ?? plantCtx?.difficulte    ?? plant.difficulte

  const stade       = plant.stade_par_defaut
  const stadePicto  = STADE_PICTO[stade]
  const stadeLabel  = STADE_DISPLAY[stade] ?? stade
  const brunoStade  = plant[`bruno_stade_${stade}`] ?? null
  const picto       = PICTO_MAP[plant.icone]

  const compatCfg = COMPAT_CONFIG[compat.niveau] ?? COMPAT_CONFIG.ideale
  const diffCfg   = DIFF_CONFIG[difficulte.niveau] ?? DIFF_CONFIG.facile
  const CompatIcon = compatCfg.Icon
  const DiffIcon   = diffCfg.Icon

  function handleAdd() {
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
    setToast(true)
    setTimeout(() => {
      setToast(false)
      navigate(`/plante/${plant.id}`)
    }, 1500)
  }

  return (
    <div className={styles.page}>

      {/* ─── Hero ────────────────────────────────────────────────── */}
      <div className={styles.hero}>
        <div className={styles.heroBg} />
        {picto && <img src={picto} alt="" aria-hidden="true" className={styles.heroPlantIcon} />}
        <div className={styles.heroActions}>
          <button className={styles.actionBtn} onClick={() => navigate(-1)} aria-label="Retour">
            <IconArrowLeft width={24} height={24} />
          </button>
        </div>
      </div>

      {/* ─── Contenu ─────────────────────────────────────────────── */}
      <div className={styles.content}>

        {/* Nom + période */}
        <div className={styles.plantHeader}>
          <div className={styles.plantNameRow}>
            <h1 className={styles.plantName}>{plant.nom}</h1>
            {picto && <img src={picto} alt="" aria-hidden="true" className={styles.plantNameIcon} />}
          </div>
          {plant.periode_plantation?.label && plant.periode_plantation.label !== 'N/A' && (
            <p className={styles.periode}>
              Planter : <span>{plant.periode_plantation.label}</span>
            </p>
          )}
        </div>

        {/* Bruno intro */}
        {plant.bruno_intro && (
          <div className={styles.brunoRow}>
            <img src={brunoImg} alt="Bruno" className={styles.brunoAvatar} />
            <div className={`${styles.bubble} ${styles.bubbleBeige}`}>
              <p className={styles.bubbleText}>{plant.bruno_intro}</p>
            </div>
          </div>
        )}

        {/* Stade de croissance */}
        <div className={styles.stadeCard}>
          <p className={styles.cardLabel}>Stade de croissance</p>
          <div className={styles.stadeBody}>
            {stadePicto && <img src={stadePicto} alt="" aria-hidden="true" className={styles.stadeIcon} />}
            <p className={styles.stadeLabel}>{stadeLabel}</p>
          </div>
        </div>

        {/* Bruno conseil stade */}
        {brunoStade && (
          <div className={styles.brunoRow}>
            <img src={brunoImg} alt="Bruno" className={styles.brunoAvatar} />
            <div className={`${styles.bubble} ${styles.bubbleBeige}`}>
              <p className={styles.bubbleText}>{brunoStade}</p>
            </div>
          </div>
        )}

        {/* Compatibilité + Difficulté */}
        <div className={styles.statsRow}>
          <div className={`${styles.statCard} ${compatCfg.cardClass}`}>
            <p className={styles.cardLabel}>Compatibilité</p>
            <div className={styles.statBody}>
              <CompatIcon width={28} height={28} aria-hidden="true" />
              <p className={`${styles.statValue} ${compatCfg.textClass}`}>{compat.label}</p>
            </div>
          </div>
          <div className={`${styles.statCard} ${diffCfg.cardClass}`}>
            <p className={styles.cardLabel}>Difficulté</p>
            <div className={styles.statBody}>
              <DiffIcon width={28} height={28} aria-hidden="true" />
              <p className={`${styles.statValue} ${diffCfg.textClass}`}>{difficulte.label}</p>
            </div>
          </div>
        </div>

        {/* Pot et Substrat */}
        {plant.pot_substrat?.recommandation && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Pot et Substrat</h2>
            <div className={styles.brunoRow}>
              <img src={brunoImg} alt="Bruno" className={styles.brunoAvatar} />
              <div className={`${styles.bubble} ${styles.bubbleYellow}`}>
                <p className={styles.bubbleText}>Selon moi, pour bien démarrer :</p>
                <p className={`${styles.bubbleText} ${styles.bubbleTextBold}`}>
                  {plant.pot_substrat.recommandation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Voisins et Guilde */}
        {plant.voisins_guilde && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Voisins et Guilde</h2>

            {plant.voisins_guilde.meilleurs_voisins?.length > 0 && (
              <div className={styles.guildeGroup}>
                <p className={styles.cardLabel}>Meilleurs voisins</p>
                <div className={styles.tagRow}>
                  {plant.voisins_guilde.meilleurs_voisins.map(nom => (
                    <Tag key={nom} color="primary" variant="filled"
                      leftIcon={
                        NEIGHBOR_PICTO_MAP[nom]
                          ? <img src={NEIGHBOR_PICTO_MAP[nom]} alt="" width={12} height={12} />
                          : null
                      }
                    >
                      {nom.charAt(0).toUpperCase() + nom.slice(1)}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            {plant.voisins_guilde.a_eviter?.length > 0 && (
              <div className={styles.guildeGroup}>
                <p className={styles.cardLabel}>À éviter</p>
                <div className={styles.tagRow}>
                  {plant.voisins_guilde.a_eviter.map(nom => (
                    <Tag key={nom} color="error" variant="filled"
                      leftIcon={
                        NEIGHBOR_PICTO_MAP[nom]
                          ? <img src={NEIGHBOR_PICTO_MAP[nom]} alt="" width={12} height={12} />
                          : null
                      }
                    >
                      {nom.charAt(0).toUpperCase() + nom.slice(1)}
                    </Tag>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* CTA */}

      </div>

      {/* ─── CTA fixe ────────────────────────────────────────────── */}
      <div className={styles.ctaWrap}>
        <Button variant="primary" fill="contained" fullWidth onClick={handleAdd}>
          Ajouter à mon jardin
        </Button>
      </div>

      {/* ─── Toast ───────────────────────────────────────────────── */}
      {toast && (
        <div className={styles.toast} role="status" aria-live="polite">
          <span className={styles.toast__icon}>✓</span>
          <span><strong>{plant.nom}</strong> ajoutée à ton jardin !</span>
        </div>
      )}

      {/* ─── Navbar ──────────────────────────────────────────────── */}
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
