'use client'

import React from 'react'
import { useRouter } from "next/navigation";


export const Navbar = () => {
    const router = useRouter();
    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="#" className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="60" height="60" viewBox="0 0 100 100">
                            <path fill="#a3a3cd" d="M89,29v42c0,3.3-2.7,6-6,6H17c-3.3,0-6-2.7-6-6V29c0-3.3,2.7-6,6-6h66C86.3,23,89,25.7,89,29z"></path><path fill="#f9e65c" d="M34.5,31h-12c-1.4,0-2.5,1.1-2.5,2.5v12c0,1.4,1.1,2.5,2.5,2.5h12c1.4,0,2.5-1.1,2.5-2.5v-12 C37,32.1,35.9,31,34.5,31z"></path><path fill="#fcba7f" d="M30.5,53h-10c-0.3,0-0.5,0.2-0.5,0.5v5c0,0.3,0.2,0.5,0.5,0.5h10c0.3,0,0.5-0.2,0.5-0.5v-5 C31,53.2,30.8,53,30.5,53z"></path><path fill="#fcba7f" d="M46.5,53h-10c-0.3,0-0.5,0.2-0.5,0.5v5c0,0.3,0.2,0.5,0.5,0.5h10c0.3,0,0.5-0.2,0.5-0.5v-5 C47,53.2,46.8,53,46.5,53z"></path><path fill="#fcba7f" d="M62.5,53h-10c-0.3,0-0.5,0.2-0.5,0.5v5c0,0.3,0.2,0.5,0.5,0.5h10c0.3,0,0.5-0.2,0.5-0.5v-5 C63,53.2,62.8,53,62.5,53z"></path><path fill="#fcba7f" d="M78.5,53h-10c-0.3,0-0.5,0.2-0.5,0.5v5c0,0.3,0.2,0.5,0.5,0.5h10c0.3,0,0.5-0.2,0.5-0.5v-5 C79,53.2,78.8,53,78.5,53z"></path><path fill="#fefdef" d="M51.5,63h3c0.3,0,0.5,0.2,0.5,0.5v5c0,0.3-0.2,0.5-0.5,0.5h-34c-0.3,0-0.5-0.2-0.5-0.5v-5 c0-0.3,0.2-0.5,0.5-0.5h17H51.5z"></path><path fill="#fefdef" d="M79.5,38h-34c-0.3,0-0.5-0.2-0.5-0.5v-6c0-0.3,0.2-0.5,0.5-0.5h34c0.3,0,0.5,0.2,0.5,0.5v6 C80,37.8,79.8,38,79.5,38z"></path><g><path fill="none" stroke="#1f212b" strokeMiterlimit="10" strokeWidth="2" d="M89,29v42c0,3.3-2.7,6-6,6H17c-3.3,0-6-2.7-6-6V29c0-3.3,2.7-6,6-6h66C86.3,23,89,25.7,89,29z"></path><path fill="none" stroke="#1f212b" strokeMiterlimit="10" d="M89,29v42c0,3.3-2.7,6-6,6H17c-3.3,0-6-2.7-6-6V29c0-3.3,2.7-6,6-6h66C86.3,23,89,25.7,89,29z"></path><path fill="none" stroke="#1f212b" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M31.5,26.5h51c1.6,0,3,1.3,3,2.9v41.1c0,1.6-1.3,2.9-3,2.9H17.5c-1.6,0-3-1.3-3-2.9V29.4c0-1.6,1.3-2.9,3-2.9 h1"></path><line x1="24.5" x2="28.5" y1="26.5" y2="26.5" fill="none" stroke="#1f212b" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></line><line x1="20.6" x2="21.5" y1="26.5" y2="26.5" fill="none" stroke="#1f212b" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></line><path fill="#1f212b" d="M34.5,31h-12c-1.4,0-2.5,1.1-2.5,2.5v12c0,1.4,1.1,2.5,2.5,2.5h12c1.4,0,2.5-1.1,2.5-2.5v-12 C37,32.1,35.9,31,34.5,31z M36,45.5c0,0.8-0.7,1.5-1.5,1.5h-12c-0.8,0-1.5-0.7-1.5-1.5v-12c0-0.8,0.7-1.5,1.5-1.5h12 c0.8,0,1.5,0.7,1.5,1.5V45.5z"></path><path fill="#1f212b" d="M30.5,53h-10c-0.3,0-0.5,0.2-0.5,0.5v5c0,0.3,0.2,0.5,0.5,0.5h10c0.3,0,0.5-0.2,0.5-0.5v-5 C31,53.2,30.8,53,30.5,53z M30,58h-9v-4h9V58z"></path><path fill="#1f212b" d="M75.5,59h-7c-0.3,0-0.5-0.2-0.5-0.5v-5c0-0.3,0.2-0.5,0.5-0.5h10c0.3,0,0.5,0.2,0.5,0.5v3 c0,0.3-0.2,0.5-0.5,0.5S78,56.8,78,56.5V54h-9v4h6.5c0.3,0,0.5,0.2,0.5,0.5S75.8,59,75.5,59z"></path><path fill="#1f212b" d="M79.5,38h-19c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5H79v-5H46v5h5.5c0.3,0,0.5,0.2,0.5,0.5S51.8,38,51.5,38 h-6c-0.3,0-0.5-0.2-0.5-0.5v-6c0-0.3,0.2-0.5,0.5-0.5h34c0.3,0,0.5,0.2,0.5,0.5v6C80,37.8,79.8,38,79.5,38z"></path><path fill="#1f212b" d="M49.5,64h-2c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5h2c0.3,0,0.5,0.2,0.5,0.5S49.8,64,49.5,64z"></path><path fill="#1f212b" d="M44.5,64h-4c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5h4c0.3,0,0.5,0.2,0.5,0.5S44.8,64,44.5,64z"></path><path fill="#1f212b" d="M54.5,69h-34c-0.3,0-0.5-0.2-0.5-0.5v-5c0-0.3,0.2-0.5,0.5-0.5h17c0.3,0,0.5,0.2,0.5,0.5S37.8,64,37.5,64 H21v4h33v-4h-2.5c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5h3c0.3,0,0.5,0.2,0.5,0.5v5C55,68.8,54.8,69,54.5,69z"></path><path fill="#1f212b" d="M46.5,59h-10c-0.3,0-0.5-0.2-0.5-0.5v-5c0-0.3,0.2-0.5,0.5-0.5h2c0.3,0,0.5,0.2,0.5,0.5S38.8,54,38.5,54H37 v4h9v-4h-4.5c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5h5c0.3,0,0.5,0.2,0.5,0.5v5C47,58.8,46.8,59,46.5,59z"></path><path fill="#1f212b" d="M62.5,53h-10c-0.3,0-0.5,0.2-0.5,0.5v5c0,0.3,0.2,0.5,0.5,0.5h10c0.3,0,0.5-0.2,0.5-0.5v-5 C63,53.2,62.8,53,62.5,53z M62,58h-9v-4h9V58z"></path></g>
                        </svg>
                        <span className="mx-10 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Banking Management System</span>
                    </a>
                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <a onClick={() => router.push('/')} className="block py-2 pl-3 pr-4 text-gray-900 hover:cursor-pointer rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</a>
                            </li>
                            <li>
                                <a onClick={() => router.push('/sign-in')} className="block py-2 pl-3 pr-4 text-gray-900 hover:cursor-pointer rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</a>
                            </li>
                            <li>
                                <a onClick={() => router.push('/sign-up')} className="block py-2 pl-3 pr-4 text-gray-900 hover:cursor-pointer rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}
