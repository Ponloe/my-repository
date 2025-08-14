import { useEffect, useState } from "react"

export interface SpotifyProfile {
  display_name: string
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
    setLoading(true)
    setError(null)
    
    try {
      const res = await fetch("/api/spotify/access")
      
      if (!res.ok) {
        throw new Error("Failed to load Spotify profile")
      }
      
      const data = await res.json()
      setProfile(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load Spotify profile")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return { profile, loading, error, refetch: fetchProfile }
}