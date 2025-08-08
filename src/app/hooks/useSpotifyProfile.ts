import { useEffect, useState } from "react"

export interface SpotifyProfile {
  display_name: string
  email: string
  images?: { url: string }[]
  id: string
  followers?: { total: number }
  product?: string
}

export function useSpotifyProfile() {
  const [profile, setProfile] = useState<SpotifyProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = async () => {
    setLoading(true); setError(null)
    const res = await fetch("/api/spotify/profile")
    if (res.status === 401) {
      setProfile(null)
    } else if (!res.ok) {
      setError("Failed to load Spotify profile")
    } else {
      setProfile(await res.json())
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return { profile, loading, error, refetch: fetchProfile }
}