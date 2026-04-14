import { useId } from 'react'
import styles from './Toggle.module.scss'

/**
 * Toggle — interrupteur binaire accessible
 *
 * @param {boolean}  checked
 * @param {function} onChange
 * @param {string}   label
 * @param {string}   helperText
 * @param {boolean}  required       — affiche un * à côté du label
 * @param {boolean}  info           — affiche une icône ℹ
 * @param {'primary'|'secondary'|'tertiary'|'success'|'warning'|'error'} color
 * @param {'left'|'top'} labelPosition
 * @param {boolean}  disabled
 */
export default function Toggle({
  checked = false,
  onChange,
  label,
  helperText,
  required = false,
  info = false,
  color = 'primary',
  labelPosition = 'left',
  disabled = false,
  id: externalId,
  name,
  className,
}) {
  const uid = useId()
  const inputId = externalId ?? uid

  const wrapCls = [
    styles.toggle,
    styles[`toggle--${labelPosition}`],
    disabled && styles['toggle--disabled'],
    className,
  ].filter(Boolean).join(' ')

  const trackCls = [
    styles.toggle__track,
    styles[`toggle__track--${color}`],
  ].join(' ')

  return (
    <div className={wrapCls}>
      <label className={styles.toggle__inner} htmlFor={inputId}>
        {label && (
          <span className={styles.toggle__labelWrap}>
            <span className={styles.toggle__label}>{label}</span>
            {required && (
              <span className={styles.toggle__required} aria-label="champ obligatoire">
                *
              </span>
            )}
            {info && (
              <span className={styles.toggle__info} aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M8 7V11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  <circle cx="8" cy="5.5" r="0.7" fill="currentColor" />
                </svg>
              </span>
            )}
          </span>
        )}

        {/* Input caché, source de vérité */}
        <input
          id={inputId}
          name={name}
          type="checkbox"
          role="switch"
          className={styles.toggle__input}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          aria-checked={checked}
        />

        {/* Track + thumb visuels */}
        <span className={trackCls} aria-hidden="true">
          <span className={styles.toggle__thumb} />
        </span>
      </label>

      {helperText && (
        <p className={styles.toggle__helper}>{helperText}</p>
      )}
    </div>
  )
}
