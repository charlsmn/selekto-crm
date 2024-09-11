export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-full flex-col">
            <div className="flex flex-1 flex-col">
                <div className="flex items-center justify-between border-b border-border p-4">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                </div>
                <div className="p-4">{children}</div>
            </div>
        </div>
    )
}
