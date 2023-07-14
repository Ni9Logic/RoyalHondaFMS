'use client'
import React from 'react'

export default function Footer() {
    return (
        <footer className="text-gray-600 body-font align-bottom">
            <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
            <a className="flex items-center cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="60" height="60" viewBox="0 0 100 100">
                        <path fill="#a3a3cd" d="M89,29v42c0,3.3-2.7,6-6,6H17c-3.3,0-6-2.7-6-6V29c0-3.3,2.7-6,6-6h66C86.3,23,89,25.7,89,29z"></path><path fill="#f9e65c" d="M34.5,31h-12c-1.4,0-2.5,1.1-2.5,2.5v12c0,1.4,1.1,2.5,2.5,2.5h12c1.4,0,2.5-1.1,2.5-2.5v-12 C37,32.1,35.9,31,34.5,31z"></path><path fill="#fcba7f" d="M30.5,53h-10c-0.3,0-0.5,0.2-0.5,0.5v5c0,0.3,0.2,0.5,0.5,0.5h10c0.3,0,0.5-0.2,0.5-0.5v-5 C31,53.2,30.8,53,30.5,53z"></path><path fill="#fcba7f" d="M46.5,53h-10c-0.3,0-0.5,0.2-0.5,0.5v5c0,0.3,0.2,0.5,0.5,0.5h10c0.3,0,0.5-0.2,0.5-0.5v-5 C47,53.2,46.8,53,46.5,53z"></path><path fill="#fcba7f" d="M62.5,53h-10c-0.3,0-0.5,0.2-0.5,0.5v5c0,0.3,0.2,0.5,0.5,0.5h10c0.3,0,0.5-0.2,0.5-0.5v-5 C63,53.2,62.8,53,62.5,53z"></path><path fill="#fcba7f" d="M78.5,53h-10c-0.3,0-0.5,0.2-0.5,0.5v5c0,0.3,0.2,0.5,0.5,0.5h10c0.3,0,0.5-0.2,0.5-0.5v-5 C79,53.2,78.8,53,78.5,53z"></path><path fill="#fefdef" d="M51.5,63h3c0.3,0,0.5,0.2,0.5,0.5v5c0,0.3-0.2,0.5-0.5,0.5h-34c-0.3,0-0.5-0.2-0.5-0.5v-5 c0-0.3,0.2-0.5,0.5-0.5h17H51.5z"></path><path fill="#fefdef" d="M79.5,38h-34c-0.3,0-0.5-0.2-0.5-0.5v-6c0-0.3,0.2-0.5,0.5-0.5h34c0.3,0,0.5,0.2,0.5,0.5v6 C80,37.8,79.8,38,79.5,38z"></path><g><path fill="none" stroke="#1f212b" strokeMiterlimit="10" strokeWidth="2" d="M89,29v42c0,3.3-2.7,6-6,6H17c-3.3,0-6-2.7-6-6V29c0-3.3,2.7-6,6-6h66C86.3,23,89,25.7,89,29z"></path><path fill="none" stroke="#1f212b" strokeMiterlimit="10" d="M89,29v42c0,3.3-2.7,6-6,6H17c-3.3,0-6-2.7-6-6V29c0-3.3,2.7-6,6-6h66C86.3,23,89,25.7,89,29z"></path><path fill="none" stroke="#1f212b" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M31.5,26.5h51c1.6,0,3,1.3,3,2.9v41.1c0,1.6-1.3,2.9-3,2.9H17.5c-1.6,0-3-1.3-3-2.9V29.4c0-1.6,1.3-2.9,3-2.9 h1"></path><line x1="24.5" x2="28.5" y1="26.5" y2="26.5" fill="none" stroke="#1f212b" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></line><line x1="20.6" x2="21.5" y1="26.5" y2="26.5" fill="none" stroke="#1f212b" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></line><path fill="#1f212b" d="M34.5,31h-12c-1.4,0-2.5,1.1-2.5,2.5v12c0,1.4,1.1,2.5,2.5,2.5h12c1.4,0,2.5-1.1,2.5-2.5v-12 C37,32.1,35.9,31,34.5,31z M36,45.5c0,0.8-0.7,1.5-1.5,1.5h-12c-0.8,0-1.5-0.7-1.5-1.5v-12c0-0.8,0.7-1.5,1.5-1.5h12 c0.8,0,1.5,0.7,1.5,1.5V45.5z"></path><path fill="#1f212b" d="M30.5,53h-10c-0.3,0-0.5,0.2-0.5,0.5v5c0,0.3,0.2,0.5,0.5,0.5h10c0.3,0,0.5-0.2,0.5-0.5v-5 C31,53.2,30.8,53,30.5,53z M30,58h-9v-4h9V58z"></path><path fill="#1f212b" d="M75.5,59h-7c-0.3,0-0.5-0.2-0.5-0.5v-5c0-0.3,0.2-0.5,0.5-0.5h10c0.3,0,0.5,0.2,0.5,0.5v3 c0,0.3-0.2,0.5-0.5,0.5S78,56.8,78,56.5V54h-9v4h6.5c0.3,0,0.5,0.2,0.5,0.5S75.8,59,75.5,59z"></path><path fill="#1f212b" d="M79.5,38h-19c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5H79v-5H46v5h5.5c0.3,0,0.5,0.2,0.5,0.5S51.8,38,51.5,38 h-6c-0.3,0-0.5-0.2-0.5-0.5v-6c0-0.3,0.2-0.5,0.5-0.5h34c0.3,0,0.5,0.2,0.5,0.5v6C80,37.8,79.8,38,79.5,38z"></path><path fill="#1f212b" d="M49.5,64h-2c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5h2c0.3,0,0.5,0.2,0.5,0.5S49.8,64,49.5,64z"></path><path fill="#1f212b" d="M44.5,64h-4c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5h4c0.3,0,0.5,0.2,0.5,0.5S44.8,64,44.5,64z"></path><path fill="#1f212b" d="M54.5,69h-34c-0.3,0-0.5-0.2-0.5-0.5v-5c0-0.3,0.2-0.5,0.5-0.5h17c0.3,0,0.5,0.2,0.5,0.5S37.8,64,37.5,64 H21v4h33v-4h-2.5c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5h3c0.3,0,0.5,0.2,0.5,0.5v5C55,68.8,54.8,69,54.5,69z"></path><path fill="#1f212b" d="M46.5,59h-10c-0.3,0-0.5-0.2-0.5-0.5v-5c0-0.3,0.2-0.5,0.5-0.5h2c0.3,0,0.5,0.2,0.5,0.5S38.8,54,38.5,54H37 v4h9v-4h-4.5c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5h5c0.3,0,0.5,0.2,0.5,0.5v5C47,58.8,46.8,59,46.5,59z"></path><path fill="#1f212b" d="M62.5,53h-10c-0.3,0-0.5,0.2-0.5,0.5v5c0,0.3,0.2,0.5,0.5,0.5h10c0.3,0,0.5-0.2,0.5-0.5v-5 C63,53.2,62.8,53,62.5,53z M62,58h-9v-4h9V58z"></path></g>
                    </svg>
                </a>
                <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2023 BMS —
                    <a href="https://twitter.com/knyttneve" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">@devHassan</a>
                </p>
                <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                    <a className="text-gray-500">
                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                        </svg>
                    </a>
                    <a className="ml-3 text-gray-500">
                        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                        </svg>
                    </a>
                    <a className="ml-3 text-gray-500">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                        </svg>
                    </a>
                    <a className="ml-3 text-gray-500">
                        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                            <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                            <circle cx="4" cy="4" r="2" stroke="none"></circle>
                        </svg>
                    </a>
                </span>
            </div>
        </footer>
    )
}
