'use client'

import React, { ReactNode } from 'react'
import { MdOutlineEventNote } from "react-icons/md";
import { MdHomeFilled } from "react-icons/md";
import { MdContacts } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import { MdApps } from "react-icons/md";
import Link from 'next/link'

interface IMemberPageLayoutProps {
  children: ReactNode
}


const MemberPageLayout = ({children}: IMemberPageLayoutProps) => {
  const dashboardMenuListForEO = [
    {
      title: 'Explore',
      icon: <MdHomeFilled className="text-black h-4 w-4"/>,
      href: '/discover'
    },
    {
      title: 'My Tickets',
      icon: <IoTicketOutline className="text-black h-4 w-4"/>,
      href: '/member/profile/my-tickets'
    },
  ]

  const myAccountMenuListForEO = [
    {
      title: 'Information',
      icon: <MdContacts className="text-black h-4 w-4"/>,
      href: '/member/profile/information'
    },
    {
      title: 'Settings',
      icon: <MdOutlineSettings className="text-black h-4 w-4"/>,
      href: '/member/profile/settings'
    }
  ]

  return (
    <main>
      <aside className='bg-white shadow-lg fixed top-0 left-0 w-[300px] h-screen pt-20 p-'>
        <section className='flex flex-col border-b border-b-gray-300'>
          <h1 className='text-xs font-bold p-3'>Dashboard</h1>
            {
              dashboardMenuListForEO.map((item, index) => {
                return (
                  <Link key={index} href={item.href}>
                    <div className='text-sm font-semibold p-3 flex gap-8 transition-[0.25s] items-center hover:bg-yellow-400'>{item.icon}{item.title}</div>
                  </Link>
                )
              })
            }
        </section>
        <section className='flex flex-col border-b border-b-gray-300'>
          <h1 className='text-xs font-bold p-3'>My Account</h1>
            {
              myAccountMenuListForEO.map((item, index) => {
                return (
                  <Link key={index} href={item.href}>
                    <div className='text-sm font-semibold p-3 flex gap-8 transition-[0.25s] items-center hover:bg-yellow-400'>{item.icon}{item.title}</div>
                  </Link>
                )
              })
            }
        </section>
      </aside>
      <section className='pl-[300px]'>
        {children}
      </section>
    </main>
  )
}

export default MemberPageLayout