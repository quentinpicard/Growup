import { useState } from 'react'
import styles from './step.module.scss'
import Button from '../../../components/Button/Button'
import brunoImg from '../../../assets/Mascotte 1.png'
import { STEP_TEXTS } from '../onboarding.data'

const t = STEP_TEXTS.city

export default function StepCity({ onNext, setAnswer }) {
  const [city, setCity] = useState('')

  const handleSubmit = () => {
    setAnswer('city', city.trim())
    onNext()
  }

  const handleSkip = () => {
    setAnswer('city', null)
    onNext()
  }

  const canProceed = city.trim().length > 0

  return (
    <div className={styles.step}>
      <img src={brunoImg} alt="Bruno le brocoli" className={`${styles.mascotteAbs} ${styles.mascotteCity}`} />

      <div className={styles.content}>
        <div className={styles.bubbleSectionHigh}>
          <div className={[styles.bubble, styles.bubbleArrowRight].join(' ')}>
            <p>{t.bubble}</p>
          </div>
        </div>

        <div className={styles.cityInputWrapper}>
          <input
            type="text"
            className={styles.cityInput}
            placeholder={t.placeholder}
            value={city}
            onChange={e => setCity(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && canProceed && handleSubmit()}
            aria-label="Ta ville"
          />
        </div>
      </div>

      <footer className={styles.footer}>
        <Button
          variant="primary"
          fill="contained"
          fullWidth
          className={[styles.btnCta, !canProceed && styles.btnFaded].filter(Boolean).join(' ')}
          onClick={canProceed ? handleSubmit : undefined}
        >
          {t.cta}
        </Button>
        <Button
          variant="primary"
          fill="contained"
          fullWidth
          className={styles.btnOutlinedLight}
          onClick={handleSkip}
        >
          {t.ctaSkip}
        </Button>
      </footer>
    </div>
  )
}
