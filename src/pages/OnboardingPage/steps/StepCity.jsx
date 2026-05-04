import { useState, useEffect, useRef } from 'react'
import styles from './step.module.scss'
import Button from '../../../components/Button/Button'
import brunoImg from '../../../assets/Mascotte 1.png'
import { STEP_TEXTS } from '../onboarding.data'

const t = STEP_TEXTS.city

export default function StepCity({ onNext, setAnswer }) {
  const [city, setCity] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const debounceRef = useRef(null)

  useEffect(() => {
    if (city.trim().length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(city.trim())}&fields=nom,codesPostaux&boost=population&limit=6`
        )
        const data = await res.json()
        setSuggestions(data)
        setShowSuggestions(data.length > 0)
      } catch {
        setSuggestions([])
        setShowSuggestions(false)
      }
    }, 300)

    return () => clearTimeout(debounceRef.current)
  }, [city])

  const selectCity = (nom) => {
    setCity(nom)
    setSuggestions([])
    setShowSuggestions(false)
    setIsValid(true)
  }

  const handleChange = (e) => {
    setCity(e.target.value)
    setIsValid(false)
  }

  const handleSubmit = () => {
    setAnswer('city', city.trim())
    onNext()
  }

  const handleSkip = () => {
    setAnswer('city', null)
    onNext()
  }

  const canProceed = isValid

  return (
    <div className={styles.step}>
      <img src={brunoImg} alt="Bruno le brocoli" className={`${styles.mascotteAbs} ${styles.mascotteCity}`} />

      <div className={[styles.content, styles.contentTop].join(' ')}>
        <div className={styles.bubbleSectionHigh}>
          <div className={[styles.bubble, styles.bubbleArrowRight].join(' ')}>
            <p>{t.bubble}</p>
          </div>
        </div>

        <div className={styles.cityInputWrapper}>
          <div className={styles.cityAutocomplete}>
            <input
              type="text"
              className={[styles.cityInput, isValid && styles.cityInputValid].filter(Boolean).join(' ')}
              placeholder={t.placeholder}
              value={city}
              onChange={handleChange}
              onKeyDown={e => e.key === 'Enter' && canProceed && !showSuggestions && handleSubmit()}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              aria-label="Ta ville"
              autoComplete="off"
            />
            {showSuggestions && (
              <ul className={styles.citySuggestions}>
                {suggestions.map(({ nom, codesPostaux }) => (
                  <li
                    key={`${nom}-${codesPostaux[0]}`}
                    className={styles.citySuggestionItem}
                    onMouseDown={() => selectCity(nom)}
                  >
                    <span className={styles.citySuggestionName}>{nom}</span>
                    <span className={styles.citySuggestionCode}>{codesPostaux[0]}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
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
