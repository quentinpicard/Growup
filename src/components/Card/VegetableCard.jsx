import styles from './VegetableCard.module.scss'

/**
 * Indicateur de statut — petit cercle coloré en haut à gauche de l'image
 */
function StatusDot({ status = 'good' }) {
  return <span className={`${styles.statusDot} ${styles[`statusDot--${status}`]}`} aria-hidden="true" />
}

/**
 * Tag de stade de croissance (style interne à la carte)
 */
function GrowthTag({ label }) {
  if (!label) return null
  return (
    <span className={styles.growthTag}>{label}</span>
  )
}

/**
 * VegetableCard — carte plante/légume
 *
 * @param {'horizontal'|'vertical'} layout
 * @param {string}  name
 * @param {string}  zone
 * @param {string}  imageSrc
 * @param {string}  imageAlt
 * @param {string}  growthStage    — ex: 'Semis', 'Croissance', 'Récolte'
 * @param {string}  harvestType    — ex: 'Récolte étalée'
 * @param {string}  statusAlert    — ex: 'À surveiller' (affiche tag rouge)
 * @param {'good'|'warning'|'danger'} status
 * @param {React.ReactNode} actionIcon — icône d'action (ex: récolter)
 * @param {function} onAction
 */
export default function VegetableCard({
  layout = 'horizontal',
  name = 'Nom Légume/Fruit',
  zone = 'Zone',
  imageSrc,
  imageAlt = '',
  growthStage,
  harvestType,
  statusAlert,
  status = 'good',
  actionIcon,
  onAction,
  className,
}) {
  const cls = [
    styles.card,
    styles[`card--${layout}`],
    className,
  ].filter(Boolean).join(' ')

  const imageZone = (
    <div className={styles.card__image}>
      {imageSrc
        ? <img src={imageSrc} alt={imageAlt} className={styles.card__img} />
        : <div className={styles.card__imgPlaceholder} aria-hidden="true" />
      }
      <div className={styles.card__badges}>
        <StatusDot status={status} />
        <GrowthTag label={growthStage} />
      </div>
    </div>
  )

  const contentZone = (
    <div className={styles.card__content}>
      {(harvestType || statusAlert) && (
        <div className={styles.card__tags}>
          {harvestType && (
            <span className={styles.harvestTag}>{harvestType}</span>
          )}
          {statusAlert && (
            <span className={styles.alertTag}>{statusAlert}</span>
          )}
        </div>
      )}
      <div className={styles.card__info}>
        <p className={styles.card__name}>{name}</p>
        <p className={styles.card__zone}>{zone}</p>
      </div>
      {(actionIcon || onAction) && (
        <button
          type="button"
          className={styles.card__action}
          onClick={onAction}
          aria-label="Récolter"
        >
          {actionIcon ?? <DefaultHarvestIcon />}
        </button>
      )}
    </div>
  )

  return (
    <article className={cls}>
      {imageZone}
      {contentZone}
    </article>
  )
}

function DefaultHarvestIcon() {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M8 32C10 26 16 20 24 18M24 18C20 14 14 10 8 10M24 18C28 22 30 28 28 34" stroke="var(--Colors-Primary-Main)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 12C28 12 30 16 28 20" stroke="var(--Colors-Primary-Main)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
