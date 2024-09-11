import { auth } from '@/auth'
import { useRouter } from 'next/navigation'

export default async function Dashboard() {
    const session = await auth()
    const router = useRouter()

    if (!session) {
        router.push('/dashboard')
    }
    return
}
