import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './OnboardingPage.module.scss'
import StepSplash       from './steps/StepSplash'
import StepBrunoHello   from './steps/StepBrunoHello'
import StepBrunoMission from './steps/StepBrunoMission'
import StepExperience   from './steps/StepExperience'
import StepLocation     from './steps/StepLocation'
import StepLight        from './steps/StepLight'
import StepObjectives   from './steps/StepObjectives'
import StepCity         from './steps/StepCity'
import StepDone         from './steps/StepDone'
import SkipModal        from './SkipModal'

const TOTAL_STEPS = 7

export default function OnboardingPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep]     = useState(0)
  const [answers, setAnswers]             = useState({})
  const [showSkipModal, setShowSkipModal] = useState(false)

  const setAnswer = (key, value) =>
    setAnswers(prev => ({ ...prev, [key]: value }))

  const goNext = () => setCurrentStep(s => s + 1)
  const goBack = () => setCurrentStep(s => s - 1)

  const showStepper    = currentStep >= 1 && currentStep <= 7
  const showBack       = currentStep >= 2 && currentStep <= 7
  const showSkipButton = currentStep >= 3 && currentStep <= 7
  const progressPct    = showStepper ? (currentStep / TOTAL_STEPS) * 100 : 0

  const stepComponents = [
    <StepSplash       key="0" onNext={goNext} onLogin={() => navigate('/')} />,
    <StepBrunoHello   key="1" onNext={goNext} />,
    <StepBrunoMission key="2" onNext={goNext} />,
    <StepExperience   key="3" onNext={goNext} answers={answers} setAnswer={setAnswer} />,
    <StepLocation     key="4" onNext={goNext} answers={answers} setAnswer={setAnswer} />,
    <StepLight        key="5" onNext={goNext} answers={answers} setAnswer={setAnswer} />,
    <StepObjectives   key="6" onNext={goNext} answers={answers} setAnswer={setAnswer} />,
    <StepCity         key="7" onNext={goNext} answers={answers} setAnswer={setAnswer} />,
    <StepDone         key="8" answers={answers} onFinish={() => navigate('/')} />,
  ]

  return (
    <div className={styles.page}>
      {showStepper && (
        <header className={styles.stepper}>
          {showBack ? (
            <button className={styles.backBtn} onClick={goBack} aria-label="Retour">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : (
            <span className={styles.stepperSide} />
          )}

          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-valuenow={Math.round(progressPct)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
          </div>

          {showSkipButton ? (
            <button className={styles.skipBtn} onClick={() => setShowSkipModal(true)}>
              Passer
            </button>
          ) : (
            <span className={styles.stepperSide} />
          )}
        </header>
      )}

      <div className={styles.stepContent}>
        {stepComponents[currentStep]}
      </div>

      {showSkipModal && (
        <SkipModal
          onContinue={() => setShowSkipModal(false)}
          onSkip={() => navigate('/')}
        />
      )}
    </div>
  )
}
