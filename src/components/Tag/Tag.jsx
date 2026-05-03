import styles from './Tag.module.scss'
import iconClose from '../../assets/icons/Close_round.svg'

/**
 * Tag — étiquette colorée compacte
 *
 * @param {'primary'|'secondary'|'tertiary'|'success'|'warning'|'error'|'neutral'} color
 * @param {'filled'|'outline'} variant
 * @param {React.ReactNode} leftIcon
 * @param {React.ReactNode} rightIcon
 * @param {() => void} onRemove — affiche un × de suppression
 */
export default function Tag({
  children,
  color = 'primary',
  variant = 'filled',
  leftIcon,
  rightIcon,
  onRemove,
  className,
}) {
  const cls = [
    styles.tag,
    styles[`tag--${variant}`],
    styles[`tag--${color}`],
    className,
  ].filter(Boolean).join(' ')

  return (
    <span className={cls}>
      {leftIcon && (
        <span className={styles.tag__icon} aria-hidden="true">{leftIcon}</span>
      )}
      <span className={styles.tag__label}>{children}</span>
      {rightIcon && !onRemove && (
        <span className={styles.tag__icon} aria-hidden="true">{rightIcon}</span>
      )}
      {onRemove && (
        <button
          type="button"
          className={styles.tag__remove}
          onClick={onRemove}
          aria-label="Supprimer"
        >
          <img src={iconClose} alt="" aria-hidden="true" width="12" height="12" />
        </button>
      )}
    </span>
  )
}
