import { useId } from 'react'
import styles from './Toggle.module.scss'
import iconInfo from '../../assets/icons/Info_alt_fill.svg'

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
                <img src={iconInfo} alt="" aria-hidden="true" width="16" height="16" />
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
