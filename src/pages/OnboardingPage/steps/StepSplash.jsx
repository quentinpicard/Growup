import styles from './step.module.scss'
import Button from '../../../components/Button/Button'
import brunoImg from '../../../assets/Mascotte 1.png'
import { STEP_TEXTS } from '../onboarding.data'

const t = STEP_TEXTS.splash

export default function StepSplash({ onNext, onLogin }) {
  return (
    <div className={styles.splash}>
      <div className={styles.splashContent}>
        <img src={brunoImg} alt="Bruno le brocoli" className={styles.splashMascotte} />
        <h1 className={styles.splashTitle}>{t.title}</h1>
        <p className={styles.splashSubtitle}>{t.subtitle}</p>
      </div>

      <footer className={styles.footer}>
        <Button
          variant="primary"
          fill="contained"
          fullWidth
          className={styles.btnCta}
          onClick={onNext}
        >
          {t.ctaPrimary}
        </Button>
        <Button
          variant="primary"
          fill="contained"
          fullWidth
          className={styles.btnOutlinedLight}
          onClick={onLogin}
        >
          {t.ctaSecondary}
        </Button>
      </footer>
    </div>
  )
}
