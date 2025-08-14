import { getMyAccessToken } from "../../../lib/spotify"

export async function GET() {
  try {
    const token = await getMyAccessToken()
    
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch profile')
    }

    const profile = await response.json()
    
    return Response.json({
      display_name: profile.display_name,
      images: profile.images,
      id: profile.id,
      followers: profile.followers,
      product: profile.product
    })
  } catch (error) {
    console.error('Error fetching Spotify profile:', error)
    return Response.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}