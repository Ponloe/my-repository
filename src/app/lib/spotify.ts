export const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
export const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
export const SPOTIFY_API_BASE = "https://api.spotify.com/v1"

const clientId = process.env.SPOTIFY_CLIENT_ID!
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!
const redirectUri = process.env.SPOTIFY_REDIRECT_URI!
const scopes = (process.env.SPOTIFY_SCOPES || "user-read-email user-read-private").split(" ").join(" ")

export function buildAuthUrl(state: string) {
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: scopes,
    state,
  })
  return `${SPOTIFY_AUTH_URL}?${params.toString()}`
}

export async function exchangeCodeForTokens(code: string) {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  })
  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Authorization": "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  })
  if (!res.ok) throw new Error("Token exchange failed")
  return res.json() as Promise<{ access_token: string; refresh_token: string; expires_in: number }>
}

export async function refreshAccessToken(refreshToken: string) {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  })
  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Authorization": "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  })
  if (!res.ok) throw new Error("Refresh failed")
  return res.json() as Promise<{ access_token: string; expires_in: number }>
}

export async function getMyAccessToken(): Promise<string> {
  const refreshToken = process.env.SPOTIFY_MY_REFRESH_TOKEN

  if (!refreshToken) {
    throw new Error('SPOTIFY_MY_REFRESH_TOKEN environment variable is required')
  }

  const response = await refreshAccessToken(refreshToken)
  return response.access_token
}