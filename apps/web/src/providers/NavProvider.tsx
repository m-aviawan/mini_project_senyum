'use client'

import React, { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { usePathname } from 'next/navigation'
import logo from '@/public/assets/images/logo.png'
import Image from 'next/image'

interface INavProviderProps {
    children: ReactNode
}

const NavProvider = ({children}: INavProviderProps) => {
    const pathname = usePathname()
    
    if(pathname.includes('auth')) {
        return (
            <main>
                {children}
            </main>
        )
    }
    
    return (
    <main className='relative flex flex-col bg-white h-screen'>
        
        <figure className="fixed top-0 left-0 h-screen w-full overflow-hidden flex items-center justify-center">
            <Image
            src={logo}
            width={700}
            height={700}
            alt=''
            className='object-contain opacity-[0.05]'
            />
        </figure>
        <header className='fixed top-0 w-full z-50'>
            <Header />
        </header>  
        <section className='z-0 p-5 pt-20'>
            {children}
        </section>
        <Footer />
    </main>
  )
}

export default NavProvider