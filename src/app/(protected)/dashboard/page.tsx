import { auth } from '@/auth'
import LogoutButton from '@/components/logout-button'

export default async function Dashboard() {
    const session = await auth()

    if (!session) {
        return <div>No session</div>
    }
    return (
        <div className="flex flex-col items-center justify-center">
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <LogoutButton />
        </div>
    )
}
