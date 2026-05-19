import { useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Tag from '../../components/Tag/Tag'
import Button from '../../components/Button/Button'
import styles from './PlantInfosAjoutPage.module.scss'

import plants from '../../mocks/plants.json'
import { getContexteFromCatalogue } from '../../data/getCompatibilite'
import { getPlantRules } from '../../data/plantTasks'
import { parseGlossaryText } from '../../utils/parseGlossaryText'
import carotteData      from '../../data/carotte_plants.json'
import tomateCeriseData from '../../data/tomate_cerise_plants.json'
import fraiseData       from '../../data/fraise_plants.json'
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

const PLANT_EXTRAS = {
  'carotte':       carotteData,
  'tomate-cerise': tomateCeriseData,
  'fraise':        fraiseData,
}

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

const MONTH_TO_FR = [
  'janvier','fevrier','mars','avril','mai','juin',
  'juillet','aout','septembre','octobre','novembre','decembre',
]

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

const TABS = [
  { key: 'infos',          label: 'Infos' },
  { key: 'bien_commencer', label: 'Bien commencer' },
]

export default function PlantInfosAjoutPage() {
  const { id }   = useParams()
  const navigate = useNavigate()
  const { user, dispatch } = useApp()
  const [toast, setToast]         = useState(false)
  const [activeTab, setActiveTab] = useState('infos')
  const [openSections, setOpenSections] = useState(['contenant'])

  const plant = PLANTS_BY_ID[id]
  if (!plant) return <Navigate to="/ajout-plante" replace />

  const contextKey   = user.zone_id && user.exposition_id ? `${user.zone_id}_${user.exposition_id}` : null
  const catalogueCtx = contextKey ? getContexteFromCatalogue(plant.id, contextKey) : null
  const plantCtx     = contextKey ? plant.contextes?.[contextKey] ?? null : null
  const compat       = catalogueCtx?.compatibilite ?? plantCtx?.compatibilite ?? plant.compatibilite
  const difficulte   = catalogueCtx?.difficulte    ?? plantCtx?.difficulte    ?? plant.difficulte

  const extras        = PLANT_EXTRAS[plant.id] ?? null
  const contexteData  = extras && contextKey ? extras.matrice_contextes?.[contextKey] ?? null : null
  const particulars   = extras?.particularites_generales ?? null
  const bienCommencer = contexteData?.bien_commencer ?? null

  // Détecte si le mois actuel est dans la fenêtre de semis idéale
  const currentMonthFr      = MONTH_TO_FR[new Date().getMonth()]
  const moisSemisIdeal      = contexteData?.mois_semis_ideal ?? []
  const isInSowingWindow    = moisSemisIdeal.length === 0 || moisSemisIdeal.includes(currentMonthFr)

  // Pour les plantes à transplanter dont la fenêtre de semis est passée (ex: tomate cerise en mai),
  // l'utilisateur achète un jeune plant → on part du stade suivant (jeune_plant)
  // Fraise (stade_par_defaut='plantation') et carotte (semis direct) ne sont pas concernées
  const plantRuleData         = getPlantRules(plant.id)
  const needsSowingAdjustment = !isInSowingWindow
    && particulars?.transplantation === true
    && plant.stade_par_defaut === 'semis'
  const beyondSowingStage     = needsSowingAdjustment
    ? (Object.keys(plantRuleData?.stages ?? {})[1] ?? null)
    : null

  const stade       = beyondSowingStage ?? plant.stade_par_defaut
  const stadePicto  = STADE_PICTO[stade]
  const stadeLabel  = STADE_DISPLAY[stade] ?? stade
  const brunoStade  = plant[`bruno_stade_${stade}`] ?? null
  const picto       = PICTO_MAP[plant.icone]

  const compatCfg = COMPAT_CONFIG[compat.niveau] ?? COMPAT_CONFIG.ideale
  const diffCfg   = DIFF_CONFIG[difficulte.niveau] ?? DIFF_CONFIG.facile
  const CompatIcon = compatCfg.Icon
  const DiffIcon   = diffCfg.Icon

  function toggleSection(key) {
    setOpenSections(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    )
  }

  const seenTerms = new Set()

  function handleAdd() {
    // Si hors fenêtre de semis, on recule plantedAt pour que getCurrentStage()
    // renvoie directement le bon stade (jeune_plant) et que les tâches semis n'apparaissent pas
    const repiquageOffset = beyondSowingStage
      ? (plantRuleData?.stages?.[beyondSowingStage]?.startOffsetDays ?? 0)
      : 0
    const plantedAt = new Date()
    if (repiquageOffset > 0) plantedAt.setDate(plantedAt.getDate() - repiquageOffset)

    dispatch({
      type: 'ADD_PLANT_INSTANCE',
      payload: {
        id: `${Date.now()}-${plant.id}`,
        plantId: plant.id,
        stade,
        dateAjout: new Date().toISOString(),
        plantedAt: plantedAt.toISOString(),
        ...(beyondSowingStage ? { startStage: beyondSowingStage } : {}),
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

      {/* ─── Sticky header ───────────────────────────────────────── */}
      <div className={styles.stickyHeader}>

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

        {/* Tab bar */}
        <div className={styles.tabBar}>
          {TABS.map(tab => (
            <button
              key={tab.key}
              className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Contenu ─────────────────────────────────────────────── */}
      <div className={styles.content}>

        {activeTab === 'infos' && (
          <>
            {/* Bruno intro */}
            {plant.bruno_intro && (
              <div className={styles.brunoRow}>
                <img src={brunoImg} alt="Bruno" className={styles.brunoAvatar} />
                <div className={`${styles.bubble} ${styles.bubbleBeige}`}>
                  <p className={styles.bubbleText}>{parseGlossaryText(plant.bruno_intro, seenTerms)}</p>
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
                  <p className={styles.bubbleText}>{parseGlossaryText(brunoStade, seenTerms)}</p>
                </div>
              </div>
            )}

            {/* Compatibilité + Difficulté */}
            <div className={styles.statsRow}>
              {compat.niveau !== 'deconseille' && (
                <div className={`${styles.statCard} ${compatCfg.cardClass}`}>
                  <p className={styles.cardLabel}>Compatibilité</p>
                  <div className={styles.statBody}>
                    <CompatIcon width={28} height={28} aria-hidden="true" />
                    <p className={`${styles.statValue} ${compatCfg.textClass}`}>{compat.label}</p>
                  </div>
                </div>
              )}
              <div className={`${styles.statCard} ${diffCfg.cardClass}`}>
                <p className={styles.cardLabel}>Difficulté</p>
                <div className={styles.statBody}>
                  <DiffIcon width={28} height={28} aria-hidden="true" />
                  <p className={`${styles.statValue} ${diffCfg.textClass}`}>{difficulte.label}</p>
                </div>
              </div>
            </div>

            {/* Conseil Bruno contextualisé */}
            {contexteData?.conseil_bruno && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Conseil de Bruno</h2>
                <div className={styles.brunoRow}>
                  <img src={brunoImg} alt="Bruno" className={styles.brunoAvatar} />
                  <div className={`${styles.bubble} ${styles.bubbleBeige}`}>
                    <p className={styles.bubbleText}>{parseGlossaryText(contexteData.conseil_bruno, seenTerms)}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Particularités générales */}
            {particulars && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Particularités</h2>
                <div className={styles.particularsCard}>
                  <div className={styles.particularRow}>
                    <span className={styles.particularLabel}>Profondeur min.</span>
                    <span className={styles.particularValue}>{particulars.profondeur_minimum_cm} cm</span>
                  </div>
                  <div className={styles.particularRow}>
                    <span className={styles.particularLabel}>Ensoleillement</span>
                    <span className={styles.particularValue}>{particulars.ensoleillement_min_h}h – {particulars.ensoleillement_ideal_h}h / jour</span>
                  </div>
                  <div className={styles.particularRow}>
                    <span className={styles.particularLabel}>{parseGlossaryText('Substrat', seenTerms)}</span>
                    <span className={styles.particularValue}>{parseGlossaryText(particulars.substrat, seenTerms)}</span>
                  </div>
                  {'semis_direct_uniquement' in particulars && (
                    <div className={styles.particularRow}>
                      <span className={styles.particularLabel}>{parseGlossaryText('Semis direct', seenTerms)}</span>
                      <span className={styles.particularValue}>{parseGlossaryText(particulars.semis_direct_uniquement ? 'Oui — pas de transplantation' : 'Non', seenTerms)}</span>
                    </div>
                  )}
                  {'transplantation' in particulars && (
                    <div className={styles.particularRow}>
                      <span className={styles.particularLabel}>{parseGlossaryText('Transplantation', seenTerms)}</span>
                      <span className={styles.particularValue}>{particulars.transplantation ? 'Oui' : 'Non'}</span>
                    </div>
                  )}
                  {particulars.tuteurage_necessaire && (
                    <div className={styles.particularRow}>
                      <span className={styles.particularLabel}>{parseGlossaryText('Tuteurage', seenTerms)}</span>
                      <span className={styles.particularValue}>Nécessaire</span>
                    </div>
                  )}
                  {particulars.gourmands_a_pincer && (
                    <div className={styles.particularRow}>
                      <span className={styles.particularLabel}>{parseGlossaryText('Gourmands', seenTerms)}</span>
                      <span className={styles.particularValue}>{parseGlossaryText('À pincer régulièrement', seenTerms)}</span>
                    </div>
                  )}
                  {particulars.racine_superficielle && (
                    <div className={styles.particularRow}>
                      <span className={styles.particularLabel}>Racine</span>
                      <span className={styles.particularValue}>Superficielle — petit pot suffisant</span>
                    </div>
                  )}
                  {particulars.stolons && (
                    <div className={styles.particularRow}>
                      <span className={styles.particularLabel}>{parseGlossaryText('Stolons', seenTerms)}</span>
                      <span className={styles.particularValue}>Se reproduit naturellement</span>
                    </div>
                  )}
                  {particulars.pollinisation_necessaire && (
                    <div className={styles.particularRow}>
                      <span className={styles.particularLabel}>Pollinisation</span>
                      <span className={styles.particularValue}>Nécessaire (abeilles ou manuelle)</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Pot recommandé (contextualisé) */}
            {contexteData?.pot_recommande && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Pot recommandé</h2>
                <div className={styles.particularsCard}>
                  <div className={styles.particularRow}>
                    <span className={styles.particularLabel}>Type</span>
                    <span className={styles.particularValue}>{contexteData.pot_recommande.type}</span>
                  </div>
                  <div className={styles.particularRow}>
                    <span className={styles.particularLabel}>Profondeur min.</span>
                    <span className={styles.particularValue}>{contexteData.pot_recommande.profondeur_min_cm} cm</span>
                  </div>
                  {contexteData.pot_recommande.volume_min_litres && (
                    <div className={styles.particularRow}>
                      <span className={styles.particularLabel}>Volume min.</span>
                      <span className={styles.particularValue}>{contexteData.pot_recommande.volume_min_litres} L</span>
                    </div>
                  )}
                  <div className={styles.particularRow}>
                    <span className={styles.particularLabel}>Matériau</span>
                    <span className={styles.particularValue}>{contexteData.pot_recommande.materiau_conseille}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Besoins spécifiques (contextualisés) */}
            {contexteData?.besoins_specifiques?.length > 0 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Besoins spécifiques</h2>
                <ul className={styles.besoinsList}>
                  {contexteData.besoins_specifiques.map((besoin, i) => (
                    <li key={i} className={styles.besoinsItem}>{parseGlossaryText(besoin, seenTerms)}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pot et Substrat */}
            {plant.pot_substrat?.recommandation && !contexteData?.pot_recommande && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Pot et Substrat</h2>
                <div className={styles.brunoRow}>
                  <img src={brunoImg} alt="Bruno" className={styles.brunoAvatar} />
                  <div className={`${styles.bubble} ${styles.bubbleYellow}`}>
                    <p className={styles.bubbleText}>Selon moi, pour bien démarrer :</p>
                    <p className={`${styles.bubbleText} ${styles.bubbleTextBold}`}>
                      {parseGlossaryText(plant.pot_substrat.recommandation, seenTerms)}
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
          </>
        )}

        {activeTab === 'bien_commencer' && (
          <>
            {!bienCommencer ? (
              <div className={styles.comingSoon}>
                <p>Bientôt disponible</p>
              </div>
            ) : (
              <div className={styles.bienCommencer}>

                {/* Accroche */}
                <div className={styles.accrocheCard}>
                  <p className={styles.accrocheText}>{parseGlossaryText(bienCommencer.accroche, seenTerms)}</p>
                </div>

                {bienCommencer.alternative ? (
                  /* ─── Contexte déconseillé ──────────────────────── */
                  <div className={styles.section}>
                    <div className={styles.brunoRow}>
                      <img src={brunoImg} alt="Bruno" className={styles.brunoAvatar} />
                      <div className={`${styles.bubble} ${styles.bubbleBeige}`}>
                        <p className={styles.bubbleText}>{parseGlossaryText(bienCommencer.alternative.message, seenTerms)}</p>
                      </div>
                    </div>
                    {bienCommencer.alternative.plantes_conseillees?.length > 0 && (
                      <div className={styles.alternativeGrid}>
                        {bienCommencer.alternative.plantes_conseillees.map(plante => (
                          <div key={plante} className={styles.alternativePlante}>
                            {PICTO_MAP[plante] && (
                              <img src={PICTO_MAP[plante]} alt="" className={styles.alternativeIcon} />
                            )}
                            <span className={styles.alternativeLabel}>{plante}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  /* ─── Contexte favorable : accordion ────────────── */
                  <>
                    {/* Contenant */}
                    {bienCommencer.priorite_contenant && (
                      <div className={styles.accordionSection}>
                        <button
                          className={`${styles.accordionHeader} ${openSections.includes('contenant') ? styles.accordionHeaderOpen : ''}`}
                          onClick={() => toggleSection('contenant')}
                          aria-expanded={openSections.includes('contenant')}
                        >
                          <span>{bienCommencer.priorite_contenant.titre}</span>
                          <span className={`${styles.chevron} ${openSections.includes('contenant') ? styles.chevronOpen : ''}`} aria-hidden="true" />
                        </button>
                        {openSections.includes('contenant') && (
                          <div className={styles.accordionBody}>
                            <p className={styles.accordionDesc}>{parseGlossaryText(bienCommencer.priorite_contenant.description, seenTerms)}</p>
                            <div className={styles.specsGrid}>
                              {bienCommencer.priorite_contenant.profondeur_min && (
                                <div className={styles.specRow}>
                                  <span className={styles.specLabel}>Profondeur min.</span>
                                  <span className={styles.specValue}>{bienCommencer.priorite_contenant.profondeur_min}</span>
                                </div>
                              )}
                              {bienCommencer.priorite_contenant.volume_min && (
                                <div className={styles.specRow}>
                                  <span className={styles.specLabel}>Volume min.</span>
                                  <span className={styles.specValue}>{bienCommencer.priorite_contenant.volume_min}</span>
                                </div>
                              )}
                              {bienCommencer.priorite_contenant.type_recommande && (
                                <div className={styles.specRow}>
                                  <span className={styles.specLabel}>Type</span>
                                  <span className={styles.specValue}>{bienCommencer.priorite_contenant.type_recommande}</span>
                                </div>
                              )}
                              {bienCommencer.priorite_contenant.materiau && (
                                <div className={styles.specRow}>
                                  <span className={styles.specLabel}>Matériau</span>
                                  <span className={styles.specValue}>{parseGlossaryText(bienCommencer.priorite_contenant.materiau, seenTerms)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Substrat */}
                    {bienCommencer.substrat && (
                      <div className={styles.accordionSection}>
                        <button
                          className={`${styles.accordionHeader} ${openSections.includes('substrat') ? styles.accordionHeaderOpen : ''}`}
                          onClick={() => toggleSection('substrat')}
                          aria-expanded={openSections.includes('substrat')}
                        >
                          <span>{bienCommencer.substrat.titre}</span>
                          <span className={`${styles.chevron} ${openSections.includes('substrat') ? styles.chevronOpen : ''}`} aria-hidden="true" />
                        </button>
                        {openSections.includes('substrat') && (
                          <div className={styles.accordionBody}>
                            <p className={styles.accordionDesc}>{parseGlossaryText(bienCommencer.substrat.description, seenTerms)}</p>
                            {bienCommencer.substrat.melange_conseille && (
                              <div className={styles.melangeTag}>
                                <span className={styles.melangeLabel}>Mélange conseillé</span>
                                <span className={styles.melangeValue}>{parseGlossaryText(bienCommencer.substrat.melange_conseille, seenTerms)}</span>
                              </div>
                            )}
                            {bienCommencer.substrat.a_eviter?.length > 0 && (
                              <div className={styles.aEviterGroup}>
                                <p className={styles.aEviterTitle}>À éviter</p>
                                <ul className={styles.aEviterList}>
                                  {bienCommencer.substrat.a_eviter.map((item, i) => (
                                    <li key={i} className={styles.aEviterItem}>{parseGlossaryText(item, seenTerms)}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Semer */}
                    {bienCommencer.semer && (
                      <div className={styles.accordionSection}>
                        <button
                          className={`${styles.accordionHeader} ${openSections.includes('semer') ? styles.accordionHeaderOpen : ''}`}
                          onClick={() => toggleSection('semer')}
                          aria-expanded={openSections.includes('semer')}
                        >
                          <span>{bienCommencer.semer.titre}</span>
                          <span className={`${styles.chevron} ${openSections.includes('semer') ? styles.chevronOpen : ''}`} aria-hidden="true" />
                        </button>
                        {openSections.includes('semer') && (
                          <div className={styles.accordionBody}>
                            <p className={styles.accordionDesc}>{parseGlossaryText(bienCommencer.semer.description, seenTerms)}</p>
                            {bienCommencer.semer.conseils?.length > 0 && (
                              <ul className={styles.conseilsList}>
                                {bienCommencer.semer.conseils.map((conseil, i) => (
                                  <li key={i} className={styles.conseilItem}>{parseGlossaryText(conseil, seenTerms)}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Erreurs à éviter */}
                    {bienCommencer.erreurs_a_eviter?.length > 0 && (
                      <div className={styles.erreursSection}>
                        <h2 className={styles.erreursSectionTitle}>Erreurs à éviter</h2>
                        <ul className={styles.erreursList}>
                          {bienCommencer.erreurs_a_eviter.map((err, i) => (
                            <li key={i} className={styles.erreurItem}>{parseGlossaryText(err, seenTerms)}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </>
        )}

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
