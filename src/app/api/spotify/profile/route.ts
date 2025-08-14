import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { refreshAccessToken, SPOTIFY_API_BASE } from "../../../lib/spotify"

export async function GET(request: NextRequest) {
  const cookieStore = await cookies()
  let accessToken = cookieStore.get("spotify_access_token")?.value
  const refreshToken = cookieStore.get("spotify_refresh_token")?.value

  if (!accessToken && !refreshToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  // Try to refresh token if access token is missing
  if (!accessToken && refreshToken) {
    try {
      const tokenData = await refreshAccessToken(refreshToken)
      accessToken = tokenData.access_token
      
      // Update access token cookie
      const response = new NextResponse()
      response.cookies.set("spotify_access_token", tokenData.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: tokenData.expires_in
      })
    } catch (error) {
      return NextResponse.json({ error: "Token refresh failed" }, { status: 401 })
    }
  }

  try {
    const response = await fetch(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (!response.ok) {
      if (response.status === 401) {
        return NextResponse.json({ error: "Token expired" }, { status: 401 })
      }
      throw new Error("Failed to fetch profile")
    }

    const profile = await response.json()
    return NextResponse.json(profile)
  } catch (error) {
    console.error("Profile fetch failed:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}