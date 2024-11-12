import { ReactNode } from "react"
import React from "react"
import Link from "next/link"
import { MdHome } from "react-icons/md"

interface IAuthLayoutProps {
    children : ReactNode
}

export default function AuthLayout({children}: IAuthLayoutProps) {
    return (
        <main>
            <nav className="fixed top-0 items-center justify-start p-5 w-full flex gap-3 text-sm font-semibold">
            <Link href="/">
                <MdHome className='h-5 w-5 top-10 left-10 text-black hover:text-gray-700'/>
            </Link>
            <Link href='/auth'>
                <div className='text-black border border-gray-200 hover:bg-gray-200 rounded-lg px-3 py-1'>As User</div>
            </Link>
            <Link href='/auth/event-organizer'>
                <div className='text-black border border-gray-200 hover:bg-gray-200 rounded-lg px-3 py-1'>As Event Organizer</div>
            </Link>
            </nav>
            {children}
        </main>
    )
} 