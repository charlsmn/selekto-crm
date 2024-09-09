import { signOut } from '@/auth'
import { Button } from '@/components/ui/button'

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
            <Button type="submit" className="w-full" variant={'outline'}>
                {textButton || 'Cerrar sesión'}
            </Button>
        </form>
    )
}
