'use client'

import { FaRegCalendarAlt } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
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
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Header = () => {
  const token = authStore(state => state.token)
  const setLogOut = authStore(state => state.setLogOut)
  const role = authStore(state => state.role)
  const imageUrl: string = authStore(state => state.profilePictureUrl)
  const [logOutConfirmation, setLogOutConfirmation] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
//nyimpen data diglobal state
  const {mutate: mutateSearch} = useMutation({
    mutationFn: async(values: string) => {
        const res = await instance.get(`search?event=${''}&eo=${''}`)
        return res
    }
  })

  const debounce = useDebouncedCallback((values: string) => {
    router.push(`/discover?search=${values}`)
    mutateSearch(values)
  }, 1500)

  if( pathname === '/auth' || pathname === '/auth/register') {
    return (
      <></>
    )
  } else {
    return (
          <nav className="flex items-center justify-between bg-white px-5 py-2 border-b border-b-gray-300">
            <aside className="lg:hidden">
              <Sidebar debounce={debounce}/>
            </aside>
            <section className="w-[40%] lg:flex items-center gap-3 hidden">
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
              <Link href='/discover'>
              <div className="hidden lg:flex gap-1 items-center py-2 px-5 text-sm font-semibold rounded-md hover:bg-gray-300 bg-white text-black">
                <FaEarthAmericas/>
                <p>Explore</p>
              </div>
              </Link>
              {
                !token ? (
                  <section className="hidden lg:flex gap-2 items-center justify-center">
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
                    <Link href={
                      role === 'CUSTOMER' ? '/member/profile/information' : '/event-organizer/member/profile/information'
                      }>
                      <figure className="bg-gray-200 border border-gray-300 rounded-full h-10 w-10 overflow-hidden">
                      {
                        imageUrl.length > 0 && (
                          <Image
                            width={300}
                            height={300}
                            src={imageUrl}
                            alt="img-profile"
                            className="object-cover h-full w-full"
                            />
                        )
                      }
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
