import { Link } from 'react-router-dom'
import styles from './Button.module.scss'

/**
 * Button — composant universel Growup
 *
 * @param {React.ReactNode}  children   — contenu textuel du bouton
 * @param {React.ReactNode}  rightIcon  — icône côté droit (SVG local)
 * @param {'primary'|'secondary'|'tertiary'|'ghost'|'text'} variant
 * @param {'contained'|'outlined'} fill
 * @param {boolean}          asLink     — rendu <Link> si true
 * @param {string}           href       — requis si asLink = true
 * @param {boolean}          disabled
 * @param {'button'|'submit'|'reset'} type
 * @param {boolean}          fullWidth
 * @param {string}           className
 * @param {() => void}       onClick
 */
export default function Button({
  children,
  rightIcon,
  variant = 'primary',
  fill = 'contained',
  asLink = false,
  href,
  disabled = false,
  type = 'button',
  fullWidth = false,
  className,
  onClick,
}) {
  const classNames = [
    styles.btn,
    styles[`btn--${variant}`],
    styles[`btn--${fill}`],
    asLink     && styles['btn--link'],
    fullWidth  && styles['btn--full'],
    disabled   && styles['btn--disabled'],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const inner = (
    <>
      <span className={styles.btn__label}>{children}</span>
      {rightIcon && (
        <span className={styles.btn__icon} aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </>
  )

  if (asLink && href) {
    return (
      <Link
        to={href}
        className={classNames}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
      >
        {inner}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled}
      onClick={onClick}
    >
      {inner}
    </button>
  )
}
