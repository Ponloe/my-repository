import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { SPOTIFY_API_BASE, refreshAccessToken } from "../../../lib/spotify"

export async function GET() {
  try {
    const cookieStore = await cookies()
    let accessToken = cookieStore.get("spotify_access_token")?.value
    const refreshToken = cookieStore.get("spotify_refresh_token")?.value

    if (!accessToken && !refreshToken) {
      return NextResponse.json({ error: "No authentication" }, { status: 401 })
    }

    // Try to fetch with current access token
    let response = await fetch(`${SPOTIFY_API_BASE}/me/player/currently-playing`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    // If token expired, refresh it
    if (response.status === 401 && refreshToken) {
      try {
        const tokens = await refreshAccessToken(refreshToken)
        accessToken = tokens.access_token

        const newResponse = NextResponse.json({})
        newResponse.cookies.set("spotify_access_token", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: tokens.expires_in,
        })

        // Retry the request with new token
        response = await fetch(`${SPOTIFY_API_BASE}/me/player/currently-playing`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      } catch {
        return NextResponse.json({ error: "Token refresh failed" }, { status: 401 })
      }
    }

    if (response.status === 204) {
      // No content means nothing is currently playing
      return NextResponse.json({ is_playing: false, item: null })
    }

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch currently playing" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Currently playing error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
