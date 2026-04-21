import styles from './step.module.scss'
import Button from '../../../components/Button/Button'
import brunoImg from '../../../assets/Mascotte 1.png'
import { STEP_TEXTS } from '../onboarding.data'

const t = STEP_TEXTS.brunoMission

export default function StepBrunoMission({ onNext }) {
  return (
    <div className={styles.step}>
      <div className={styles.content}>
        <div className={styles.brunoSection}>
          <img src={brunoImg} alt="Bruno le brocoli" className={styles.mascotte} />
          <div className={styles.bubble}>
            <p>{t.bubble}</p>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <Button
          variant="primary"
          fill="contained"
          fullWidth
          className={styles.btnCta}
          onClick={onNext}
        >
          {t.cta}
        </Button>
      </footer>
    </div>
  )
}
