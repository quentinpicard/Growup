import styles from './HarvestCard.module.scss'

/**
 * HarvestCard — carte de récolte à venir
 *
 * @param {string}         name          — nom de la plante
 * @param {string}         harvestType   — ex: 'Récolte étalée'
 * @param {string}         harvestDate   — ex: '27 Fév.'
 * @param {string}         datePrefix    — ex: "Jusqu'au :"
 * @param {React.ReactNode} icon         — icône/illustration de la plante
 */
export default function HarvestCard({
  name = 'Nom Légume/Fruit',
  harvestType = 'Récolte étalée',
  harvestDate,
  datePrefix = "Jusqu'au :",
  icon,
  className,
}) {
  const cls = [styles.card, className].filter(Boolean).join(' ')

  return (
    <article className={cls}>
      <div className={styles.card__body}>
        {/* Tag type de récolte */}
        {harvestType && (
          <span className={styles.harvestTag}>{harvestType}</span>
        )}

        {/* Ligne nom + icône */}
        <div className={styles.card__nameRow}>
          <p className={styles.card__name}>{name}</p>
          {icon && (
            <span className={styles.card__icon} aria-hidden="true">{icon}</span>
          )}
        </div>

        {/* Date de récolte */}
        {harvestDate && (
          <div className={styles.card__date}>
            <span className={styles.card__datePrefix}>{datePrefix}</span>
            <span className={styles.card__dateValue}>{harvestDate}</span>
          </div>
        )}
      </div>
    </article>
  )
}
