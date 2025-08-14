import { useEffect, useState, useCallback } from "react"

export interface SpotifyTrack {
  id: string
  name: string
  artists: Array<{ name: string; id: string }>
  album: {
    name: string
    images: Array<{ url: string; height: number; width: number }>
  }
  external_urls: {
    spotify: string
  }
  preview_url: string | null
  duration_ms: number
}

export interface SpotifyCurrentlyPlaying {
  is_playing: boolean
  progress_ms: number | null
  item: SpotifyTrack | null
  timestamp: number
}

export function useSpotifyCurrentlyPlaying() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<SpotifyCurrentlyPlaying | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCurrentlyPlaying = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const res = await fetch("/api/spotify/currently-playing")
      
      if (res.status === 401) {
        setCurrentlyPlaying(null)
        setError("Not authenticated with Spotify")
      } else if (res.status === 204 || (res.ok && (await res.clone().json()).is_playing === false)) {
        // No content or not playing
        setCurrentlyPlaying({ is_playing: false, progress_ms: null, item: null, timestamp: Date.now() })
      } else if (!res.ok) {
        setError("Failed to load currently playing")
      } else {
        const data = await res.json()
        setCurrentlyPlaying(data)
      }
    } catch {
      setError("Network error")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCurrentlyPlaying()

    // Poll every 10 seconds to update the currently playing track
    const interval = setInterval(fetchCurrentlyPlaying, 10000)

    return () => clearInterval(interval)
  }, [fetchCurrentlyPlaying])

  return { 
    currentlyPlaying, 
    loading, 
    error, 
    refetch: fetchCurrentlyPlaying 
  }
}
