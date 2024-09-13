import { signOut } from '@/auth'
import { LogOut } from 'lucide-react'

type LogoutButtonProps = {
    textButton?: string
}

export default function LogoutButton({ textButton }: LogoutButtonProps) {
    return (
        <form
            action={async () => {
                'use server'
                await signOut()
            }}
        >
            <button type="submit" className="w-full flex items-center">
                <LogOut className="mr-2 h-4 w-4" />
                {textButton || 'Cerrar sesión'}
            </button>
        </form>
    )
}
