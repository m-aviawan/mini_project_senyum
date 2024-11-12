'use client'

import React from "react"
import { IoIosArrowDropright } from "react-icons/io";

const MemberProfileSettingPage = () => {

  return (
    <main className='flex flex-col gap-10'>
      <h1 className='border-b-2 border-b-gray-300 w-full py-1 text-[18px] font-semibold text-gray-600'>
        Settings
      </h1>
      <section>
        <div className="bg-gray-300 hover:bg-gray-100 hover:cursor-pointer text-black transition-[0.25s] hover:text-gray-600 rounded-md flex justify-between px-5 py-3 items-center text-[15px] ">
            <p className="font-semibold">Delete Account</p>
            <IoIosArrowDropright className="w-5 h-5" />
        </div>
      </section>
    </main>
  )
}

export default MemberProfileSettingPage