import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Stripe webhook secret not configured' }, { status: 500 })
  }

  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET)
  } catch (err: any) {
    console.error('Stripe webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Forward to coordinator backend for subscription management
  try {
    const backendUrl = process.env.BACKEND_URL || 'https://getrem.online'
    await fetch(`${backendUrl}/v1/billing/stripe-webhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'stripe-signature': signature,
      },
      body: body,
    })
  } catch (err) {
    console.error('Failed to forward Stripe webhook to backend:', err)
  }

  return NextResponse.json({ received: true })
}
