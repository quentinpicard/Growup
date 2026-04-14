import { forwardRef } from 'react'
import styles from './Input.module.scss'

// Icône resize (coin bas-droite, fidèle au Figma)
function IconResize() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M10 2L2 10M10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/**
 * Textarea — champ multi-lignes
 *
 * @param {string}  label
 * @param {boolean} required
 * @param {boolean} info
 * @param {string}  helperText
 * @param {number}  rows         — hauteur initiale (défaut 4)
 * @param {'success'|'error'|undefined} state
 */
const Textarea = forwardRef(function Textarea(
  {
    label,
    required = false,
    info = false,
    helperText,
    placeholder = 'Votre message…',
    state,
    rows = 4,
    id,
    name,
    value,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    disabled = false,
    readOnly = false,
    className,
    ...rest
  },
  ref
) {
  const fieldClass = [
    styles.field,
    styles['field--outline'],
    state    && styles[`field--${state}`],
    disabled && styles['field--disabled'],
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={fieldClass}>

      {label && (
        <div className={styles.field__label}>
          <span className={styles.field__label_text}>{label}</span>
          {required && (
            <span className={styles.field__required} aria-label="champ obligatoire">*</span>
          )}
        </div>
      )}

      <div className={styles.field__wrap} style={{ alignItems: 'flex-end', padding: 'var(--spacing-1-5) var(--spacing-2) var(--spacing-1-5) var(--spacing-3)' }}>
        <textarea
          ref={ref}
          className={styles.field__textarea}
          id={id}
          name={name}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          rows={rows}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          readOnly={readOnly}
          {...rest}
        />
        <span className={styles.field__resize}>
          <IconResize />
        </span>
      </div>

      {helperText && (
        <p className={styles.field__helper} role={state === 'error' ? 'alert' : undefined}>
          {helperText}
        </p>
      )}
    </div>
  )
})

export default Textarea
