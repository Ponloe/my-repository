import { exchangeCodeForTokens } from "../../../lib/spotify"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const error = searchParams.get("error")

  if (error) {
    return Response.redirect(new URL("/?error=access_denied", request.url))
  }

  if (!code || !state) {
    return Response.redirect(new URL("/?error=invalid_request", request.url))
  }

  try {
    const tokens = await exchangeCodeForTokens(code)
    
    // 🔥 TEMPORARILY LOG THE REFRESH TOKEN - REMOVE AFTER GETTING IT
    console.log("🔑 YOUR REFRESH TOKEN:", tokens.refresh_token)
    console.log("📋 Copy this to SPOTIFY_MY_REFRESH_TOKEN environment variable")
    
    return Response.redirect(new URL("/?success=spotify_connected", request.url))
  } catch (error) {
    console.error("Token exchange failed:", error)
    return Response.redirect(new URL("/?error=token_exchange_failed", request.url))
  }
}