'use client'

import { FaRegCalendarAlt } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { IoSearchCircle } from "react-icons/io5";
import Image from "next/image";
import logo from "@/public/assets/images/logo.png"
import { Input } from "./ui/input";
import Link from "next/link";
import Sidebar from "./Sidebar";
import { useMutation } from "@tanstack/react-query";
import instance from "@/util/axiosInstance";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import authStore from "@/zustand/authStore";
import { useState } from "react";
import AlertDialogLogOut from "./AlertDialogLogOut";


const Header = () => {
  const token = authStore(state => state.token)
  const setLogOut = authStore(state => state.setLogOut)
  const role = authStore(state => state.role)
  const [logOutConfirmation, setLogOutConfirmation] = useState(false)
  
//nyimpen data diglobal state
  const {mutate: mutateSearch} = useMutation({
    mutationFn: async(values: string) => {
        await instance.get(`search?event=${''}&eo=${''}`)
    }
  })

  const debounce = useDebouncedCallback((values: string) => {
    mutateSearch(values)
  }, 2000)

  const pathName = usePathname()
  if( pathName === '/auth' || pathName === '/auth/register') {
    return (
      <></>
    )
  } else {
    return (
          <nav className="flex items-center justify-between bg-white px-5 py-2 border-b border-b-gray-300">
            <aside className="lg:hidden">
              <Sidebar />
            </aside>
            <section className="w-[40%] flex items-center gap-3">
              <Link href="/">
                <figure className=" text-3xl font-bold flex justify-center items-end w-[50px] h-[50px]">
                  <Image
                  width={300}
                  height={300}
                  src={logo}
                  alt="logo-spiral"
                  />
                </figure>
              </Link>
              <Input type="text" placeholder="Search" onChange={e => debounce(e.target.value)}/>
            </section>
            <section className="flex gap-2 justify-center items-center">
              {
                role === 'EO' && (
                <Link href='/event-organizer/member/events/create'>
                  <div className="flex gap-1 items-center py-2 px-5 text-sm font-semibold rounded-md hover:bg-gray-300 bg-white text-black">
                    <FaRegCalendarAlt />
                    <p>Create event</p>
                  </div>
                </Link>
                )
              }
              <Link href='/discover'>
              <div className="flex gap-1 items-center py-2 px-5 text-sm font-semibold rounded-md hover:bg-gray-300 bg-white text-black">
                <FaEarthAmericas/>
                <p>Explore</p>
              </div>
              </Link>
              {
                !token ? (
                  <section className="flex gap-2 items-center justify-center">
                    <Link href='/auth'>
                      <button className="py-2 px-5 text-sm font-semibold rounded-md hover:bg-gray-300 border border-gray-300 bg-white text-black">Sign in</button>
                    </Link>
                    <Link href='/auth/register'>
                      <button className="py-2 px-5 text-sm font-semibold rounded-md hover:bg-gray-300 border border-gray-300 bg-white text-black">Sign up</button>
                    </Link>
                  </section> 
                ) : (
                  <section className="flex gap-5 items-center justify-center">
                    <AlertDialogLogOut setLogOut={setLogOut} />
                    <Link href='member/profile/information'>
                      <figure className="bg-gray-200 border border-gray-300 rounded-full h-10 w-10">
                      </figure>
                    </Link>
                  </section> 

                )
              }
            </section>
          </nav>
    )
  }

};

export default Header
