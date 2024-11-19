'use client'

import React from 'react'
import { CiCreditCard1 } from "react-icons/ci";


const MemberProfileBankAccountsPage = () => {
  return (
    <main className='flex flex-col gap-10'>
        <h1 className='border-b-2 border-b-gray-300 w-full py-1 text-[18px] font-semibold text-gray-600'>
            Bank Accounts
        </h1>
        <section className='flex flex-col gap-5 items-center text-sm'>
            <CiCreditCard1 className='h-[140px] w-[140px]'/>
            <p className='text-gray-600'>Please enter your account first to be able to process the withdrawal of sales.</p>
            <button className='rounded-md hover:bg-blue-400 bg-blue-600 text-white px-5 py-3'>Add Account</button>
        </section>
    </main>
  )
}

export default MemberProfileBankAccountsPage
