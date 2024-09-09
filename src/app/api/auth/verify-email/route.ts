import prisma from '@/lib/db'
import { redirect } from 'next/navigation'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const searcParams = request.nextUrl.searchParams
    const token = searcParams.get('token')

    if (!token) {
        return new Response('No token', { status: 400 })
    }

    // Verificar si el token esta en la base de datos
    const verifyToken = await prisma.verificationToken.findFirst({
        where: {
            token,
        },
    })

    if (!verifyToken) {
        return new Response('Token not found', { status: 400 })
    }

    // Verificar si el token ha expirado
    if (verifyToken.expires < new Date()) {
        return new Response('Token expired', { status: 400 })
    }

    // Verificar si el token ya ha sido utilizado
    const user = await prisma.user.findFirst({
        where: {
            email: verifyToken.identifier,
        },
    })

    if (user?.emailVerified) {
        return new Response('El Email ya ha sido verificado', { status: 400 })
    }

    // Actualizar el token como verificado
    await prisma.user.update({
        where: {
            email: verifyToken.identifier,
        },
        data: {
            emailVerified: new Date(),
        },
    })

    // Eliminar el token de la base de datos
    await prisma.verificationToken.delete({
        where: {
            identifier: verifyToken.identifier,
        },
    })

    // return Response.json({
    //     token,
    // })
    redirect('/auth/login?verified=true')
}
