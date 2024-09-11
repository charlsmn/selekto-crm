export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="w-full lg:grid lg:min-h-full lg:grid-cols-2 xl:min-h-full h-svh p-4">
            <div className="hidden bg-primary lg:block rounded-3xl"></div>
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[450px] gap-6">{children}</div>
            </div>
        </div>
    )
}
