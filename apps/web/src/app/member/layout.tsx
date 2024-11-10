import React, { ReactNode } from 'react'
interface IMemberPageLayoutProps {
  children: ReactNode
}


const MemberPageLayout = ({children}: IMemberPageLayoutProps) => {
  return (
    <main>
      <aside className='bg-white shadow-lg fixed top-0 w-[450px] h-screen'>
        
      </aside>
    </main>
  )
}

export default MemberPageLayout