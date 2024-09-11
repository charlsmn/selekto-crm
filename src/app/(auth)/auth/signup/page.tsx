import { RegisterForm } from '@/app/(auth)/auth/signup/register-form.'
import { auth } from '@/auth'
import ActuallyLogin from '@/components/actually-login'
import Link from 'next/link'
import LoginButtonGoogle from '@/components/login-button-google'

export default async function signUpPage() {
    const session = await auth()

    return (
        <>
            {(session && <ActuallyLogin />) || (
                <>
                    <div className="grid gap-2 ">
                        <h1 className="text-3xl font-bold">
                            Crea una cuenta en Selekto
                        </h1>
                        <p className="text-balance text-muted-foreground text-lg font-normal">
                            ¿Ya tienes una cuenta?{' '}
                            <Link
                                className="text-primary font-medium"
                                href="/auth/login"
                            >
                                Inicia sesión
                            </Link>
                            .
                        </p>
                    </div>
                    <LoginButtonGoogle />
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t"></span>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-background px-2 text-muted-foreground ">
                                O regístrate con tu email
                            </span>
                        </div>
                    </div>
                    <RegisterForm />
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
