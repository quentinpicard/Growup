import styles from './PlantSelectionCard.module.scss'
import Tag from '../Tag/Tag'
import AddRoundIcon from '../../assets/icons/Add_round.svg?react'

const COMPATIBILITE_COLOR = {
  'Idéale':       'primary',
  'Possible':     'warning',
  'Déconseillé':  'error',
  'Déconseillée': 'error',
}

const DIFFICULTE_COLOR = {
  'Facile':    'primary',
  'Moyen':     'warning',
  'Difficile': 'error',
}

/**
 * PlantSelectionCard — carte de sélection de plante (page d'accueil)
 *
 * @param {string}          planteName    — nom de la plante
 * @param {string}          periode       — période de plantation (ex: "avr. - juin")
 * @param {React.ReactNode} icon          — icône/illustration de la plante
 * @param {'Facile'|'Moyen'|'Difficile'}           difficulte    — niveau de difficulté
 * @param {'Idéale'|'Possible'|'Déconseillé'}      compatibilite — compatibilité avec le jardin
 * @param {function}        onAdd         — callback bouton "+"
 */
export default function PlantSelectionCard({
  planteName = 'Aubergine',
  periode = 'avr. - juin',
  icon,
  difficulte = null,
  compatibilite = null,
  colorVariant = 'secondary',
  onAdd,
  onClick,
  className,
}) {
  const variantClass = colorVariant === 'primary'
    ? styles['card--primary']
    : colorVariant === 'tertiary'
      ? styles['card--tertiary']
      : ''

  const cls = [styles.card, variantClass, className].filter(Boolean).join(' ')
  const compatibiliteColor = COMPATIBILITE_COLOR[compatibilite] ?? 'primary'
  const difficulteColor    = DIFFICULTE_COLOR[difficulte]    ?? 'primary'

  return (
    <article
      className={cls}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : undefined }}
    >
      {(compatibilite || difficulte) && (
        <div className={styles.card__tags}>
          {compatibilite && <Tag variant="outline" color={compatibiliteColor}>{compatibilite}</Tag>}
          {difficulte && <Tag variant="outline" color={difficulteColor}>{difficulte}</Tag>}
        </div>
      )}

      <div className={styles.card__iconWrapper}>
        <span className={styles.card__icon} aria-hidden="true">{icon}</span>
      </div>

      <div className={styles.card__info}>
        <div className={styles.card__text}>
          <p className={styles.card__name}>{planteName}</p>
          <p className={styles.card__period}>
            <span>Planter : </span>
            <span>{periode}</span>
          </p>
        </div>
        <button
          type="button"
          className={styles.card__addBtn}
          onClick={(e) => { e.stopPropagation(); onAdd?.() }}
          aria-label={`Ajouter ${planteName}`}
        >
          <AddRoundIcon aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}
