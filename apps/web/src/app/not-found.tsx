'use client'
import Link from 'next/link'

import React from 'react'

const NotFoundPage = () => {
  return (
    <main className='h-screen w-full flex flex-col gap-5 justify-center items-center'>
        <hgroup className='flex items-center gap-9 font-bold'>
            <h1 className='text-[120px]'>404 |</h1>
            <h1 className='text-[40px] w-min leading-[1.1em]'>Page not found</h1>
        </hgroup>
        <article className='text-sm'>
            <p>Please check your url address or click those menus for shortcut</p>
        </article>
        <section className='flex gap-2'>
            <Link href='/'>
                <div className='text-[15px] font-bold text-yellow-400 hover:text-yellow-200 hover:bg-gray-800 transition-[0.5s] text-center bg-black rounded-md px-5 py-3'>Home</div>
            </Link>
            <Link href='/discover'>
                <div className='text-[15px] font-bold text-black text-center hover:text-gray-800 transition-[0.5s] hover:bg-yellow-200 bg-yellow-400 rounded-md px-5 py-3'>Discover event</div>
            </Link>
        </section>
    </main>
  )
}

export default NotFoundPage