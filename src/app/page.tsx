import { auth } from '@/auth'
import LogoutButton from '@/components/logout-button'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { RocketIcon } from '@radix-ui/react-icons'

export default async function Dashboard() {
    const session = await auth()

    if (!session) {
        return <div>No session</div>
    }
    return (
        <div className="flex flex-col items-center justify-center">
            <pre>{JSON.stringify(session, null, 2)}</pre>

            <div className="my-4">
                <Alert>
                    <RocketIcon className="h-4 w-4" />
                    <AlertTitle>Url Webhook del Cliente</AlertTitle>
                    <AlertDescription>
                        {process.env.NEXTAUTH_URL}/api/hooks/
                        {session.user.id}
                    </AlertDescription>
                </Alert>
            </div>

            <LogoutButton />
        </div>
    )
}
