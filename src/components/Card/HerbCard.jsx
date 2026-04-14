import styles from './HerbCard.module.scss'

/**
 * HerbCard — carte aromate/herbe
 *
 * @param {string}         name  — nom de l'herbe
 * @param {React.ReactNode} icon — icône/illustration
 * @param {function}       onClick
 */
export default function HerbCard({
  name = 'Label',
  icon,
  onClick,
  className,
}) {
  const cls = [
    styles.card,
    onClick && styles['card--clickable'],
    className,
  ].filter(Boolean).join(' ')

  const Tag = onClick ? 'button' : 'article'

  return (
    <Tag
      className={cls}
      onClick={onClick}
      type={onClick ? 'button' : undefined}
    >
      <p className={styles.card__name}>{name}</p>
      {icon && (
        <span className={styles.card__icon} aria-hidden="true">{icon}</span>
      )}
    </Tag>
  )
}
