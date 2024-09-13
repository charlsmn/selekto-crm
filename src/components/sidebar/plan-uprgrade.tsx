import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import prisma from '@/lib/db'
import { auth } from '@/auth'

export default async function PlanUpgrade() {
    const session = await auth()

    if (!session) {
        return null
    }

    const tasks = await prisma.task.count({
        where: {
            userId: session.user.id,
        },
    })

    // número de tareas maximas segun el plan del usuario
    const usePlan = await prisma.plans.findFirst({
        where: {
            users: {
                some: {
                    id: session.user.id,
                },
            },
        },
    })

    return (
        <div className="flex flex-col gap-1 bg-white rounded-xl px-3 py-3 ring-1 ring-inset ring-white/20 text-white  transition-colors">
            <div className="flex items-center justify-between gap-2 mb-1">
                <h3 className="text-foreground text-sm font-bold">Plan Free</h3>
                <Link
                    href="/dashboard"
                    className="text-[12px] text-primary underline"
                >
                    Mejorar
                </Link>
            </div>
            <Progress value={tasks === 0 ? 0 : 100 * (tasks / 10)} />
            <p className="text-xs text-muted-foreground">
                {tasks === 0 ? (
                    <span>0 tareas creadas</span>
                ) : (
                    <span>
                        {tasks} de {usePlan?.maxTasks} tareas creadas
                    </span>
                )}
            </p>
        </div>
    )
}
