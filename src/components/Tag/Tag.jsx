
import styles from './Tag.module.scss'

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
          <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M2 2L10 10M10 2L2 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </span>
  )
}
