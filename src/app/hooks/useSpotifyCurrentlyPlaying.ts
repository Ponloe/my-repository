import { useEffect, useState } from "react"

export interface SpotifyTrack {
  id: string
  name: string
  artists: { name: string }[]
  album: {
    name: string
    images: { url: string }[]
  }
  external_urls: {
    spotify: string
  }
}

export interface SpotifyCurrentlyPlaying {
  item: SpotifyTrack | null
  is_playing: boolean
}

export function useSpotifyCurrentlyPlaying() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<SpotifyCurrentlyPlaying | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCurrentlyPlaying = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const res = await fetch("/api/spotify/my-currently-playing")
      
      if (!res.ok) {
        throw new Error("Failed to load currently playing")
      }
      
      const data = await res.json()
      setCurrentlyPlaying(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load currently playing")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCurrentlyPlaying()
    
    // Poll every 30 seconds
    const interval = setInterval(fetchCurrentlyPlaying, 30000)
    
    return () => clearInterval(interval)
  }, [])

  return { currentlyPlaying, loading, error, refetch: fetchCurrentlyPlaying }
}