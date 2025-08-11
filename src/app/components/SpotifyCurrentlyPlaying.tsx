"use client"
import { useSpotifyCurrentlyPlaying } from "../hooks/useSpotifyCurrentlyPlaying"
import { Music, Pause, Play } from "lucide-react"

interface SpotifyCurrentlyPlayingProps {
  isLoaded?: boolean
}

export default function SpotifyCurrentlyPlaying({ isLoaded = true }: SpotifyCurrentlyPlayingProps) {
  const { currentlyPlaying, loading, error } = useSpotifyCurrentlyPlaying()

  if (loading && !currentlyPlaying) {
    return (
      <div className={`flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 transition-all duration-800 ease-out delay-1000 ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}>
        <div className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-lg">
          <Music className="w-5 h-5 text-gray-400 animate-pulse" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm text-gray-400">Loading Spotify...</div>
        </div>
      </div>
    )
  }

  if (error) {
    const isAuthError = error.includes("authenticated")
    return (
      <div className={`flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 transition-all duration-800 ease-out delay-1000 ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}>
        <div className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-lg">
          <Music className="w-5 h-5 text-gray-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm text-red-400">
            {isAuthError ? "Please re-connect Spotify for music info" : error}
          </div>
        </div>
      </div>
    )
  }

  if (!currentlyPlaying?.item) {
    return (
      <div className={`flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 transition-all duration-800 ease-out delay-1000 ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}>
        <div className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-lg">
          <Music className="w-5 h-5 text-gray-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm text-gray-400">No music playing</div>
        </div>
      </div>
    )
  }

  const { item: track, is_playing } = currentlyPlaying
  const albumImage = track.album.images[0]?.url
  const artistNames = track.artists.map(artist => artist.name).join(", ")

  return (
    <div className={`flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:bg-gray-800/70 transition-all duration-800 ease-out delay-1000 ${
      isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`}>
      {/* Album Art */}
      <div className="relative flex-shrink-0">
        {albumImage ? (
          <img
            src={albumImage}
            alt={`${track.album.name} cover`}
            className="w-10 h-10 rounded-lg object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-lg">
            <Music className="w-5 h-5 text-gray-400" />
          </div>
        )}
        
        {/* Play/Pause Indicator */}
        <div className="absolute -bottom-1 -right-1 flex items-center justify-center w-4 h-4 bg-green-500 rounded-full">
          {is_playing ? (
            <Play className="w-2 h-2 text-white fill-current" />
          ) : (
            <Pause className="w-2 h-2 text-white fill-current" />
          )}
        </div>
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <div className="text-green-400 text-xs font-medium">
            {is_playing ? "NOW PLAYING" : "PAUSED"}
          </div>
          {is_playing && (
            <div className="flex space-x-1">
              <div className="w-1 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-1 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-1 h-4 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
            </div>
          )}
        </div>
        
        <div className="text-white text-sm font-medium truncate" title={track.name}>
          {track.name}
        </div>
        
        <div className="text-gray-400 text-xs truncate" title={artistNames}>
          {artistNames}
        </div>
      </div>

      {/* Spotify Link */}
      <a
        href={track.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 p-1.5 text-green-400 hover:text-green-300 hover:bg-green-400/10 rounded transition-colors"
        title="Open in Spotify"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      </a>
    </div>
  )
}
