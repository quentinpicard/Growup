import styles from './TaskCard.module.scss'

/**
 * TaskCard — carte de tâche de soin
 *
 * @param {string}  title
 * @param {string}  frequency    — label du tag fréquence : 'Quotidien' | 'Demain' | 'Dans 2 jours'
 * @param {string}  duration     — ex: '~2 min'
 * @param {React.ReactNode} icon — icône de la plante
 * @param {boolean} checked      — tâche accomplie
 * @param {function} onChange
 * @param {string}  conseil      — texte de conseil court (optionnel)
 * @param {string}  tip          — message de la mascotte (optionnel)
 */
export default function TaskCard({
  title = 'Tâche',
  frequency = 'Quotidien',
  duration,
  icon,
  checked = false,
  onChange,
  conseil,
  tip,
  className,
}) {
  const cls = [
    styles.card,
    checked && styles['card--checked'],
    className,
  ].filter(Boolean).join(' ')

  return (
    <article className={cls}>
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
          <p className={styles.card__title}>{title}</p>
          {conseil && (
            <p className={styles.card__conseil}>{conseil}</p>
          )}
        </div>

        {/* Checkbox */}
        <button
          type="button"
          role="checkbox"
          aria-checked={checked}
          aria-label={checked ? 'Marquer comme non réalisée' : 'Marquer comme réalisée'}
          className={styles.card__checkbox}
          onClick={onChange}
        >
          {checked ? <IconChecked /> : <IconUnchecked />}
        </button>
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
