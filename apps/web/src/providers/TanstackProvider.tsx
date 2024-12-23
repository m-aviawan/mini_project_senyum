'use client'

import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";


interface ITanstackProviderProps {
    children: ReactNode
}

export default function TanstackProvider({children}: ITanstackProviderProps){
    
    const queryClient = new QueryClient()
    return(
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
    
}