import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export default function useAppLinks() {
  const adminUrl = import.meta.env.VITE_ADMIN_URL || '#'

  const [parentApp, setParentApp] = useState({ downloadUrl: '#', version: '' })
  const [driverApp, setDriverApp] = useState({ downloadUrl: '#', version: '' })

  useEffect(() => {
    async function fetchLatest(appName, setter) {
      try {
        const res = await fetch(`${API_URL}/app-versions/latest/${appName}`)
        if (res.ok) {
          const data = await res.json()
          setter({ downloadUrl: data.downloadUrl || '#', version: data.version || '' })
        }
      } catch {
        // Backend unavailable — keep placeholder links
      }
    }

    fetchLatest('parent', setParentApp)
    fetchLatest('driver', setDriverApp)
  }, [])

  return { adminUrl, parentApp, driverApp }
}
