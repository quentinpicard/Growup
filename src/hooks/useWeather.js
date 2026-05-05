import { useState, useEffect } from 'react'

const WMO_MESSAGES = {
  0:  'Grand soleil, arrosez ce soir.',
  1:  'Ciel dégagé, bonne journée au jardin.',
  2:  'Quelques nuages, idéal pour planter.',
  3:  'Ciel couvert, bon pour les semis.',
  45: 'Brouillard, humidité élevée.',
  48: 'Brouillard givrant, protégez vos plantes.',
  51: "Bruine légère, pas besoin d'arroser.",
  53: "Bruine modérée, sol humide.",
  55: "Bruine dense, restez au chaud.",
  61: "Pluie légère, pas besoin d'arroser.",
  63: "Pluie modérée, sol bien humide.",
  65: "Pluie forte, surveillez vos pots.",
  71: "Neige légère, protégez vos plants.",
  73: "Neige modérée, gel possible.",
  75: "Neige forte, rentrez tout ce qui peut geler.",
  80: "Averses, arrosage inutile aujourd'hui.",
  81: "Averses modérées, terrain bien arrosé.",
  82: "Averses violentes, protégez vos jeunes plants.",
  95: "Orage, rentrez vos plantes en pot.",
  96: "Orage avec grêle, mettez tout à l'abri.",
  99: "Orage violent avec grêle.",
}

function getWeatherMessage(code) {
  if (code === undefined || code === null) return null
  if (WMO_MESSAGES[code]) return WMO_MESSAGES[code]
  if (code >= 51 && code <= 57) return WMO_MESSAGES[51]
  if (code >= 61 && code <= 67) return WMO_MESSAGES[61]
  if (code >= 71 && code <= 77) return WMO_MESSAGES[71]
  if (code >= 80 && code <= 82) return WMO_MESSAGES[80]
  if (code >= 95 && code <= 99) return WMO_MESSAGES[95]
  return 'Conditions normales pour jardiner.'
}

export default function useWeather(city) {
  const [weather, setWeather] = useState({ temp: null, message: null, loading: false, error: false })

  useEffect(() => {
    if (!city) return

    let cancelled = false
    setWeather({ temp: null, message: null, loading: true, error: false })

    async function fetchWeather() {
      try {
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=fr&format=json`
        )
        const geoData = await geoRes.json()
        const loc = geoData.results?.[0]
        if (!loc) throw new Error('Ville introuvable')

        const { latitude, longitude } = loc
        const meteoRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`
        )
        const meteoData = await meteoRes.json()
        const current = meteoData.current

        if (!cancelled) {
          setWeather({
            temp: Math.round(current.temperature_2m),
            message: getWeatherMessage(current.weather_code),
            loading: false,
            error: false,
          })
        }
      } catch {
        if (!cancelled) {
          setWeather({ temp: null, message: null, loading: false, error: true })
        }
      }
    }

    fetchWeather()
    return () => { cancelled = true }
  }, [city])

  return weather
}
