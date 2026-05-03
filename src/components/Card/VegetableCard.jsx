import styles from './VegetableCard.module.scss'
import IconRecolterSvg from '../../assets/pictos/Récolter.svg?react'

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
  return <IconRecolterSvg aria-hidden="true" width="40" height="40" />
}
