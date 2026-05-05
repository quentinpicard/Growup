import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { clearProfile } from '../../utils/storage'

export default function ResetOnboardingPage() {
  const { dispatch } = useApp()
  const navigate = useNavigate()

  useEffect(() => {
    clearProfile()
    dispatch({ type: 'RESET_ONBOARDING' })
    navigate('/onboarding', { replace: true })
  }, [])

  return null
}
