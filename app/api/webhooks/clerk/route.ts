import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(WEBHOOK_SECRET)
  let evt: any

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    })
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const eventType = evt.type

  // Forward to coordinator backend for user provisioning
  if (eventType === 'user.created' || eventType === 'user.updated' || eventType === 'user.deleted') {
    try {
      const backendUrl = process.env.BACKEND_URL || 'https://api.getrem.online'
      await fetch(`${backendUrl}/v1/auth/clerk-webhook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'svix-id': svix_id,
          'svix-timestamp': svix_timestamp,
          'svix-signature': svix_signature,
        },
        body: body,
      })
    } catch (err) {
      console.error('Failed to forward webhook to backend:', err)
    }
  }

  return NextResponse.json({ received: true })
}
