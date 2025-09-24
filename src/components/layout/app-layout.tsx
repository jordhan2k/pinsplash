import React from 'react'
import { Header } from './header'
import { Footer } from './footer'

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-screen flex flex-col'>
      <Header />
      <div id="scroll-content" className="w-full flex-1 flex flex-col overflow-auto max-w-[1440px] mx-auto">
        <main className="w-full grow  mx-auto flex flex-col">{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export default AppLayout