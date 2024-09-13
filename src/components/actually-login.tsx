import { Button } from '@/components/ui/button'
import Link from 'next/link'

import { auth, signOut } from '@/auth'
import { LogOut } from 'lucide-react'

export default async function ActuallyLogin() {
    const session = await auth()

    return (
        <div className="grid gap-2 text-center">
            <p className="mb-1">Iniciaste sesión como {session?.user.email}</p>
            <Button>
                <Link href="/dashborad">Continuar</Link>
            </Button>
            <form
                action={async () => {
                    'use server'
                    await signOut()
                }}
            >
                <Button
                    type="submit"
                    className="w-full flex items-center"
                    variant={'outline'}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Iniciar sessión con otro correo
                </Button>
            </form>
        </div>
    )
}
