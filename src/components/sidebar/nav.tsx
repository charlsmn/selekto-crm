'use client'

import Link from 'next/link'
import { LucideIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

interface LinkItem {
    title: string
    label: string
    icon: LucideIcon
    href: string
}

interface NavProps {
    links: LinkItem[]
}

export function Nav({ links }: NavProps) {
    const pathname = usePathname()
    return (
        <div className="group flex flex-col gap-4  ">
            <nav className="grid gap-1">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        className={clsx(
                            'flex items-center justify-between text-[14px] font-medium text-white/90 hover:bg-white/10 rounded-md px-2 py-2 h-11 hover:ring-1 ring-inset ring-white/20 transition-all',
                            {
                                'bg-white/10 ring-1 ring-inset ring-white/20':
                                    pathname === link.href,
                            }
                        )}
                    >
                        <div className="flex items-center">
                            <link.icon className="mr-3 h-5 w-5" />
                            {link.title}
                        </div>

                        {link.label && (
                            <span className="ring-1 py-1 px-2 rounded-md text-xs">
                                {link.label}
                            </span>
                        )}
                    </Link>
                ))}
            </nav>
        </div>
    )
}
