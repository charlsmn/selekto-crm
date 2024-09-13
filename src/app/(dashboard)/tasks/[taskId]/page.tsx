import prisma from '@/lib/db'
import { redirect } from 'next/navigation'

export default async function Task({ params }: { params: { taskId: string } }) {
    if (!params.taskId) {
        redirect('/tasks')
    }

    const task = await prisma.task.findUnique({
        where: {
            taskId: params.taskId,
        },
    })

    return (
        <div>
            Task <pre>{JSON.stringify(task, null, 2)}</pre>
        </div>
    )
}
