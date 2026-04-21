import { useState } from 'react'
import styles from './step.module.scss'
import Button from '../../../components/Button/Button'
import ChoiceBtn from '../../../components/ChoiceBtn/ChoiceBtn'
import brunoImg from '../../../assets/Mascotte 1.png'
import { EXPERIENCE_OPTIONS, STEP_TEXTS } from '../onboarding.data'

const t = STEP_TEXTS.experience

export default function StepExperience({ onNext, setAnswer }) {
  const [selected, setSelected] = useState(null)

  const handleSelect = (value) => {
    setSelected(value)
    setAnswer('experience', value)
  }

  const canProceed = selected !== null

  return (
    <div className={styles.step}>
      <div className={styles.content}>
        <div className={styles.brunoSection}>
          <img src={brunoImg} alt="Bruno le brocoli" className={styles.mascotte} />
          <div className={styles.bubble}>
            <p>{t.bubble}</p>
          </div>
        </div>

        <div className={styles.choices}>
          {EXPERIENCE_OPTIONS.map(opt => (
            <ChoiceBtn
              key={opt.value}
              label={opt.label}
              property1={
                selected === null        ? 'default'
                  : selected === opt.value ? 'select'
                  : 'disable'
              }
              onClick={() => handleSelect(opt.value)}
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
