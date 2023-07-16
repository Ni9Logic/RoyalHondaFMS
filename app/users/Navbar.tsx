'use client'
import {signOut} from 'next-auth/react'
import React from 'react'
import {toast} from 'react-hot-toast';

export default function Navbar() {
    return (
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a href='/' className="flex items-center cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="60" height="60"
                         viewBox="0 0 100 100">
                        <path fill="#a3a3cd"
                              d="M89,29v42c0,3.3-2.7,6-6,6H17c-3.3,0-6-2.7-6-6V29c0-3.3,2.7-6,6-6h66C86.3,23,89,25.7,89,29z"></path>
                        <path fill="#f9e65c"
                              d="M34.5,31h-12c-1.4,0-2.5,1.1-2.5,2.5v12c0,1.4,1.1,2.5,2.5,2.5h12c1.4,0,2.5-1.1,2.5-2.5v-12 C37,32.1,35.9,31,34.5,31z"></path>
                        <path fill="#fcba7f"
                              d="M30.5,53h-10c-0.3,0-0.5,0.2-0.5,0.5v5c0,0.3,0.2,0.5,0.5,0.5h10c0.3,0,0.5-0.2,0.5-0.5v-5 C31,53.2,30.8,53,30.5,53z"></path>
                        <path fill="#fcba7f"
                              d="M46.5,53h-10c-0.3,0-0.5,0.2-0.5,0.5v5c0,0.3,0.2,0.5,0.5,0.5h10c0.3,0,0.5-0.2,0.5-0.5v-5 C47,53.2,46.8,53,46.5,53z"></path>
                        <path fill="#fcba7f"
                              d="M62.5,53h-10c-0.3,0-0.5,0.2-0.5,0.5v5c0,0.3,0.2,0.5,0.5,0.5h10c0.3,0,0.5-0.2,0.5-0.5v-5 C63,53.2,62.8,53,62.5,53z"></path>
                        <path fill="#fcba7f"
                              d="M78.5,53h-10c-0.3,0-0.5,0.2-0.5,0.5v5c0,0.3,0.2,0.5,0.5,0.5h10c0.3,0,0.5-0.2,0.5-0.5v-5 C79,53.2,78.8,53,78.5,53z"></path>
                        <path fill="#fefdef"
                              d="M51.5,63h3c0.3,0,0.5,0.2,0.5,0.5v5c0,0.3-0.2,0.5-0.5,0.5h-34c-0.3,0-0.5-0.2-0.5-0.5v-5 c0-0.3,0.2-0.5,0.5-0.5h17H51.5z"></path>
                        <path fill="#fefdef"
                              d="M79.5,38h-34c-0.3,0-0.5-0.2-0.5-0.5v-6c0-0.3,0.2-0.5,0.5-0.5h34c0.3,0,0.5,0.2,0.5,0.5v6 C80,37.8,79.8,38,79.5,38z"></path>
                        <g>
                            <path fill="none" stroke="#1f212b" strokeMiterlimit="10" strokeWidth="2"
                                  d="M89,29v42c0,3.3-2.7,6-6,6H17c-3.3,0-6-2.7-6-6V29c0-3.3,2.7-6,6-6h66C86.3,23,89,25.7,89,29z"></path>
                            <path fill="none" stroke="#1f212b" strokeMiterlimit="10"
                                  d="M89,29v42c0,3.3-2.7,6-6,6H17c-3.3,0-6-2.7-6-6V29c0-3.3,2.7-6,6-6h66C86.3,23,89,25.7,89,29z"></path>
                            <path fill="none" stroke="#1f212b" strokeLinecap="round" strokeLinejoin="round"
                                  strokeMiterlimit="10"
                                  d="M31.5,26.5h51c1.6,0,3,1.3,3,2.9v41.1c0,1.6-1.3,2.9-3,2.9H17.5c-1.6,0-3-1.3-3-2.9V29.4c0-1.6,1.3-2.9,3-2.9 h1"></path>
                            <line x1="24.5" x2="28.5" y1="26.5" y2="26.5" fill="none" stroke="#1f212b"
                                  strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></line>
                            <line x1="20.6" x2="21.5" y1="26.5" y2="26.5" fill="none" stroke="#1f212b"
                                  strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></line>
                            <path fill="#1f212b"
                                  d="M34.5,31h-12c-1.4,0-2.5,1.1-2.5,2.5v12c0,1.4,1.1,2.5,2.5,2.5h12c1.4,0,2.5-1.1,2.5-2.5v-12 C37,32.1,35.9,31,34.5,31z M36,45.5c0,0.8-0.7,1.5-1.5,1.5h-12c-0.8,0-1.5-0.7-1.5-1.5v-12c0-0.8,0.7-1.5,1.5-1.5h12 c0.8,0,1.5,0.7,1.5,1.5V45.5z"></path>
                            <path fill="#1f212b"
                                  d="M30.5,53h-10c-0.3,0-0.5,0.2-0.5,0.5v5c0,0.3,0.2,0.5,0.5,0.5h10c0.3,0,0.5-0.2,0.5-0.5v-5 C31,53.2,30.8,53,30.5,53z M30,58h-9v-4h9V58z"></path>
                            <path fill="#1f212b"
                                  d="M75.5,59h-7c-0.3,0-0.5-0.2-0.5-0.5v-5c0-0.3,0.2-0.5,0.5-0.5h10c0.3,0,0.5,0.2,0.5,0.5v3 c0,0.3-0.2,0.5-0.5,0.5S78,56.8,78,56.5V54h-9v4h6.5c0.3,0,0.5,0.2,0.5,0.5S75.8,59,75.5,59z"></path>
                            <path fill="#1f212b"
                                  d="M79.5,38h-19c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5H79v-5H46v5h5.5c0.3,0,0.5,0.2,0.5,0.5S51.8,38,51.5,38 h-6c-0.3,0-0.5-0.2-0.5-0.5v-6c0-0.3,0.2-0.5,0.5-0.5h34c0.3,0,0.5,0.2,0.5,0.5v6C80,37.8,79.8,38,79.5,38z"></path>
                            <path fill="#1f212b"
                                  d="M49.5,64h-2c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5h2c0.3,0,0.5,0.2,0.5,0.5S49.8,64,49.5,64z"></path>
                            <path fill="#1f212b"
                                  d="M44.5,64h-4c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5h4c0.3,0,0.5,0.2,0.5,0.5S44.8,64,44.5,64z"></path>
                            <path fill="#1f212b"
                                  d="M54.5,69h-34c-0.3,0-0.5-0.2-0.5-0.5v-5c0-0.3,0.2-0.5,0.5-0.5h17c0.3,0,0.5,0.2,0.5,0.5S37.8,64,37.5,64 H21v4h33v-4h-2.5c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5h3c0.3,0,0.5,0.2,0.5,0.5v5C55,68.8,54.8,69,54.5,69z"></path>
                            <path fill="#1f212b"
                                  d="M46.5,59h-10c-0.3,0-0.5-0.2-0.5-0.5v-5c0-0.3,0.2-0.5,0.5-0.5h2c0.3,0,0.5,0.2,0.5,0.5S38.8,54,38.5,54H37 v4h9v-4h-4.5c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5h5c0.3,0,0.5,0.2,0.5,0.5v5C47,58.8,46.8,59,46.5,59z"></path>
                            <path fill="#1f212b"
                                  d="M62.5,53h-10c-0.3,0-0.5,0.2-0.5,0.5v5c0,0.3,0.2,0.5,0.5,0.5h10c0.3,0,0.5-0.2,0.5-0.5v-5 C63,53.2,62.8,53,62.5,53z M62,58h-9v-4h9V58z"></path>
                        </g>
                    </svg>
                    <span className="mx-10 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Banking Management System</span>
                </a>
                <button
                    className="flex flex-row ml-auto items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                    onClick={() => {
                        toast.error('Logged Out!');
                        setTimeout(function () {
                            console.log('Logging out');
                        }, 1500);
                        signOut();
                    }}>
                    Log out
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                         className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        </header>

    )
}
