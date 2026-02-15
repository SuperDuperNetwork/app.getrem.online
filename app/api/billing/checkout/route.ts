import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const PRICE_MAP: Record<string, string> = {
  pro: process.env.STRIPE_PRO_PRICE_ID!,
  business: process.env.STRIPE_BUSINESS_PRICE_ID!,
}

export async function POST(req: Request) {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { tier } = body

  const priceId = PRICE_MAP[tier]
  if (!priceId) {
    return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
  }

  // Search by metadata (clerk user id)
  const existingCustomers = await stripe.customers.search({
    query: `metadata["clerk_user_id"]:"${userId}"`,
  })

  let customerId: string

  if (existingCustomers.data.length > 0) {
    customerId = existingCustomers.data[0].id
  } else {
    const customer = await stripe.customers.create({
      metadata: { clerk_user_id: userId },
    })
    customerId = customer.id
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app-getrem-online.vercel.app'

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/dashboard/billing?success=true`,
    cancel_url: `${appUrl}/dashboard/billing?canceled=true`,
    metadata: {
      clerk_user_id: userId,
      tier,
    },
  })

  return NextResponse.json({ checkout_url: session.url })
}
