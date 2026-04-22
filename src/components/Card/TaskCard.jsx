import { useState } from 'react'
import styles from './TaskCard.module.scss'

export default function TaskCard({
  title = 'Tâche',
  frequency = 'Quotidien',
  duration,
  icon,
  checked: checkedProp = false,
  onChange,
  conseil,
  tip,
  variant,
  className,
}) {
  const [isChecked, setIsChecked] = useState(checkedProp)

  const handleToggle = () => {
    const next = !isChecked
    setIsChecked(next)
    onChange?.(next)
  }

  const cls = [
    styles.card,
    isChecked && styles['card--checked'],
    variant === 'surveiller' && styles['card--surveiller'],
    className,
  ].filter(Boolean).join(' ')

  return (
    <article
      className={cls}
      onClick={handleToggle}
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleToggle()}
      aria-label={isChecked ? 'Marquer comme non réalisée' : 'Marquer comme réalisée'}
    >
      {/* Ligne principale */}
      <div className={styles.card__row}>
        {/* Icône plante */}
        {icon && (
          <span className={styles.card__plantIcon} aria-hidden="true">{icon}</span>
        )}

        {/* Texte */}
        <div className={styles.card__body}>
          <div className={styles.card__meta}>
            {frequency && (
              <span className={styles.freqTag}>{frequency}</span>
            )}
            {duration && (
              <span className={styles.card__duration}>{duration}</span>
            )}
          </div>
          <p className={`${styles.card__title} ${isChecked ? styles['card__title--checked'] : ''}`}>{title}</p>
          {conseil && (
            <p className={styles.card__conseil}>{conseil}</p>
          )}
        </div>

        {/* Checkbox */}
        <span
          role="checkbox"
          aria-checked={isChecked}
          className={styles.card__checkbox}
        >
          {isChecked ? <IconChecked /> : <IconUnchecked />}
        </span>
      </div>

      {/* Message mascotte */}
      {tip && (
        <div className={styles.tip}>
          <span className={styles.tip__avatar} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="11" fill="var(--primitive-primary-200)" stroke="var(--Colors-Primary-Main)" strokeWidth="1" />
              <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="var(--Colors-Primary-Main)" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="9.5" cy="10.5" r="1" fill="var(--Colors-Primary-Main)" />
              <circle cx="14.5" cy="10.5" r="1" fill="var(--Colors-Primary-Main)" />
            </svg>
          </span>
          <div className={styles.tip__bubble}>
            <p className={styles.tip__text}>{tip}</p>
          </div>
        </div>
      )}
    </article>
  )
}

function IconUnchecked() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect
        x="1.5" y="1.5" width="13" height="13"
        rx="3"
        stroke="var(--Colors-Primary-Main)"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function IconChecked() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect
        x="0.75" y="0.75" width="14.5" height="14.5"
        rx="3.25"
        fill="var(--Colors-Primary-Main)"
      />
      <path
        d="M4.5 8L7 10.5L11.5 6"
        stroke="var(--color-light)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
