"use client"
import { useSpotifyProfile } from "../hooks/useSpotifyProfile"
import Image from "next/image"

export default function SpotifyProfile() {
  const { profile, loading, error, refetch } = useSpotifyProfile()

  const handleLogout = async () => {
    await fetch("/api/spotify/logout", { method: "POST" })
    refetch() // This will trigger a re-fetch and show the connect button
  }

  if (loading) return <div className="text-sm text-gray-400">Loading Spotify...</div>
  if (error) return <div className="text-sm text-red-500">{error}</div>

  if (!profile) {
    return (
      <button
        onClick={() => { window.location.href = "/api/spotify/login" }}
        className="px-3 py-2 text-xs rounded bg-green-600 hover:bg-green-500 transition"
      >
        Connect Spotify
      </button>
    )
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      {profile.images?.[0]?.url && (
        <Image
          src={profile.images[0].url}
          alt="Spotify Avatar"
          width={32}
          height={32}
          className="w-8 h-8 rounded-full object-cover"
          unoptimized
          priority
        />
      )}
      <div>
        <div className="font-semibold">{profile.display_name}</div>
        <div className="text-xs text-gray-400">
          Followers: {profile.followers?.total ?? 0} • {profile.product}
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={refetch} className="text-xs text-green-400 hover:underline">
          Refresh
        </button>
        <button onClick={handleLogout} className="text-xs text-red-400 hover:underline">
          Logout
        </button>
      </div>
    </div>
  )
}