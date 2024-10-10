import prisma from '@/lib/db'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { deleteTaskAction } from '@/actions/tasks-actions'
import ZohoConnection from '@/components/zoho-conection'

export default async function Tasks() {
    const session = await auth()

    if (!session) {
        redirect('/auth/login')
    }

    const tasks = await prisma.task.findMany({
        where: {
            userId: session.user.id,
        },
    })

    return (
        <>
            <ul>
                {tasks.map((task) => (
                    <li
                        key={task.taskId}
                        className="border border-primary rounded-lg p-4 mb-4"
                    >
                        <h3>{task.name}</h3>
                        <p>{task.description}</p>
                        <Button asChild>
                            <Link href={`/tasks/${task.taskId}`}>
                                Ver detalles
                            </Link>
                        </Button>
                        <form
                            action={async () => {
                                'use server'
                                await deleteTaskAction(task.taskId)
                            }}
                        >
                            <Button variant="destructive" type="submit">
                                Borrar
                            </Button>
                        </form>
                    </li>
                ))}
            </ul>
            <ZohoConnection />
        </>
    )
}
