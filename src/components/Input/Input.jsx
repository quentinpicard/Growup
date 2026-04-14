import { forwardRef } from 'react'
import styles from './Input.module.scss'

// ─── Icônes SVG locales ───────────────────────────────────────────────────────

export function IconInfo() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7v5M8 5.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// ─── Composant Input ──────────────────────────────────────────────────────────

/**
 * Input — champ de saisie universel
 *
 * @param {string}       label       — libellé au-dessus du champ
 * @param {boolean}      required    — affiche l'astérisque rouge *
 * @param {boolean}      info        — affiche l'icône ⓘ d'info
 * @param {string}       helperText  — texte d'aide en dessous
 * @param {ReactNode}    leftIcon    — icône gauche (SVG)
 * @param {ReactNode}    rightIcon   — icône droite (SVG ou bouton)
 * @param {string}       prefix      — texte avant (ex: "km")
 * @param {string}       suffix      — texte après (ex: "km")
 * @param {'outline'|'filled'|'borderless'|'underline'} variant
 * @param {'success'|'error'|undefined} state
 */
const Input = forwardRef(function Input(
  {
    label,
    required = false,
    info = false,
    helperText,
    placeholder = 'Placeholder',
    leftIcon,
    rightIcon,
    prefix,
    suffix,
    variant = 'outline',
    state,
    type = 'text',
    id,
    name,
    value,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    disabled = false,
    readOnly = false,
    autoComplete,
    className,
    ...rest
  },
  ref
) {
  const hasLeft  = !!(leftIcon  || prefix)
  const hasRight = !!(rightIcon || suffix)

  const fieldClass = [
    styles.field,
    styles[`field--${variant}`],
    state    && styles[`field--${state}`],
    disabled && styles['field--disabled'],
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={fieldClass}>

      {/* ── Label ── */}
      {label && (
        <div className={styles.field__label}>
          <span className={styles.field__label_text}>{label}</span>
          {required && (
            <span className={styles.field__required} aria-label="champ obligatoire">*</span>
          )}
          {info && (
            <span className={styles.field__info}>
              <IconInfo />
            </span>
          )}
        </div>
      )}

      {/* ── Wrapper visuel ── */}
      <div className={styles.field__wrap}>

        {/* Icône / prefix gauche */}
        {hasLeft && (
          <span className={styles.field__adornment}>
            {leftIcon ?? (
              <span className={styles.field__affixText}>{prefix}</span>
            )}
          </span>
        )}

        {/* Input natif */}
        <input
          ref={ref}
          className={styles.field__input}
          type={type}
          id={id}
          name={name}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          readOnly={readOnly}
          autoComplete={autoComplete}
          {...rest}
        />

        {/* Séparateur + icône / suffix droit */}
        {hasRight && (
          <>
            <span className={styles.field__sep} aria-hidden="true" />
            <span className={styles.field__adornment}>
              {rightIcon ?? (
                <span className={styles.field__affixText}>{suffix}</span>
              )}
            </span>
          </>
        )}
      </div>

      {/* ── Helper text ── */}
      {helperText && (
        <p className={styles.field__helper} role={state === 'error' ? 'alert' : undefined}>
          {helperText}
        </p>
      )}
    </div>
  )
})

export default Input
