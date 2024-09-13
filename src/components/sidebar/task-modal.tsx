'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import CreateTaskForm from './create-task-form'
import { CircleFadingPlus } from 'lucide-react'
import { Button } from '../ui/button'

export default function TaskModal() {
    const [isOpen, setIsOpen] = useState(false)

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    className="w-full bg-white text-primary font-bold hover:bg-white/90"
                    variant="secondary"
                >
                    Nueva tarea
                    <CircleFadingPlus className="ml-2" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Crear una nueva tarea</DialogTitle>
                    <DialogDescription>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit.
                    </DialogDescription>
                </DialogHeader>
                <CreateTaskForm closeModal={closeModal} />
            </DialogContent>
        </Dialog>
    )
}
