const KEY = 'growup_user_profile'

export function getProfile() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveProfile(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
}

export function clearProfile() {
  localStorage.removeItem(KEY)
}
