'use client'

import { z } from 'zod'
import { forgotPasswordSchema } from '@/lib/zod'
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
import { forgotPasswordAction } from '@/actions/auth-actions'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { ArrowRight } from 'lucide-react'

export function ForgetPasswordForm() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: '',
        },
    })

    async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
        setError(null)
        setLoading(true)
        const response = await forgotPasswordAction(values)
        if (response.error) {
            setError(response.error)
            setLoading(false)
        } else {
            router.push('/auth/login')
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

                {error && <FormMessage>{error}</FormMessage>}
                <Button type="submit" className="w-full" disabled={loading}>
                    Recuperar contraseña
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </form>
        </Form>
    )
}
