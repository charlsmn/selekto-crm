import prisma from '@/lib/db'

export default async function Note() {
    const note = await prisma.notes.findMany()

    return (
        <div>
            <pre>{JSON.stringify(note, null, 2)}</pre>
        </div>
    )
}
