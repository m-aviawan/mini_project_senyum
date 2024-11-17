'use client'

import { ReactElement, ReactNode, useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import authStore from "@/zustand/authStore"
import instance from "@/util/axiosInstance"
import { usePathname } from "next/navigation"
import { AxiosResponse } from "axios"
import { useRouter } from "next/navigation"

interface IAuthProviderProps {
    children: ReactNode | ReactElement | React.JSX.Element
}

const AuthProvider = ({children}: IAuthProviderProps) => {
    const [syncronization, setSyncronization] = useState(true)
    const setKeepAuth = authStore(state => state.setKeepAuth)
    const role = authStore(state => state.role)
    const pathname = usePathname()
    const token = authStore(state => state.token)
    const router = useRouter()
    const { data: dataUser, isPending: isPendingUser, isError: isErrorUser } = useQuery({
        queryKey: ['getDataUser'],
        queryFn: async() => {
            let res: AxiosResponse = await instance.get('/auth')
            const auth = res.data.data
            console.log(auth)
            setKeepAuth({
                role: auth.role, 
                username: auth.username, 
                isVerified: auth.isVerified, 
                isGoogleRegistered: auth.isGoogleRegistered,
                profilePictureUrl: auth.profilePictureUrl
            })
            return auth
        }
    })
    setTimeout(() => {
        setSyncronization(false)
    }, 1000)
    
    // if(isPendingUser || !syncronization) {
        // if(isErrorUser && token && !pathname.includes('auth') && !(pathname === ('/'))) {
            //     return (
    //       <main>
    //         <section className='fixed top-0 gap-1 flex flex-col justify-center items-center h-screen w-full'>
    //           <h1 className='text-3xl font-bold'>Getting data failed!</h1>
    //           <p className='text-base font-light'>Please refresh page</p>
    //         </section>
    //       </main>
    //     )
    // }

    if(isPendingUser || syncronization ) {
        return (
          <main className='fixed top-0 flex flex-col gap-1 h-screen w-full items-center justify-center'>
            <span className="loading loading-bars loading-lg"></span>
          </main>
        )
    }
    if(pathname.includes('event-organizer') && 
    !pathname.includes('auth') && 
    role !== 'EO'
    || (!token && pathname.includes('member'))
) {
    router.push('/not-found')
}
return (
    <>
            { children }
        </>
    )
}

export default AuthProvider