'use client'

import React from "react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
import Link from "next/link"
import { MdOutlineLogin } from "react-icons/md";
import { MdAccountBox } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";

const Sidebar = () => {

    const sidebarMenuList = [
        {
            title: 'Explore',
            href: '/discover',
            icon: <FaEarthAmericas/>
        },
        {
            title: 'Create Event',
            href: '#',
            icon: <FaRegCalendarAlt/>
        },
        {
            title: 'Sign In',
            href: '/auth',
            icon: <MdOutlineLogin/>
        },
        {
            title: 'Sign Up',
            href: '/auth/register',
            icon: <MdAccountBox/>
        },
    ]

    return (
        <NavigationMenu >
            <NavigationMenuList className="bg-white">
                <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:bg-white active:bg-gray-500 bg-white">Menu</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul className="flex flex-col w-[300px] text-sm">
                        {
                            sidebarMenuList.map((item, index) => {
                                return (
                                    <li key={index} className="px-5 py-3 hover:bg-gray-300">
                                        <NavigationMenuLink>
                                            <Link href={item.href}>
                                            <div className="flex gap-3 items-center">
                                            {item.icon}
                                            {item.title}
                                            </div>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default Sidebar