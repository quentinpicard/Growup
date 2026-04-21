import { useState } from 'react'
import styles from './step.module.scss'
import Button from '../../../components/Button/Button'
import ChoiceBtn from '../../../components/ChoiceBtn/ChoiceBtn'
import brunoImg from '../../../assets/Mascotte 1.png'
import { LOCATION_OPTIONS, LOCATION_QUESTION, STEP_TEXTS } from '../onboarding.data'

const t = STEP_TEXTS.location

export default function StepLocation({ onNext, answers, setAnswer }) {
  const [selected, setSelected] = useState(null)

  const question =
    answers.experience === 'oui_deja'
      ? LOCATION_QUESTION.avance
      : LOCATION_QUESTION.debutant

  const handleSelect = (value) => {
    setSelected(value)
    setAnswer('location', value)
  }

  const canProceed = selected !== null

  return (
    <div className={styles.step}>
      <div className={styles.content}>
        <div className={styles.brunoSection}>
          <img src={brunoImg} alt="Bruno le brocoli" className={styles.mascotte} />
          <div className={styles.bubble}>
            <p>{question}</p>
          </div>
        </div>

        <div className={styles.choices}>
          {LOCATION_OPTIONS.map(opt => (
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
