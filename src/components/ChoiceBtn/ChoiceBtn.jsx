import { useId } from 'react'
import styles from './ChoiceBtn.module.scss'

export default function ChoiceBtn({ label, property1 = 'default', onClick }) {
  const uid = useId()
  const filterId = `rough-${uid.replace(/:/g, '')}`

  return (
    <>
      <svg width="0" height="0" aria-hidden="true" className={styles.filterDef}>
        <defs>
          <filter id={filterId} x="-8%" y="-8%" width="116%" height="116%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="3"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <button
        className={`${styles.btn} ${styles[property1]}`}
        onClick={property1 === 'disable' ? undefined : onClick}
        disabled={property1 === 'disable'}
        style={{ filter: `url(#${filterId})` }}
      >
        {label}
      </button>
    </>
  )
}
