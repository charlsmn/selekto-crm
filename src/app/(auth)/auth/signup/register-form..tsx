'use client'

import { z } from 'zod'
import { registerSchema } from '@/lib/zod'
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
import { registerAction } from '@/actions/auth-actions'
import { useState } from 'react'

import { ArrowRight } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export function RegisterForm() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [emailSend, setEmailSend] = useState(false)

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            name: '',
            lastname: '',
            password: '',
        },
    })

    async function onSubmit(values: z.infer<typeof registerSchema>) {
        setError(null)
        setLoading(true)
        setEmailSend(false)
        const response = await registerAction(values)

        if (response.error) {
            setLoading(false)

            if (response.error === 'email') {
                setEmailSend(true)
            } else {
                setError(response.error)
            }
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 w-full"
            >
                <div className="flex gap-2 ">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Nombre"
                                        type="text"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Apellido</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Apellido"
                                        type="text"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
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
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="••••••••••••"
                                    {...field}
                                    type="password"
                                />
                            </FormControl>
                            <FormDescription>
                                La contraseña debe contener al menos una letra
                                mayúscula, una letra minúscula, un número y un
                                carácter especial
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {error && <FormMessage>{error}</FormMessage>}
                {emailSend && (
                    <Alert>
                        <AlertTitle>¡Bienvenido!</AlertTitle>
                        <AlertDescription>
                            Te enviamos un correo electrónico con un enlace para
                            confirmar tu cuenta. Si no recibes el correo, revisa
                            tu carpeta de spam.
                        </AlertDescription>
                    </Alert>
                )}
                <Button type="submit" className="w-full" disabled={loading}>
                    Registrarse
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </form>
        </Form>
    )
}
