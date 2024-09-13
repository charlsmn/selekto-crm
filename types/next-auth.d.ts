import { DefaultSession } from 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
    interface Session {
        user: {
            role?: string
            id?: string
            lastname?: string
            image?: string
        } & DefaultSession['user']
    }

    interface User {
        role?: string
        id?: string
        lastname?: string
        image?: string
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        role?: string
        id?: string
        lastname?: string
        image?: string
    }
}
