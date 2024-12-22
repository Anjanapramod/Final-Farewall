'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface OptionProps {
    name: string
    link: string
}

export default function InnerHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname()

    // Mock user role (replace with actual role management logic)
    const user = {
        role: 'ADMIN', // Change to 'USER' to test user-specific options
    }

    const options: OptionProps[] = user.role === 'ADMIN'
        ? [
            { name: 'Home', link: '/dashboard/admin' },
            { name: 'Manage Funeral Parlors', link: '/dashboard/admin/manage-funeral-parlors' },
            { name: 'Manage Services', link: '/dashboard/admin/manage-services' },
            { name: 'Manage Assets', link: '/dashboard/admin/manage-assets' },
            { name: 'Bookings', link: '/dashboard/admin/bookings' },
        ]
        : [
            { name: 'Home', link: '/' },
            { name: 'Services', link: '/services' },
            { name: 'Funeral Parlors', link: '/funeral-parlors' },
            { name: 'Assets', link: '/assets' },
            { name: 'Bookings', link: '/bookings' },
        ]

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-gray-800 text-white">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-xl font-semibold">
                        Final Fareway
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex md:items-center md:space-x-6">
                        {options.map((option, index) => (
                            <Link
                                key={index}
                                href={option.link}
                                className={`text-sm transition-colors hover:text-gray-300 ${pathname === option.link ? 'text-white' : 'text-gray-400'
                                    }`}
                            >
                                {option.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        <span className="sr-only">Open main menu</span>
                        {/* Menu Icon */}
                        <svg
                            className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                        {/* Close Icon */}
                        <svg
                            className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}
                    id="mobile-menu"
                >
                    <div className="space-y-1 pb-3 pt-2">
                        {options.map((option, index) => (
                            <Link
                                key={index}
                                href={option.link}
                                className={`block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-gray-700 hover:text-white ${pathname === option.link
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-300'
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {option.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    )
}

