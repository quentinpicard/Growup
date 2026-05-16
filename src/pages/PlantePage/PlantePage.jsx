import { useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Tag from '../../components/Tag/Tag'
import { TaskCard } from '../../components'
import plants from '../../mocks/plants.json'
import styles from './PlantePage.module.scss'

import brunoImg from '../../assets/Mascotte 1.png'

import IconArrowLeft  from '../../assets/icons/Arrow_alt_left.svg?react'
import IconMenu       from '../../assets/icons/Meatballs_menu.svg?react'
import IconEdit       from '../../assets/icons/Edit_fill.svg?react'
import IconSun        from '../../assets/icons/Sun_fill.svg?react'
import IconCheck      from '../../assets/icons/Check_round_fill.svg?react'
import IconClose      from '../../assets/icons/Close_round.svg?react'
import IconHome       from '../../assets/icons/Home_fill.svg?react'
import IconJardin     from '../../assets/icons/Jardin.svg?react'
import IconCalendar   from '../../assets/icons/Date_range_fill.svg?react'
import IconUser       from '../../assets/icons/User_fill.svg?react'
import IconLol        from '../../assets/icons/Lol.svg?react'
import IconMedium     from '../../assets/icons/Medium.svg?react'
import IconSad        from '../../assets/icons/Sad.svg?react'
import IconRecolte    from '../../assets/pictos/Récolter.svg'

import tomateSvg       from '../../assets/pictos/fruits_legumes/Tomate.svg'
import tomate_ceriseSvg from '../../assets/pictos/fruits_legumes/Tomate cerise.svg'
import fraiseSvg       from '../../assets/pictos/fruits_legumes/Fraise.svg'
import courgetteSvg    from '../../assets/pictos/fruits_legumes/Courgette.svg'
import aubergineSvg    from '../../assets/pictos/fruits_legumes/Aubergine.svg'
import carotteSvg      from '../../assets/pictos/fruits_legumes/Carotte.svg'
import concombreSvg    from '../../assets/pictos/fruits_legumes/Concombre.svg'
import saladeSvg       from '../../assets/pictos/fruits_legumes/Salade.svg'
import chouSvg         from '../../assets/pictos/fruits_legumes/Chou.svg'
import courgeSvg       from '../../assets/pictos/fruits_legumes/Courge.svg'
import oignonSvg       from '../../assets/pictos/fruits_legumes/Oignon.svg'
import poireauSvg      from '../../assets/pictos/fruits_legumes/Poireau.svg'
import pommeSvg        from '../../assets/pictos/fruits_legumes/Pomme.svg'
import basilicSvg      from '../../assets/pictos/aromatiques/Basilic.svg'
import cibouletteSvg   from '../../assets/pictos/aromatiques/Ciboulette.svg'
import coriandreSvg    from '../../assets/pictos/aromatiques/Coriandre.svg'
import mentheSvg       from '../../assets/pictos/aromatiques/Menthe.svg'
import origanSvg       from '../../assets/pictos/aromatiques/Origan.svg'
import persilSvg       from '../../assets/pictos/aromatiques/Persil.svg'
import romSvg          from '../../assets/pictos/aromatiques/Romarin.svg'
import thymSvg         from '../../assets/pictos/aromatiques/Thym.svg'

import arroserSvg      from '../../assets/pictos/Arroser 3.svg'
import planterSvg      from '../../assets/pictos/Planter.svg'
import rempoterSvg     from '../../assets/pictos/Rempoter.svg'

const PLANTS_BY_ID = Object.fromEntries(plants.map(p => [p.id, p]))

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
  'Basilic':       basilicSvg,
  'Ciboulette':    cibouletteSvg,
  'Coriandre':     coriandreSvg,
  'Menthe':        mentheSvg,
  'Origan':        origanSvg,
  'Persil':        persilSvg,
  'Romarin':       romSvg,
  'Thym':          thymSvg,
}

const NEIGHBOR_PICTO_MAP = {
  basilic:    basilicSvg,
  carotte:    carotteSvg,
  persil:     persilSvg,
  ciboulette: cibouletteSvg,
  menthe:     mentheSvg,
  ail:        null,
  salade:     saladeSvg,
  chou:       chouSvg,
  haricot:    null,
  radis:      null,
  aneth:      null,
  fenouil:    null,
}

const STADE_DISPLAY = {
  semis:         'Semis',
  jeune_plant:   'Repiquage',
  plantation:    'Plantation',
  croissance:    'Croissance',
  floraison:     'Floraison',
  fructification:'Fructif.',
  recolte:       'Récolte',
  mature:        'Mature',
}

const ETAT_CONFIG = {
  bien:      { label: 'Bien',          Icon: IconLol,    cardClass: styles.etatCardGreen,  textClass: styles.etatTextGreen },
  moyen:     { label: 'Moyen',         Icon: IconMedium, cardClass: styles.etatCardYellow, textClass: styles.etatTextYellow },
  difficile: { label: 'En difficulté', Icon: IconSad,    cardClass: styles.etatCardRed,    textClass: styles.etatTextRed },
}

const ZONE_LABELS = {
  balcon_terrasse:     'Balcon',
  rebord_ext_fenetre:  'Rebord ext.',
  interieur_fenetre:   'Intérieur',
  jardin:              'Jardin',
}

const EXPOSITION_LABELS = {
  sud:         'sud',
  ouest:       'ouest',
  est:         'est',
  nord:        'nord',
  plein_soleil:'plein soleil',
  mi_ombre:    'mi-ombre',
  ombre:       'ombre',
}

const TACHES_SECTIONS = [
  { id: 'surveiller', label: 'À surveiller', variant: 'surveiller' },
  { id: 'today',      label: "Aujourd'hui" },
  { id: '2-3jours',   label: 'Dans 2-3 jours' },
  { id: '1semaine',   label: 'Dans 1 semaine' },
  { id: '2semaines',  label: 'Dans 2 semaines' },
  { id: '1mois',      label: 'Dans 1 mois' },
  { id: '2mois',      label: 'Dans 2 mois' },
]

const PLANT_TASKS = {
  'tomate': [
    { id: 'tom-s1', section: 'surveiller', title: 'Température nocturne < 10° ?',      frequency: 'À surveiller', duration: '~1 min',  picto: arroserSvg },
    { id: 'tom-t1', section: 'today',      title: 'Préparer le substrat de semis',     frequency: "Aujourd'hui",  duration: '~5 min',  picto: planterSvg },
    { id: 'tom-t2', section: 'today',      title: 'Semer 2-3 graines par pot',         frequency: "Aujourd'hui",  duration: '~2 min',  picto: planterSvg },
    { id: 'tom-d1', section: '2-3jours',   title: "Vérifier l'humidité du substrat",   frequency: '2-3 jours',    duration: '~1 min',  picto: arroserSvg },
    { id: 'tom-1s', section: '1semaine',   title: 'Observer la germination',            frequency: '1 semaine',    duration: '~2 min',  picto: arroserSvg },
    { id: 'tom-2s', section: '2semaines',  title: 'Repiquer les plants les plus forts', frequency: '2 semaines',   duration: '~15 min', picto: rempoterSvg },
    { id: 'tom-1m', section: '1mois',      title: 'Installer un tuteur en bambou',     frequency: '1 mois',       duration: '~10 min', picto: planterSvg },
    { id: 'tom-2m', section: '2mois',      title: 'Attacher la tige au tuteur',        frequency: '2 mois',       duration: '~5 min',  picto: planterSvg },
  ],
  'tomate-cerise': [
    { id: 'tc-s1', section: 'surveiller', title: 'Feuilles qui jaunissent ?',           frequency: 'À surveiller', duration: '~1 min',  picto: arroserSvg },
    { id: 'tc-t1', section: 'today',      title: 'Semer en terreau fin',                frequency: "Aujourd'hui",  duration: '~5 min',  picto: planterSvg },
    { id: 'tc-d1', section: '2-3jours',   title: 'Arroser légèrement sans déranger les graines', frequency: '2-3 jours', duration: '~2 min', picto: arroserSvg },
    { id: 'tc-1s', section: '1semaine',   title: 'Vérifier la germination',             frequency: '1 semaine',    duration: '~2 min',  picto: arroserSvg },
    { id: 'tc-2s', section: '2semaines',  title: 'Éclaircir en gardant 1 plant par pot',frequency: '2 semaines',   duration: '~5 min',  picto: rempoterSvg },
    { id: 'tc-1m', section: '1mois',      title: 'Repiquer en pot définitif (12L+)',    frequency: '1 mois',       duration: '~15 min', picto: rempoterSvg },
    { id: 'tc-2m', section: '2mois',      title: 'Pincer les gourmands',               frequency: '2 mois',       duration: '~5 min',  picto: planterSvg },
  ],
  'fraise': [
    { id: 'fr-s1', section: 'surveiller', title: 'Pucerons ou limaces à signaler ?',    frequency: 'À surveiller', duration: '~1 min',  picto: arroserSvg },
    { id: 'fr-t1', section: 'today',      title: 'Planter les fraisiers en pot',        frequency: "Aujourd'hui",  duration: '~15 min', picto: planterSvg },
    { id: 'fr-t2', section: 'today',      title: 'Arroser abondamment après plantation',frequency: "Aujourd'hui",  duration: '~3 min',  picto: arroserSvg },
    { id: 'fr-d1', section: '2-3jours',   title: 'Vérifier la reprise racinaire',       frequency: '2-3 jours',    duration: '~2 min',  picto: arroserSvg },
    { id: 'fr-1s', section: '1semaine',   title: 'Apporter un engrais spécial fraises', frequency: '1 semaine',    duration: '~5 min',  picto: planterSvg },
    { id: 'fr-1m', section: '1mois',      title: 'Supprimer les stolons non désirés',   frequency: '1 mois',       duration: '~10 min', picto: planterSvg },
    { id: 'fr-2m', section: '2mois',      title: 'Récolter les premiers fruits rouges', frequency: '2 mois',       duration: '~10 min', picto: arroserSvg },
  ],
  'courgette': [
    { id: 'co-s1', section: 'surveiller', title: 'Oïdium sur les feuilles ?',           frequency: 'À surveiller', duration: '~1 min',  picto: arroserSvg },
    { id: 'co-t1', section: 'today',      title: 'Semer 1-2 graines par pot (2 cm)',    frequency: "Aujourd'hui",  duration: '~5 min',  picto: planterSvg },
    { id: 'co-d1', section: '2-3jours',   title: 'Maintenir humide et au chaud (20°)',  frequency: '2-3 jours',    duration: '~3 min',  picto: arroserSvg },
    { id: 'co-1s', section: '1semaine',   title: 'Lever de germination attendue',       frequency: '1 semaine',    duration: '~2 min',  picto: arroserSvg },
    { id: 'co-2s', section: '2semaines',  title: 'Repiquer en grand pot (30L+)',         frequency: '2 semaines',   duration: '~15 min', picto: rempoterSvg },
    { id: 'co-1m', section: '1mois',      title: 'Polliniser les fleurs manuellement',  frequency: '1 mois',       duration: '~5 min',  picto: planterSvg },
    { id: 'co-2m', section: '2mois',      title: 'Récolter régulièrement pour stimuler',frequency: '2 mois',       duration: '~5 min',  picto: arroserSvg },
  ],
  'ciboulette': [
    { id: 'ci-s1', section: 'surveiller', title: 'Feuilles qui pâlissent ?',            frequency: 'À surveiller', duration: '~1 min',  picto: arroserSvg },
    { id: 'ci-t1', section: 'today',      title: 'Semer à la volée en surface',         frequency: "Aujourd'hui",  duration: '~3 min',  picto: planterSvg },
    { id: 'ci-t2', section: 'today',      title: 'Recouvrir légèrement de terreau',     frequency: "Aujourd'hui",  duration: '~2 min',  picto: planterSvg },
    { id: 'ci-d1', section: '2-3jours',   title: "Maintenir l'humidité sans excès",     frequency: '2-3 jours',    duration: '~2 min',  picto: arroserSvg },
    { id: 'ci-1s', section: '1semaine',   title: 'Observer la levée des plants',        frequency: '1 semaine',    duration: '~1 min',  picto: arroserSvg },
    { id: 'ci-1m', section: '1mois',      title: 'Couper dès 15 cm pour stimuler',      frequency: '1 mois',       duration: '~2 min',  picto: planterSvg },
    { id: 'ci-2m', section: '2mois',      title: 'Couper régulièrement les tiges',      frequency: '2 mois',       duration: '~3 min',  picto: planterSvg },
  ],
}

const STAGE_TASKS = {
  semis: [
    { id: 't1', picto: arroserSvg,  label: 'Préparer le substrat de semis',           duration: '~2 min' },
    { id: 't2', picto: planterSvg,  label: 'Semer 2-3 graines à 1cm de profondeur',   duration: '~2 min' },
    { id: 't3', picto: arroserSvg,  label: "Placer près d'une fenêtre sud",            duration: '~2 min' },
  ],
  jeune_plant: [
    { id: 't1', picto: arroserSvg,  label: "Arroser la base sans mouiller les feuilles", duration: '~3 min' },
    { id: 't2', picto: rempoterSvg, label: 'Repiquer dans un pot plus grand',            duration: '~10 min' },
  ],
  plantation: [
    { id: 't1', picto: planterSvg,  label: 'Installer la plante dans son pot définitif', duration: '~15 min' },
    { id: 't2', picto: arroserSvg,  label: 'Arroser abondamment après plantation',       duration: '~5 min' },
  ],
  floraison: [
    { id: 't1', picto: arroserSvg,  label: 'Arroser régulièrement à la base',            duration: '~3 min' },
  ],
  fructification: [
    { id: 't1', picto: arroserSvg,  label: 'Arroser quotidiennement en été',             duration: '~3 min' },
  ],
  croissance: [
    { id: 't1', picto: arroserSvg,  label: 'Arroser selon les besoins',                  duration: '~3 min' },
  ],
  recolte: [
    { id: 't1', picto: arroserSvg,  label: 'Récolter les fruits mûrs',                   duration: '~5 min' },
  ],
  mature: [
    { id: 't1', picto: arroserSvg,  label: 'Couper les tiges pour stimuler la pousse',   duration: '~2 min' },
  ],
}

const TABS = [
  { key: 'infos',      label: 'Infos' },
  { key: 'cycle',      label: 'Cycle' },
  { key: 'taches',     label: 'Tâches' },
  { key: 'historique', label: 'Historique' },
]

function getContextKey(user) {
  if (!user.zone_id || !user.exposition_id) return null
  return `${user.zone_id}_${user.exposition_id}`
}

function getZoneLabel(user) {
  if (!user.zone_id) return null
  const zone = ZONE_LABELS[user.zone_id] ?? user.zone_id
  const expo = EXPOSITION_LABELS[user.exposition_id] ?? user.exposition_id
  return expo ? `${zone} ${expo}` : zone
}

export default function PlantePage() {
  const { id }        = useParams()
  const navigate      = useNavigate()
  const { plantInstances, user, checkedTaskIds, dispatch } = useApp()
  const [activeTab, setActiveTab] = useState('infos')

  const plant    = PLANTS_BY_ID[id]
  if (!plant) return <Navigate to="/jardin" replace />

  const instance   = plantInstances.find(i => i.plantId === id)
  const contextKey = getContextKey(user)
  const plantCtx   = contextKey ? plant.contextes?.[contextKey] ?? null : null

  const stade      = instance?.stade_actuel ?? plant.stade_par_defaut
  const etat       = instance?.etat ?? 'bien'
  const zoneLabel  = getZoneLabel(user)
  const picto      = PICTO_MAP[plant.icone]

  const stades     = plant.stades_disponibles
  const stadeIdx   = stades.indexOf(stade)
  const progress   = stades.length > 1 ? (stadeIdx / (stades.length - 1)) * 100 : 0

  const compat     = plantCtx?.compatibilite ?? plant.compatibilite
  const difficulte = plantCtx?.difficulte ?? plant.difficulte

  const tasks          = STAGE_TASKS[stade] ?? []
  const plantTacheTasks = PLANT_TASKS[id] ?? []
  const getSectionTasks = (sectionId) => plantTacheTasks.filter(t => t.section === sectionId)

  const COMPAT_COLOR = { ideale: 'primary', possible: 'secondary', deconseille: 'error' }
  const DIFF_COLOR   = { facile: 'neutral', moyen: 'warning', difficile: 'error' }

  const etatCfg = ETAT_CONFIG[etat] ?? ETAT_CONFIG.bien
  const { Icon: EtatIcon } = etatCfg

  return (
    <div className={styles.page}>

      {/* ─── Barre de statut ─────────────────────────────────── */}
      <div className={styles.statusBar}>
        <span className={styles.statusTime}>12:00</span>
        <div className={styles.statusIcons}>
          <span>▲▲▲</span>
          <span>◈</span>
          <span>▊</span>
        </div>
      </div>

      {/* ─── Hero ────────────────────────────────────────────── */}
      <div className={styles.hero}>
        <div className={styles.heroBg} />
        {picto && (
          <img src={picto} alt="" aria-hidden="true" className={styles.heroPlantIcon} />
        )}
        <div className={styles.heroActions}>
          <button
            className={styles.actionBtn}
            onClick={() => navigate(-1)}
            aria-label="Retour"
          >
            <IconArrowLeft width={24} height={24} />
          </button>
          <button className={styles.actionBtn} aria-label="Menu">
            <IconMenu width={24} height={24} />
          </button>
        </div>
      </div>

      {/* ─── Header sticky ───────────────────────────────────── */}
      <div className={styles.stickyHeader}>

        {/* Nom + icone + nom scientifique */}
        <div className={styles.plantTitleRow}>
          <div className={styles.plantTitleLeft}>
            <div className={styles.plantNameRow}>
              <h1 className={styles.plantName}>{plant.nom}</h1>
              {picto && <img src={picto} alt="" aria-hidden="true" className={styles.plantNameIcon} />}
            </div>
            {plant.nom_scientifique && (
              <p className={styles.scientificName}>{plant.nom_scientifique}</p>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className={styles.tagRow}>
          <Tag color={DIFF_COLOR[difficulte.niveau] ?? 'neutral'} variant="filled">
            {difficulte.label}
          </Tag>
          <Tag color={COMPAT_COLOR[compat.niveau] ?? 'primary'} variant="outline">
            {compat.label}
          </Tag>
          <span className={styles.harvestTag}>
            <img src={IconRecolte} alt="" aria-hidden="true" width={16} height={16} />
            Dans ~1 mois
          </span>
        </div>

        {/* Tabs */}
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

      {/* ─── Contenu principal ───────────────────────────────── */}
      <div className={styles.content}>

        {activeTab !== 'infos' && activeTab !== 'cycle' && activeTab !== 'taches' && (
          <div className={styles.comingSoon}>
            <p>Bientôt disponible</p>
          </div>
        )}

        {activeTab === 'infos' && (
          <>

            {/* ── Bloc 1 : stade + état + zone ──────────────── */}
            <div className={styles.bloc}>

              {/* Stade de croissance */}
              <div className={styles.stadeCard}>
                <p className={styles.cardLabel}>Stade de croissance</p>
                <div className={styles.progressWrap}>
                  <div className={styles.progressTrack}>
                    <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                  </div>
                  <div className={styles.stagesList}>
                    {stades.map((s, i) => (
                      <div key={s} className={styles.stageItem}>
                        <div className={`${styles.stageDot} ${i === stadeIdx ? styles.stageDotActive : i < stadeIdx ? styles.stageDotDone : ''}`} />
                        <span className={`${styles.stageLabel} ${i === stadeIdx ? styles.stageLabelActive : ''}`}>
                          {STADE_DISPLAY[s] ?? s}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Etat général + Ensoleillement */}
              <div className={styles.statRow}>
                <div className={`${styles.statCard} ${etatCfg.cardClass}`}>
                  <p className={styles.cardLabel}>Etat général</p>
                  <div className={styles.statValue}>
                    <EtatIcon width={24} height={24} />
                    <span className={etatCfg.textClass}>{etatCfg.label}</span>
                  </div>
                </div>
                <div className={`${styles.statCard} ${styles.etatCardYellow}`}>
                  <p className={styles.cardLabel}>Ensoleillement</p>
                  <div className={styles.statValue}>
                    <IconSun width={24} height={24} className={styles.sunIcon} />
                    <span className={styles.etatTextAmber}>Bon ensoleillement</span>
                  </div>
                </div>
              </div>

              {/* Zone */}
              {zoneLabel && (
                <div className={styles.zoneCard}>
                  <p className={styles.cardLabel}>Zone</p>
                  <p className={styles.zoneValue}>{zoneLabel}</p>
                  <button className={styles.zoneMenuBtn} aria-label="Options de zone">
                    <IconMenu width={16} height={16} />
                  </button>
                </div>
              )}

              {/* Bruno – "C'est bien dans cette zone ?" */}
              {plantCtx && (
                <div className={styles.brunoRow}>
                  <img src={brunoImg} alt="Bruno" className={styles.brunoAvatar} />
                  <div className={styles.bubbleWrap}>
                    <div className={`${styles.bubble} ${styles.bubbleYellow}`}>
                      <span>C&apos;est bien dans cette zone&nbsp;?</span>
                      <div className={styles.bubbleActions}>
                        <IconCheck width={20} height={20} className={styles.iconCheck} />
                        <IconClose width={20} height={20} className={styles.iconClose} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── Bloc 2 : Conseils ─────────────────────────── */}
            <div className={styles.bloc}>
              <h2 className={styles.sectionTitle}>Conseils</h2>
              <div className={styles.brunoRow}>
                <img src={brunoImg} alt="Bruno" className={styles.brunoAvatar} />
                <div className={styles.bubbleWrap}>
                  <div className={`${styles.bubble} ${styles.bubbleBeige}`}>
                    <p className={styles.bubbleText}>
                      {plantCtx?.conseil_bruno ?? plant.bruno_intro}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Bloc 3 : Tâche du jour ────────────────────── */}
            <div className={styles.bloc}>
              <h2 className={styles.sectionTitle}>Tâche du jour</h2>
              <div className={styles.taskList}>
                {tasks.map(task => (
                  <TaskCard
                    key={task.id}
                    title={task.label}
                    frequency="Quotidien"
                    duration={task.duration}
                    icon={<img src={task.picto} alt="" />}
                  />
                ))}
              </div>
            </div>

            {/* ── Bloc 4 : Pot et Substrat ──────────────────── */}
            <div className={styles.bloc}>
              <div className={styles.blocHeader}>
                <h2 className={styles.sectionTitleSecondary}>Pot et Substrat</h2>
                <button className={styles.editBtn} aria-label="Modifier">
                  <IconEdit width={24} height={24} />
                </button>
              </div>

              <div className={styles.brunoRow}>
                <img src={brunoImg} alt="Bruno" className={styles.brunoAvatar} />
                <div className={styles.bubbleWrap}>
                  {instance?.pot ? (
                    <div className={`${styles.bubble} ${styles.bubbleYellow}`}>
                      <p className={styles.bubbleText}>{instance.pot}</p>
                    </div>
                  ) : (
                    <div className={`${styles.bubble} ${styles.bubbleYellow}`}>
                      <p className={`${styles.bubbleText} ${styles.bubbleTextBold}`}>
                        Je connais pas encore son pot.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {plant.pot_substrat?.recommandation && (
                <div className={styles.brunoRow}>
                  <img src={brunoImg} alt="Bruno" className={styles.brunoAvatar} />
                  <div className={styles.bubbleWrap}>
                    <div className={`${styles.bubble} ${styles.bubbleYellow}`}>
                      <p className={styles.bubbleText}>Selon moi le mieux pour cette plante serait</p>
                      <p className={`${styles.bubbleText} ${styles.bubbleTextBold}`}>
                        {plant.pot_substrat.recommandation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── Bloc 5 : Voisins et Guilde ────────────────── */}
            {plant.voisins_guilde && (
              <div className={`${styles.bloc} ${styles.guildeBloc}`}>
                <h2 className={styles.sectionTitle}>Voisins et Guilde</h2>

                <div className={styles.guildeGroup}>
                  <p className={styles.cardLabel}>Meilleurs voisins</p>
                  <div className={styles.tagGroup}>
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

                {plant.voisins_guilde.a_eviter.length > 0 && (
                  <div className={styles.guildeGroup}>
                    <p className={styles.cardLabel}>À éviter</p>
                    <div className={styles.tagGroup}>
                      {plant.voisins_guilde.a_eviter.map(nom => (
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
              </div>
            )}

          </>
        )}

        {activeTab === 'cycle' && (
          <>
            {/* ── Bloc 1 : Timeline + info cards ───────────── */}
            <div className={styles.bloc}>
              <div className={styles.stadeCard}>
                <p className={styles.cardLabel}>Stade de croissance</p>
                {plant.cycle && (
                  <div className={styles.cycleScrollWrap}>
                    <div
                      className={styles.cycleTimeline}
                      style={{ '--stage-count': plant.stades_disponibles.length }}
                    >
                      <div className={styles.cycleBg} aria-hidden="true">
                        <div className={styles.cycleBgFill} style={{ width: `${progress}%` }} />
                      </div>
                      {plant.stades_disponibles.map((s, i) => {
                        const isActive = s === stade
                        const isDone   = i < stadeIdx
                        const dateInfo = plant.cycle.stades_dates?.[s]
                        const dateLabel = isActive ? "Aujourd'hui" : (dateInfo?.date ?? '')
                        return (
                          <div key={s} className={styles.cycleStageItem}>
                            <p className={`${styles.cycleDateLabel} ${isActive ? styles.cycleDateLabelToday : ''}`}>
                              {dateLabel}
                            </p>
                            <div className={`${styles.stageDot} ${isActive ? styles.stageDotActive : isDone ? styles.stageDotDone : ''}`} />
                            <p className={`${styles.cycleStageLabel} ${isActive ? styles.cycleStageLabelActive : ''}`}>
                              {STADE_DISPLAY[s] ?? s}
                            </p>
                            <p className={styles.cycleMoisLabel}>{dateInfo?.mois ?? ''}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              {plant.cycle && (
                <div className={styles.cycleInfoGrid}>
                  {/* Date de début */}
                  <div className={`${styles.cycleInfoCard} ${styles.cycleInfoCardGreen}`}>
                    <p className={styles.cardLabel}>
                      {plant.stades_disponibles[0] === 'plantation' ? 'Date de plantation' : 'Date de semis'}
                    </p>
                    <p className={styles.cycleInfoValue}>{plant.cycle.date_debut}</p>
                  </div>

                  {/* Repiquage ou stade actuel */}
                  {plant.cycle.date_repiquage ? (
                    <div className={`${styles.cycleInfoCard} ${styles.cycleInfoCardBeige}`}>
                      <p className={styles.cardLabel}>Repiquage</p>
                      <p className={styles.cycleInfoValue}>{plant.cycle.date_repiquage}</p>
                    </div>
                  ) : (
                    <div className={`${styles.cycleInfoCard} ${styles.cycleInfoCardBeige}`}>
                      <p className={styles.cardLabel}>Stade actuel</p>
                      <p className={styles.cycleInfoValue}>{STADE_DISPLAY[stade] ?? stade}</p>
                    </div>
                  )}

                  {/* Stade actuel (si repiquage affiché) */}
                  {plant.cycle.date_repiquage && (
                    <div className={`${styles.cycleInfoCard} ${styles.cycleInfoCardBeige}`}>
                      <p className={styles.cardLabel}>Stade actuel</p>
                      <p className={styles.cycleInfoValue}>{STADE_DISPLAY[stade] ?? stade}</p>
                    </div>
                  )}

                  {/* Récolte estimée */}
                  <div className={`${styles.cycleInfoCard} ${styles.cycleInfoCardYellow}`}>
                    <p className={styles.cardLabel}>Récolte estimée</p>
                    <p className={styles.cycleInfoValue}>{plant.cycle.date_recolte}</p>
                  </div>
                </div>
              )}
            </div>

            {/* ── Durée totale ──────────────────────────────── */}
            {plant.cycle && (
              <div className={styles.cycleDurationCard}>
                <p className={styles.cardLabel}>Durée totale du cycle</p>
                <div className={styles.cycleDurationBody}>
                  <p className={styles.cycleDurationValue}>~{plant.cycle.duree_jours} jours</p>
                  <p className={styles.cycleDurationSub}>de semis à récolte</p>
                </div>
              </div>
            )}

            {/* ── Bruno conseil cycle ────────────────────────── */}
            {plant.cycle?.conseil && (
              <div className={styles.brunoRow}>
                <img src={brunoImg} alt="Bruno" className={styles.brunoAvatar} />
                <div className={styles.bubbleWrap}>
                  <div className={`${styles.bubble} ${styles.bubbleBeige}`}>
                    <p className={styles.bubbleText}>{plant.cycle.conseil}</p>
                  </div>
                </div>
              </div>
            )}

            {/* ── Conditions idéales ────────────────────────── */}
            {plant.cycle?.conditions && (
              <div className={styles.cycleConditionsCard}>
                <h2 className={styles.sectionTitle}>Conditions idéales</h2>
                <div className={styles.cycleConditionsList}>
                  <div className={styles.cycleConditionRow}>
                    <p className={styles.cardLabel}>Température</p>
                    <p className={styles.cycleConditionValue}>{plant.cycle.conditions.temperature}</p>
                  </div>
                  <div className={styles.cycleConditionRow}>
                    <p className={styles.cardLabel}>Ensoleillement</p>
                    <p className={styles.cycleConditionValue}>{plant.cycle.conditions.ensoleillement}</p>
                  </div>
                  <div className={styles.cycleConditionRow}>
                    <p className={styles.cardLabel}>Arrosage</p>
                    <p className={styles.cycleConditionValue}>{plant.cycle.conditions.arrosage}</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'taches' && (
          <div className={styles.tachesWrap}>
            {TACHES_SECTIONS.map(section => {
              const sectionItems = getSectionTasks(section.id)
              if (sectionItems.length === 0) return null
              return (
                <div key={section.id} className={styles.tacheSection}>
                  <div className={styles.tacheSectionHeader}>
                    <div className={styles.tacheSectionTitleRow}>
                      <h2 className={styles.sectionTitle}>{section.label}</h2>
                      <span className={styles.tacheBadge}>{sectionItems.length}</span>
                    </div>
                  </div>
                  <div className={styles.taskList}>
                    {sectionItems.map(task => (
                      <TaskCard
                        key={task.id}
                        title={task.title}
                        frequency={task.frequency}
                        duration={task.duration}
                        icon={<img src={task.picto} alt="" />}
                        checked={checkedTaskIds.includes(task.id)}
                        onChange={() => dispatch({ type: 'TOGGLE_TASK_CHECKED', payload: task.id })}
                        variant={section.variant}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
            {plantTacheTasks.length === 0 && (
              <div className={styles.comingSoon}><p>Aucune tâche disponible</p></div>
            )}
          </div>
        )}
      </div>

      {/* ─── Navbar ──────────────────────────────────────────── */}
      <nav className={styles.navbar} aria-label="Navigation principale">
        <button className={styles.navItem} onClick={() => navigate('/')} aria-label="Accueil">
          <IconHome width={32} height={32} />
        </button>
        <button className={styles.navItemActive} onClick={() => navigate('/jardin')} aria-current="page">
          <IconJardin width={32} height={32} />
          <span className={styles.navLabel}>Jardin</span>
        </button>
        <button className={styles.navItem} onClick={() => navigate('/taches')} aria-label="Tâches">
          <IconCalendar width={32} height={32} />
        </button>
        <button className={styles.navItem} aria-label="Profil">
          <IconUser width={32} height={32} />
        </button>
      </nav>

    </div>
  )
}
