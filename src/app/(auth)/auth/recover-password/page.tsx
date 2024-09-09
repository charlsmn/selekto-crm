import { redirect } from 'next/navigation'
import prisma from '@/lib/db'
import { RecoverPasswordForm } from './recover-password-form'

export default async function RecoverPasswordPage({
    searchParams,
}: {
    searchParams: { token: string }
}) {
    const token = searchParams.token

    if (!token) {
        redirect('/auth/login')
    }

    // Verificar si el token esta en la base de datos
    const verifyToken = await prisma.verificationToken.findFirst({
        where: {
            token,
        },
    })

    if (!verifyToken) {
        redirect('/auth/login')
    }

    const user = await prisma.user.findFirst({
        where: {
            email: verifyToken.identifier,
        },
    })

    if (!user) {
        redirect('/auth/login')
    }

    return (
        <div className="grid gap-2 ">
            <h1 className="text-3xl font-bold">Recupera tu contraseña</h1>
            <p className="text-balance text-muted-foreground text-lg font-normal">
                Escribe tu nueva contraseña
            </p>
            <RecoverPasswordForm user={user.email} />
        </div>
    )
}
