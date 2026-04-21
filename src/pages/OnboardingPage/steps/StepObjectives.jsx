import { useState } from 'react'
import styles from './step.module.scss'
import Button from '../../../components/Button/Button'
import ChoiceBtn from '../../../components/ChoiceBtn/ChoiceBtn'
import brunoImg from '../../../assets/Mascotte 1.png'
import { OBJECTIVES_OPTIONS, STEP_TEXTS } from '../onboarding.data'

const t = STEP_TEXTS.objectives

export default function StepObjectives({ onNext, setAnswer }) {
  const [selected, setSelected] = useState([])

  const handleToggle = (value) => {
    setSelected(prev => {
      const next = prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
      setAnswer('objectives', next)
      return next
    })
  }

  const canProceed = selected.length > 0

  return (
    <div className={styles.step}>
      <img src={brunoImg} alt="Bruno le brocoli" className={`${styles.mascotteAbs} ${styles.mascotteObjectives}`} />

      <div className={styles.content}>
        <div className={styles.bubbleSectionHigh}>
          <div className={styles.bubble}>
            <p>{t.bubble}</p>
          </div>
        </div>

        <div className={styles.choices}>
          {OBJECTIVES_OPTIONS.map(opt => (
            <ChoiceBtn
              key={opt.value}
              label={opt.label}
              property1={selected.includes(opt.value) ? 'select' : 'default'}
              onClick={() => handleToggle(opt.value)}
            />
          ))}
        </div>
      </div>

      <footer className={styles.footer}>
        <Button
          variant="primary"
          fill="contained"
          fullWidth
          className={[styles.btnCta, !canProceed && styles.btnFaded].filter(Boolean).join(' ')}
          onClick={canProceed ? onNext : undefined}
        >
          {t.cta}
        </Button>
      </footer>
    </div>
  )
}
