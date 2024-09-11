import { LoginForm } from '@/app/(auth)/auth/login/login-form'

import { auth } from '@/auth'
import ActuallyLogin from '@/components/actually-login'
import Link from 'next/link'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { BadgeCheck } from 'lucide-react'
import LoginButtonGoogle from '@/components/login-button-google'

interface SearchParamsInterface {
    verified?: string
    passwordUpdated?: string
}

export default async function LoginPage({
    searchParams,
}: {
    searchParams: SearchParamsInterface
}) {
    const session = await auth()
    const isVerified = searchParams.verified === 'true'
    const isPasswordUpdated = searchParams.passwordUpdated === 'true'

    return (
        <>
            {(session && <ActuallyLogin />) || (
                <>
                    <div className="grid gap-2 ">
                        <h1 className="text-3xl font-bold">
                            Inicia sesión en Selekto
                        </h1>
                        <p className="text-balance text-muted-foreground text-lg font-normal">
                            ¿No tienes una cuenta?{' '}
                            <Link
                                className="text-primary font-medium"
                                href="/auth/signup"
                            >
                                Regístrate
                            </Link>
                            .
                        </p>
                    </div>

                    {isVerified && (
                        <Alert>
                            <BadgeCheck className="h-4 w-4" />
                            <AlertTitle>¡Bienvenido!</AlertTitle>
                            <AlertDescription>
                                Tu email ha sido verificado. Ahora puedes
                                iniciar sesión.
                            </AlertDescription>
                        </Alert>
                    )}
                    {isPasswordUpdated && (
                        <Alert>
                            <BadgeCheck className="h-4 w-4" />
                            <AlertTitle>¡Bienvenido!</AlertTitle>
                            <AlertDescription>
                                Tu contraseña ha sido actualizada. Ahora puedes
                                iniciar sesión.
                            </AlertDescription>
                        </Alert>
                    )}
                    <LoginForm />
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t"></span>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-background px-2 text-muted-foreground ">
                                Ó
                            </span>
                        </div>
                    </div>
                    <LoginButtonGoogle />
                    <p className="text-xs text-slate-11 font-normal">
                        Al ingresar, estas de acuerdo con nuestros{' '}
                        <Link
                            href="/terminos"
                            className="text-primary font-medium"
                        >
                            Términos y Condiciones
                        </Link>{' '}
                        y nuestra{' '}
                        <Link
                            href="/politica"
                            className="text-primary font-medium"
                        >
                            Política de Privacidad
                        </Link>
                    </p>
                </>
            )}
        </>
    )
}
