'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createTaskSchema } from '@/lib/zod'
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
import { Textarea } from '@/components/ui/textarea'
import { CircleFadingPlus } from 'lucide-react'
import { createTaskAction } from '@/actions/tasks-actions'
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

export default function CreateTaskForm({
    closeModal,
}: {
    closeModal: () => void
}) {
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const form = useForm<z.infer<typeof createTaskSchema>>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    })

    async function onSubmit(values: z.infer<typeof createTaskSchema>) {
        setError(null)
        const response = await createTaskAction(values)

        if (response.success) {
            closeModal()
            router.push(`/tasks/${response.taskId}`)
        } else if (response.error) {
            setError(response.error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre de la tarea</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormDescription>
                                Describe brevemente la tarea que quieres
                                realizar
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {error && (
                    <Alert variant="destructive">
                        <ExclamationTriangleIcon className="h-4 w-4" />
                        <AlertTitle>¡Ha ocurrido un error!</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <Button type="submit">
                    Crear tarea <CircleFadingPlus className="ml-2" />
                </Button>
            </form>
        </Form>
    )
}
