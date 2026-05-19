import { useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './GlossaryTerm.module.scss'

export default function GlossaryTerm({ children, titre, definition }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <span
        className={styles.term}
        onClick={e => { e.stopPropagation(); setOpen(true) }}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setOpen(true)}
        aria-label={`Définition : ${children}`}
      >
        {children}
      </span>

      {open && createPortal(
        <div className={styles.overlay} onClick={() => setOpen(false)}>
          <div className={styles.sheet} onClick={e => e.stopPropagation()}>
            <div className={styles.handle} />
            <h3 className={styles.titre}>{titre}</h3>
            <p className={styles.definition}>{definition}</p>
            <button className={styles.closeBtn} onClick={() => setOpen(false)}>
              Fermer
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
