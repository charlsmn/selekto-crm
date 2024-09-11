import { Button } from '@/components/ui/button'
import Link from 'next/link'
import LogoutButton from './logout-button'
import { auth } from '@/auth'

export default async function ActuallyLogin() {
    const session = await auth()

    return (
        <div className="grid gap-2 text-center">
            <p className="mb-1">Iniciaste sesión como {session?.user.email}</p>
            <Button>
                <Link href="/dashborad">Continuar</Link>
            </Button>
            <LogoutButton textButton="Iniciar sesión con otro correo" />
        </div>
    )
}
