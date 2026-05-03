import { forwardRef } from 'react'
import styles from './Input.module.scss'
import iconSearch from '../../assets/icons/Search_alt_fill.svg'

function IconSearch() {
  return <img src={iconSearch} alt="" aria-hidden="true" width="16" height="16" />
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
