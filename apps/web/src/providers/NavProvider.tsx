'use client'

import React, { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { usePathname } from 'next/navigation'

interface INavProviderProps {
    children: ReactNode
}

const NavProvider = ({children}: INavProviderProps) => {
    const pathname = usePathname()
    
    if(pathname === '/auth' || pathname === '/auth/register') {
        return (
            <main className='min-h-[screen]'>
                {children}
            </main>
        )
    }
    
    return (
    <main className='relative flex flex-col bg-white '>
        <header className='fixed top-0 w-full z-50'>
            <Header />
        </header>  
        <section className='z-0 p-5 pt-36'>
            {children}
        </section>
        <Footer />
    </main>
  )
}

export default NavProvider