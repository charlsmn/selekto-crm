'use server'

import prisma from '@/lib/db'
import { z } from 'zod'
import { createTaskSchema } from '@/lib/zod'
import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'

export const createTaskAction = async (
    values: z.infer<typeof createTaskSchema>
) => {
    try {
        const session = await auth()

        if (!session || !session.user || !session.user.id) {
            return {
                error: 'No has iniciado sesión o falta el ID del usuario',
            }
        }

        const plan = await prisma.plans.findFirst({
            where: {
                users: {
                    some: {
                        id: session.user.id,
                    },
                },
            },
        })

        const tasksCount = await prisma.task.count({
            where: {
                userId: session.user.id,
            },
        })

        if (plan?.maxTasks && plan.maxTasks <= tasksCount) {
            return {
                success: false,
                error: 'Tu plan esta al límite, ¡Mejóralo!',
            }
        } else {
            const task = await prisma.task.create({
                data: {
                    name: values.name,
                    description: values.description,
                    userId: session.user.id,
                },
            })

            revalidatePath('/tasks')

            return {
                success: true,
                taskId: task.taskId,
            }
        }
    } catch (error) {
        console.error('Error al crear la tarea:', error)
        return {
            error: 'Hubo un error al crear la tarea',
        }
    }
}

export const deleteTaskAction = async (taskId: string) => {
    try {
        await prisma.task.delete({
            where: {
                taskId: taskId,
            },
        })

        revalidatePath('/tasks')

        return {
            success: true,
        }
    } catch (error) {
        console.error('Error al eliminar la tarea:', error)
        return {
            error: 'Hubo un error al eliminar la tarea',
        }
    }
}
