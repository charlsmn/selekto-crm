import Sidebar from '@/components/sidebar/sidebar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen w-full flex-col">
            <Sidebar />
            <div className="md:ml-64 lg:ml-72 pl-4">{children}</div>
        </div>
    )
}
