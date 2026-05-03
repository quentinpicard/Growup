import { useState } from 'react'
import Input from './Input'
import styles from './Input.module.scss'
import iconEyeOn  from '../../assets/icons/View_fill.svg'
import iconEyeOff from '../../assets/icons/View_hide_fill.svg'

// ─── Icônes SVG locales ───────────────────────────────────────────────────────

function IconLock() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="3" y="7" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconEyeOff() {
  return <img src={iconEyeOff} alt="" aria-hidden="true" width="16" height="16" />
}

function IconEyeOn() {
  return <img src={iconEyeOn} alt="" aria-hidden="true" width="16" height="16" />
}

// ─── Composant InputPassword ──────────────────────────────────────────────────

/**
 * InputPassword — champ mot de passe avec toggle visibilité
 *
 * @param {'success'|'error'|undefined} state
 */
export default function InputPassword({
  label,
  placeholder = 'Mot de passe',
  helperText,
  state,
  disabled = false,
  id,
  name,
  value,
  defaultValue,
  onChange,
  required = false,
  ...rest
}) {
  const [visible, setVisible] = useState(false)

  return (
    <Input
      type={visible ? 'text' : 'password'}
      label={label}
      placeholder={placeholder}
      helperText={helperText}
      state={state}
      disabled={disabled}
      id={id}
      name={name}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      required={required}
      leftIcon={<IconLock />}
      rightIcon={
        <button
          type="button"
          className={styles.field__toggle}
          onClick={() => setVisible(v => !v)}
          aria-label={visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          tabIndex={disabled ? -1 : 0}
        >
          {visible ? <IconEyeOn /> : <IconEyeOff />}
        </button>
      }
      {...rest}
    />
  )
}
