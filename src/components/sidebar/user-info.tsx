import { auth } from '@/auth'
import { User, Settings, CircleHelp } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import LogoutButton from './logout-button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default async function UserInfo() {
    const session = await auth()

    if (!session) {
        return null
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 bg-white/10 rounded-xl px-2 py-2 text-white cursor-pointer hover:bg-white/20 transition-colors">
                    <Avatar className="rounded-lg">
                        <AvatarImage src={session?.user.image} />
                        <AvatarFallback className="bg-primary">
                            {session?.user.name?.[0]}
                            {session?.user.lastname?.[0]}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                        <span className="text-sm font-medium">
                            {session?.user.name + ' ' + session?.user.lastname}
                        </span>
                        <span className="text-xs font-normal text-white/80">
                            {session?.user.email}
                        </span>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                    {' '}
                    {session?.user.name + ' ' + session?.user.lastname}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Ajustes</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <CircleHelp className="mr-2 h-4 w-4" />
                    <span>Soporte</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogoutButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
