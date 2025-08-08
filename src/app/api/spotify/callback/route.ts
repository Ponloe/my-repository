import { NextRequest, NextResponse } from "next/server"
import { exchangeCodeForTokens } from "../../../lib/spotify"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const error = searchParams.get("error")

  // Handle user denial
  if (error === "access_denied") {
    return NextResponse.redirect(new URL("/?spotify=denied", request.url))
  }

  if (!code || !state) {
    return NextResponse.redirect(new URL("/?spotify=error", request.url))
  }

  // Verify state to prevent CSRF attacks
  const cookieStore = await cookies()
  const storedState = cookieStore.get("spotify_oauth_state")?.value
  
  if (state !== storedState) {
    return NextResponse.redirect(new URL("/?spotify=invalid_state", request.url))
  }

  try {
    // Exchange code for tokens
    const tokenData = await exchangeCodeForTokens(code)
    
    // Store tokens in secure HTTP-only cookies
    const response = NextResponse.redirect(new URL("/?spotify=success", request.url))
    
    // Set access token (short-lived)
    response.cookies.set("spotify_access_token", tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: tokenData.expires_in
    })
    
    // Set refresh token (long-lived)
    response.cookies.set("spotify_refresh_token", tokenData.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30 // 30 days
    })
    
    // Clear the state cookie
    response.cookies.delete("spotify_oauth_state")
    
    return response
  } catch (error) {
    console.error("Token exchange failed:", error)
    return NextResponse.redirect(new URL("/?spotify=token_error", request.url))
  }
}