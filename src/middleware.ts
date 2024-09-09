import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'
import authConfig from './auth.config'

const { auth } = NextAuth(authConfig)

const publicRoutes = ['']
const authRoutes = [
    '/auth/login',
    '/auth/signup',
    '/auth/forgot-password',
    '/auth/recover-password',
]
const apiAuthPrefix = '/api/auth'

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    // Permitir todas las rutas de API de autenticación
    if (nextUrl.pathname.startsWith(apiAuthPrefix)) {
        return NextResponse.next()
    }

    // Permitir acceso a rutas públicas sin importar el estado de autenticación
    // if (publicRoutes.includes(nextUrl.pathname)) {
    //     return NextResponse.next()
    // }

    // Redirigir a /login si el usuario no está logueado y trata de acceder a una ruta protegida
    if (
        !isLoggedIn &&
        !authRoutes.includes(nextUrl.pathname) &&
        !publicRoutes.includes(nextUrl.pathname)
    ) {
        return NextResponse.redirect(new URL('/auth/login', nextUrl))
    }

    return NextResponse.next()
})

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
