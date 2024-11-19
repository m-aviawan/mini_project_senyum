'use client'

import React, { ReactNode, useState } from 'react'
import { MdOutlineEventNote } from "react-icons/md";
import { MdHomeFilled } from "react-icons/md";
import { MdContacts } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import { MdApps } from "react-icons/md";
import { IoCloseSharp } from 'react-icons/io5';
import Link from 'next/link'
import authStore from '@/zustand/authStore';
import { useRouter } from 'next/navigation';

interface IMemberPageLayoutProps {
  children: ReactNode
}


const MemberPageLayout = ({children}: IMemberPageLayoutProps) => {
  const [ isMenuActive, setIsMenuActive ] = useState(false)
  const role = authStore(state => state.role)
  const router = useRouter()
  const dashboardMenuListForCust = [
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

  const myAccountMenuListForCust = [
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

  const activateNav = () => {
    setIsMenuActive(!isMenuActive)
  }
  if(role !== "CUSTOMER") router.push('/')
  return (
    <main>
      <button onClick={() => activateNav()} className='xl:hidden z-50 fixed top-12 md:top-16 p-2 left-0 bg-white border-b border-b-gray-300 text-sm w-full hover:bg-gray-300'>
        Navigation
      </button>
      {
        isMenuActive && (
            <nav className='xl:hidden bg-white border border-b-gray-300 z-50 fixed top-12 lg:top-16 w-full left-0'>
              <ul className='flex flex-col gap-1'>
                {
                  dashboardMenuListForCust.map((item, index) => {
                    return (
                              <Link key={index} href={item.href} onClick={() => setIsMenuActive(false)}>
                                <li className='text-sm font-semibold p-3 flex gap-8 transition-[0.25s] items-center hover:underline'>{item.icon}{item.title}</li>
                              </Link>
                            )
                          })
                        }
                        {
                          myAccountMenuListForCust.map((item, index) => {
                            return (
                              <Link key={index} href={item.href} onClick={() => setIsMenuActive(false)}>
                                <li className='text-sm font-semibold p-3 flex gap-8 transition-[0.25s] items-center hover:underline'>{item.icon}{item.title}</li>
                              </Link>
                            )
                          })
                        }
                      <li onClick={() => activateNav()} className='text-sm font-semibold p-3 flex gap-8 transition-[0.25s] items-center hover:underline hover:cursor-pointer'>
                        <IoCloseSharp className="text-black h-4 w-4"/>
                        Close Navigation
                      </li>
                    </ul>
            </nav>
        )
      }
      <aside className='hidden xl:flex flex-col bg-white shadow-lg fixed top-0 left-0 w-[300px] h-screen pt-20'>
        <section className='flex flex-col border-b border-b-gray-300'>
          <h1 className='text-xs font-bold p-3'>Dashboard</h1>
            {
              dashboardMenuListForCust.map((item, index) => {
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
              myAccountMenuListForCust.map((item, index) => {
                return (
                  <Link key={index} href={item.href}>
                    <div className='text-sm font-semibold p-3 flex gap-8 transition-[0.25s] items-center hover:bg-yellow-400'>{item.icon}{item.title}</div>
                  </Link>
                )
              })
            }
        </section>
      </aside>
      <section className='pt-4 md:pt-8 xl:pt-4 xl:pl-[300px]'>
        {children}
      </section>
    </main>
  )
}

export default MemberPageLayout