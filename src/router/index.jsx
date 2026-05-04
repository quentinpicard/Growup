import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import HomePage          from '../pages/HomePage/HomePage'
import OnboardingPage    from '../pages/OnboardingPage/OnboardingPage'
import JardinPage        from '../pages/JardinPage/JardinPage'
import PlantePage        from '../pages/PlantePage/PlantePage'
import DiagnosticPage    from '../pages/DiagnosticPage/DiagnosticPage'
import AjoutPlantePage   from '../pages/AjoutPlantePage/AjoutPlantePage'
import DesignSystemPage  from '../pages/DesignSystemPage/DesignSystemPage'

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
  { path: '/jardin',         element: <JardinPage /> },
  { path: '/plante/:id',     element: <PlantePage /> },
  { path: '/diagnostic/:id', element: <DiagnosticPage /> },
  { path: '/ajout-plante',   element: <AjoutPlantePage /> },
  { path: '/design-system',  element: <DesignSystemPage /> },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
