import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const API_KEY = process.env.CONVERTKIT_API_KEY
    const FORM_ID = process.env.CONVERTKIT_FORM_ID
    const API_URL = process.env.CONVERTKIT_API_URL

    if (!API_KEY || !FORM_ID || !API_URL) {
      console.error('Missing ConvertKit environment variables')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Subscribe to ConvertKit
    const convertKitResponse = await fetch(
      `${API_URL}forms/${FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: API_KEY,
          email: email,
        }),
      }
    )

    const convertKitData = await convertKitResponse.json()

    if (!convertKitResponse.ok) {
      console.error('ConvertKit API error:', convertKitData)
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Successfully subscribed! Please check your email to confirm.',
        subscriber: convertKitData.subscription 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}