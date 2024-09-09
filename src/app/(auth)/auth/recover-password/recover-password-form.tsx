'use client'

import { z } from 'zod'
import { recoverPasswordSchema } from '@/lib/zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { updateNewPassword } from '@/actions/auth-actions'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { ArrowRight } from 'lucide-react'

export function RecoverPasswordForm({ user }: { user: string }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const form = useForm<z.infer<typeof recoverPasswordSchema>>({
        resolver: zodResolver(recoverPasswordSchema),
        defaultValues: {
            password: '',
            email: user,
        },
    })

    async function onSubmit(values: z.infer<typeof recoverPasswordSchema>) {
        setError(null)
        setLoading(true)
        const response = await updateNewPassword(values)
        if (response.error) {
            setError(response.error)
            setLoading(false)
        } else {
            router.push('/auth/login?passwordUpdated=true')
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nueva contraseña</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="••••••••••••"
                                    {...field}
                                    type="password"
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {error && <FormMessage>{error}</FormMessage>}
                <Button type="submit" className="w-full" disabled={loading}>
                    Guardar nueva contraseña
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </form>
        </Form>
    )
}
