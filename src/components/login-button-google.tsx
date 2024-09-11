'use client'
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function LoginButtonGoogle() {
    const [loading, setLoading] = useState(false)

    const handleClick = async () => {
        setLoading(true)
        await signIn('google', { callbackUrl: '/dashboard' })
        setLoading(false)
    }

    return (
        <Button
            variant="outline"
            className="w-full"
            onClick={handleClick}
            disabled={loading}
        >
            {(loading && (
                <div className="animate-spin h-5 w-5 mr-2">
                    <AiOutlineLoading3Quarters className="h-5 w-5" />
                </div>
            )) || <FcGoogle className="h-5 w-5 mr-2" />}
            Inicia con Google
        </Button>
    )
}
