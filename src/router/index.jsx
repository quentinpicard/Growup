import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import HomePage          from '../pages/HomePage/HomePage'
import OnboardingPage    from '../pages/OnboardingPage/OnboardingPage'
import JardinPage        from '../pages/JardinPage/JardinPage'
import PlantePage        from '../pages/PlantePage/PlantePage'
import DiagnosticPage    from '../pages/DiagnosticPage/DiagnosticPage'
import AjoutPlantePage      from '../pages/AjoutPlantePage/AjoutPlantePage'
import PlantInfosAjoutPage  from '../pages/PlantInfosAjoutPage/PlantInfosAjoutPage'
import TachesPage           from '../pages/TachesPage/TachesPage'
import DesignSystemPage       from '../pages/DesignSystemPage/DesignSystemPage'
import ResetOnboardingPage    from '../pages/ResetOnboardingPage/ResetOnboardingPage'

function ProtectedRoute({ children }) {
  const { user } = useApp()
  if (!user.onboarding_complete) return <Navigate to="/onboarding" replace />
  return children
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  { path: '/onboarding/*',   element: <OnboardingPage /> },
  {
    path: '/jardin',
    element: (
      <ProtectedRoute>
        <JardinPage />
      </ProtectedRoute>
    ),
  },
  { path: '/plante/:id',     element: <PlantePage /> },
  { path: '/diagnostic/:id', element: <DiagnosticPage /> },
  { path: '/ajout-plante',        element: <AjoutPlantePage /> },
  { path: '/info-plante/:id',     element: <PlantInfosAjoutPage /> },
  {
    path: '/taches',
    element: (
      <ProtectedRoute>
        <TachesPage />
      </ProtectedRoute>
    ),
  },
  { path: '/design-system',  element: <DesignSystemPage /> },
  { path: '/reset-onboarding', element: <ResetOnboardingPage /> },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
