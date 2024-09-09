import Link from 'next/link'
import { ForgetPasswordForm } from '@/app/(auth)/auth/forgot-password/forgot-password-form'
import { ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
    return (
        <div className="grid gap-2 ">
            <Link
                className="text-primary font-medium flex gap-2 items-center mb-3"
                href="/auth/login"
            >
                <ArrowLeft className=" h-4 w-4" />
                Volver a iniciar sesión
            </Link>
            <h1 className="text-3xl font-bold">¿Olvidaste tu contraseña?</h1>
            <p className="text-balance text-muted-foreground text-lg font-normal">
                Te enviaremos un correo electrónico con un enlace para recuperar
                tu contraseña.
            </p>
            <ForgetPasswordForm />
        </div>
    )
}
