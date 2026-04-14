import { forwardRef } from 'react'
import styles from './Input.module.scss'

function IconSearch() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/**
 * InputSearch — barre de recherche
 *
 * @param {'filled'|'outline'} variant  — filled (fond vert) | outline (bordure verte)
 */
const InputSearch = forwardRef(function InputSearch(
  {
    placeholder = 'Rechercher…',
    variant = 'filled',
    id,
    name,
    value,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    disabled = false,
    className,
    ...rest
  },
  ref
) {
  const fieldClass = [
    styles.field,
    styles[`field--search-${variant}`],
    disabled && styles['field--disabled'],
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={fieldClass}>
      <div className={styles.field__wrap}>
        <input
          ref={ref}
          type="search"
          className={styles.field__input}
          id={id}
          name={name}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          {...rest}
        />
        <span className={styles.field__adornment}>
          <IconSearch />
        </span>
      </div>
    </div>
  )
})

export default InputSearch
