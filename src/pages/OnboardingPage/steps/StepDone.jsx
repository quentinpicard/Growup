import styles from './step.module.scss'
import Button from '../../../components/Button/Button'
import brunoImg from '../../../assets/Mascotte 1.png'
import { STEP_TEXTS } from '../onboarding.data'

const t = STEP_TEXTS.done

export default function StepDone({ onFinish }) {
  return (
    <div className={styles.doneContainer}>
      <div className={styles.doneContent}>
        <img src={brunoImg} alt="Bruno le brocoli" className={styles.doneMascotte} />
        <h2 className={styles.doneTitle}>{t.title}</h2>
        <p className={styles.doneText}>{t.text}</p>
      </div>

      <footer className={styles.footer}>
        <Button
          variant="primary"
          fill="contained"
          fullWidth
          className={styles.btnCta}
          onClick={onFinish}
        >
          {t.cta}
        </Button>
      </footer>
    </div>
  )
}
