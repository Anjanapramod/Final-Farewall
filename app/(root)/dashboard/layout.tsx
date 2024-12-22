"use client";
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import React from 'react'

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div
            className='flex flex-col h-screen'
        >
            <Header />
            <div className='flex-1 overflow-y-auto'>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout
