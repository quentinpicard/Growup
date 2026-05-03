import styles from './SkipModal.module.scss'
import Button from '../../components/Button/Button'
import { SKIP_MODAL } from './onboarding.data'
import iconClose from '../../assets/icons/Close_round.svg'

export default function SkipModal({ onContinue, onSkip }) {
  return (
    <div className={styles.overlay} onClick={onContinue}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onContinue} aria-label="Fermer">
          <img src={iconClose} alt="" aria-hidden="true" width="20" height="20" />
        </button>

        <p className={styles.warning}>{SKIP_MODAL.warning}</p>
        <p className={styles.info}>{SKIP_MODAL.info}</p>

        <div className={styles.actions}>
          <Button
            variant="primary"
            fill="contained"
            fullWidth
            className={styles.btnCta}
            onClick={onContinue}
          >
            {SKIP_MODAL.ctaContinue}
          </Button>
          <Button
            variant="primary"
            fill="contained"
            fullWidth
            className={styles.btnOutlined}
            onClick={onSkip}
          >
            {SKIP_MODAL.ctaSkip}
          </Button>
        </div>
      </div>
    </div>
  )
}
