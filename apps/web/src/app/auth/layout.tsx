'use client'

import { ReactNode } from "react"
import React from "react"
import Link from "next/link"
import { MdHome } from "react-icons/md" 
import { usePathname } from "next/navigation"

interface IAuthLayoutProps {
    children : ReactNode
}

export default function AuthLayout({children}: IAuthLayoutProps) {
    const pathname = usePathname()

    return (
        <main className="h-full">
            <nav className="relative top-0 items-center justify-start p-5 w-full flex gap-3 text-sm font-semibold bg-white">
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
            <section>
                {children}
            </section>
        </main>
    )
} 