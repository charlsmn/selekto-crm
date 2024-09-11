'use client'

import { z } from 'zod'
import { loginSchema } from '@/lib/zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginAction } from '@/actions/auth-actions'
import { useState } from 'react'

import Link from 'next/link'
import { AlertCircle, ArrowRight } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useRouter } from 'next/navigation'

export function LoginForm() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [emailSend, setEmailSend] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        setError(null)
        setLoading(true)
        const response = await loginAction(values)
        if (response.error) {
            setLoading(false)

            if (response.error === 'email') {
                setEmailSend(true)
            } else {
                setError(response.error)
            }
        } else {
            router.push('/dashboard')
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="email@example.com"
                                    type="email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex justify-between">
                                Contraseña{' '}
                                <Link
                                    href="/auth/forgot-password"
                                    className="font-medium"
                                >
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="••••••••••••"
                                    {...field}
                                    type="password"
                                />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Ha ocurrido un error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                {emailSend && (
                    <Alert>
                        <AlertTitle>¡Revisa tu correo!</AlertTitle>
                        <AlertDescription>
                            Te enviamos un correo electrónico con un enlace para
                            confirmar tu cuenta. Si no recibes el correo, revisa
                            tu carpeta de spam.
                        </AlertDescription>
                    </Alert>
                )}
                <Button type="submit" className="w-full" disabled={loading}>
                    Iniciar Sesión
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </form>
        </Form>
    )
}
