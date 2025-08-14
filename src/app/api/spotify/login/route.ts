import { NextResponse } from "next/server"
import { buildAuthUrl } from "@/app/lib/spotify"
import crypto from "crypto"

export async function GET() {
  const state = crypto.randomBytes(8).toString("hex")
  const res = NextResponse.redirect(buildAuthUrl(state))
  res.cookies.set("spotify_oauth_state", state, { httpOnly: true, path: "/", maxAge: 300 })
  return res
}