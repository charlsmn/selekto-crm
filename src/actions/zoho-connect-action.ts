'use server'

import { redirect } from 'next/navigation'

export default async function ZohoConnectAction() {
    const client_id = process.env.ZOHO_CLIENT_ID
    const nextUrl = process.env.NEXTAUTH_URL
    const redirect_uri = `${nextUrl}/api/hooks/zoho-connect`

    const url = `https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL&client_id=${client_id}&response_type=code&access_type=offline&redirect_uri=${redirect_uri}`

    redirect(url)
}
