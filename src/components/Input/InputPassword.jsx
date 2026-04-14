import { useState } from 'react'
import Input from './Input'
import styles from './Input.module.scss'

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
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 2l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.5 6.62A2 2 0 0 0 9.4 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4.15 4.22C2.82 5.12 2 6.47 2 8c0 2.21 2.686 4 6 4a8.4 8.4 0 0 0 3.85-.94M12.6 10.6C13.56 9.74 14 8.9 14 8c0-2.21-2.686-4-6-4-.57 0-1.12.06-1.63.17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconEyeOn() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 8c0-2.21 2.686-4 6-4s6 1.79 6 4-2.686 4-6 4-6-1.79-6-4Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
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
