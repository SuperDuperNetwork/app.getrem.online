import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST() {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Find Stripe customer by Clerk user ID
  const existingCustomers = await stripe.customers.search({
    query: `metadata["clerk_user_id"]:"${userId}"`,
  })

  if (existingCustomers.data.length === 0) {
    return NextResponse.json({ error: 'No billing account found' }, { status: 404 })
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://app-getrem-online.vercel.app'

  const session = await stripe.billingPortal.sessions.create({
    customer: existingCustomers.data[0].id,
    return_url: `${appUrl}/dashboard/billing`,
  })

  return NextResponse.json({ portal_url: session.url })
}
