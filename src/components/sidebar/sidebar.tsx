import { Nav } from '@/components/sidebar/nav'
import Link from 'next/link'
import { links } from '@/components/sidebar/nav-links'

import UserInfo from '@/components/sidebar/user-info'
import PlanUpgrade from '@/components/sidebar/plan-uprgrade'
import TaskModal from './task-modal'

export default function Sidebar() {
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 md:w-64 lg:w-72 p-4 pr-0 md:flex">
            <div className="flex flex-col gap-4 justify-between w-full bg-primary rounded-2xl p-4 ">
                <div className="flex flex-col gap-4">
                    <Link
                        href="/dashboard"
                        className="flex gap-3 hover:bg-white/10 rounded-xl mb-5"
                    >
                        <div className="w-11 h-11 rounded-xl bg-white"></div>
                        <div className="flex flex-col justify-center  text-white">
                            <h3 className="m-0 text-sm">Selekto CRM</h3>
                            <span className="text-xs font-normal text-white/80">
                                Mi negrito bello slogan
                            </span>
                        </div>
                    </Link>
                    <TaskModal />
                    <Nav links={links} />
                </div>
                <div className="flex flex-col gap-4">
                    <PlanUpgrade />
                    <UserInfo />
                </div>
            </div>
        </aside>
    )
}
