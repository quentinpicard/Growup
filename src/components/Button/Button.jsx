import { useId } from 'react'
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
  const uid = useId()
  const filterId = `btn-rough-${uid.replace(/:/g, '')}`

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

  const filter = (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <filter id={filterId}>
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  )

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
      <>
        {filter}
        <Link
          to={href}
          className={classNames}
          style={{ filter: `url(#${filterId})` }}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : undefined}
        >
          {inner}
        </Link>
      </>
    )
  }

  return (
    <>
      {filter}
      <button
        type={type}
        className={classNames}
        style={{ filter: `url(#${filterId})` }}
        disabled={disabled}
        onClick={onClick}
      >
        {inner}
      </button>
    </>
  )
}
