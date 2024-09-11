import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import prisma from '@/lib/db'
import { v4 as uuidv4 } from 'uuid'

interface Params {
    clientId: string
}

export async function POST(
    request: NextRequest,
    { params }: { params: Params }
) {
    const { clientId } = params

    async function isValidClient() {
        const client = await prisma.user.findUnique({
            where: { id: clientId },
        })

        return client ? true : false
    }

    if (await isValidClient()) {
        try {
            const data = await request.json()

            const attempId = uuidv4()
            const hookId = uuidv4()
            const requestId = uuidv4()

            return NextResponse.json({
                attemp: attempId,
                id: hookId,
                requestId: requestId,
                status: 'success',
                data,
            })
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Unknown error occurred'

            return NextResponse.json({
                attempt: uuidv4(), // También puedes generar un nuevo ID en caso de error
                id: uuidv4(),
                request_id: uuidv4(),
                status: 'failure',
                message: 'Error al procesar los datos recibidos',
                error: errorMessage,
            })
        }
    } else {
        return NextResponse.json({
            attempt: uuidv4(), // También puedes generar un nuevo ID en caso de error
            id: uuidv4(),
            request_id: uuidv4(),
            status: 'failure',
            message: 'Error al procesar los datos recibidos',
        })
    }
}
