import styles from './PlantCard.module.scss'

import tomateSvg       from '../../assets/pictos/fruits_legumes/Tomate.svg'
import tomate_ceriseSvg from '../../assets/pictos/fruits_legumes/Tomate cerise.svg'
import fraiseSvg       from '../../assets/pictos/fruits_legumes/Fraise.svg'
import courgetteSvg    from '../../assets/pictos/fruits_legumes/Courgette.svg'
import aubergineSvg    from '../../assets/pictos/fruits_legumes/Aubergine.svg'
import carotteSvg      from '../../assets/pictos/fruits_legumes/Carotte.svg'
import concombreSvg    from '../../assets/pictos/fruits_legumes/Concombre.svg'
import saladeSvg       from '../../assets/pictos/fruits_legumes/Salade.svg'
import chouSvg         from '../../assets/pictos/fruits_legumes/Chou.svg'
import courgeSvg       from '../../assets/pictos/fruits_legumes/Courge.svg'
import oignonSvg       from '../../assets/pictos/fruits_legumes/Oignon.svg'
import poireauSvg      from '../../assets/pictos/fruits_legumes/Poireau.svg'
import pommeSvg        from '../../assets/pictos/fruits_legumes/Pomme.svg'
import basilicSvg      from '../../assets/pictos/aromatiques/Basilic.svg'
import cibouletteSvg   from '../../assets/pictos/aromatiques/Ciboulette.svg'
import coriandreSvg    from '../../assets/pictos/aromatiques/Coriandre.svg'
import mentheSvg       from '../../assets/pictos/aromatiques/Menthe.svg'
import origanSvg       from '../../assets/pictos/aromatiques/Origan.svg'
import persilSvg       from '../../assets/pictos/aromatiques/Persil.svg'
import romSvg          from '../../assets/pictos/aromatiques/Romarin.svg'
import thymSvg         from '../../assets/pictos/aromatiques/Thym.svg'

const PICTO_MAP = {
  'Tomate':        tomateSvg,
  'Tomate cerise': tomate_ceriseSvg,
  'Fraise':        fraiseSvg,
  'Courgette':     courgetteSvg,
  'Aubergine':     aubergineSvg,
  'Carotte':       carotteSvg,
  'Concombre':     concombreSvg,
  'Salade':        saladeSvg,
  'Chou':          chouSvg,
  'Courge':        courgeSvg,
  'Oignon':        oignonSvg,
  'Poireau':       poireauSvg,
  'Pomme':         pommeSvg,
  'Basilic':       basilicSvg,
  'Ciboulette':    cibouletteSvg,
  'Coriandre':     coriandreSvg,
  'Menthe':        mentheSvg,
  'Origan':        origanSvg,
  'Persil':        persilSvg,
  'Romarin':       romSvg,
  'Thym':          thymSvg,
}

const COMPAT_NIVEAU_CLASS = {
  ideale:      styles['tag--ideale'],
  possible:    styles['tag--possible'],
  deconseille: styles['tag--deconseille'],
}

const DIFF_NIVEAU_CLASS = {
  facile:    styles['tag--facile'],
  moyen:     styles['tag--moyen'],
  difficile: styles['tag--difficile'],
}

/**
 * PlantCard
 *
 * variant="add"  (défaut) — card statique + bouton "+" en bas à droite
 * variant="link"          — toute la card est cliquable, pas de bouton "+"
 */
export default function PlantCard({ plant, contexte, onAdd, onClick, colorVariant = 'primary', variant = 'add' }) {
  const compat     = contexte?.compatibilite ?? null
  const difficulte = contexte?.difficulte    ?? null

  const bgClass = colorVariant === 'tertiary' ? styles['card--tertiary'] : styles['card--primary']

  const picto  = PICTO_MAP[plant.icone]
  const periode = plant.periode_plantation?.label

  const inner = (
    <>
      {(compat || difficulte) && (
        <div className={styles.tags}>
          {compat && (
            <span className={`${styles.tag} ${COMPAT_NIVEAU_CLASS[compat.niveau] ?? ''}`}>
              {compat.label}
            </span>
          )}
          {difficulte && (
            <span className={`${styles.tag} ${DIFF_NIVEAU_CLASS[difficulte.niveau] ?? ''}`}>
              {difficulte.label}
            </span>
          )}
        </div>
      )}

      <div className={styles.iconWrap}>
        {picto
          ? <img src={picto} alt={plant.nom} className={styles.icon} />
          : <span className={styles.iconFallback}>{plant.nom[0]}</span>
        }
      </div>

      <div className={styles.footer}>
        <div className={styles.info}>
          <p className={styles.name}>{plant.nom}</p>
          {periode && (
            <p className={styles.period}>Planter : {periode}</p>
          )}
        </div>
        {variant === 'add' && (
          <button
            className={styles.addBtn}
            onClick={(e) => { e.stopPropagation(); onAdd?.() }}
            aria-label={`Ajouter ${plant.nom}`}
          >
            +
          </button>
        )}
      </div>
    </>
  )

  if (variant === 'link') {
    return (
      <button
        className={`${styles.card} ${styles['card--link']} ${bgClass}`}
        onClick={onAdd}
        aria-label={plant.nom}
      >
        {inner}
      </button>
    )
  }

  return (
    <div
      className={`${styles.card} ${bgClass}${onClick ? ` ${styles['card--clickable']}` : ''}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : undefined }}
    >
      {inner}
    </div>
  )
}
