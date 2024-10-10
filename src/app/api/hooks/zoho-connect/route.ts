import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams

    const code = searchParams.get('code')
    const location = searchParams.get('location')
    const accounts_server = searchParams.get('accounts-server')

    if (!code || !location || !accounts_server) {
        return new NextResponse('Missing parameters', { status: 400 })
    }

    const clientId = process.env.ZOHO_CLIENT_ID
    const clientSecret = process.env.ZOHO_CLIENT_SECRET
    const nextUrl = process.env.NEXTAUTH_URL

    if (!clientId || !clientSecret) {
        return new NextResponse('Missing environment variables', {
            status: 500,
        })
    }

    const formData = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: `${nextUrl}/api/hooks/zoho-connect`,
        code,
    })

    const url = `${accounts_server}/oauth/v2/token`

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
    })

    if (!response.ok) {
        const errorResponse = await response.json()
        return new NextResponse(`Error: ${errorResponse.error}`, {
            status: response.status,
        })
    }

    const data = await response.json()
    return NextResponse.json(data)
}
