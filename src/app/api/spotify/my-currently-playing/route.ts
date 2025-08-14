import { getMyAccessToken } from "../../../lib/spotify"

export async function GET() {
  try {
    const token = await getMyAccessToken()
    
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (response.status === 204 || response.status === 202) {
      return Response.json({ is_playing: false, item: null })
    }

    if (!response.ok) {
      throw new Error('Failed to fetch currently playing')
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error('Error fetching currently playing:', error)
    return Response.json({ error: 'Failed to fetch currently playing' }, { status: 500 })
  }
}