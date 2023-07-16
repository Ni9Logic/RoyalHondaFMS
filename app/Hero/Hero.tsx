'use client'

import {useRouter} from 'next/navigation'
import React, {useState} from 'react'

export default function Hero() {
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);
    return (
        <section className="text-gray-600 body-font">
            <div className="container mx-auto flex justify-center px-5 py-24 md:flex-row flex-col items-center">
                <div
                    className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                        Banking Management System
                    </h1>
                    <p className="mb-8 leading-relaxed">A small management system in NextJS with MongoDB, Prisma, React
                        and React Libraries.
                        This system consists of a simple user menu where user can perform transactions and on the other
                        hand it consists of an admin dashboard menu where administrator can perform
                        all the CURD operations.</p>
                    <div className="flex justify-center">
                        <button onClick={() => {
                            setLoading(true);
                            router.push('/sign-in')
                            setLoading(false);
                        }}
                                className={`inline-flex text-white bg-indigo-500 ${isLoading ? 'opacity-25 cursor-not-allowed' : ''} border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg`}>
                            Login
                        </button>
                        <button onClick={() => {
                            setLoading(true);
                            router.push('/sign-up')
                            setLoading(false);
                        }}
                                className={`ml-4 inline-flex text-gray-700 bg-gray-100 ${isLoading ? 'opacity-25 cursor-not-allowed' : ''} border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg`}>
                            Register
                        </button>
                    </div>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="500" height="600"
                         viewBox="0 0 64 64">
                        <path fill="#85cbf8"
                              d="M61,17V51a2,2,0,0,1-2,2H5a2,2,0,0,1-2-2V17a2,2,0,0,1,2-2H59a2,2,0,0,1,2,2Z"></path>
                        <path fill="#96d7f9"
                              d="M33 52.9L16.5 52.9 46.5 15 60 15 61 17.53 33 52.9zM40.5 15L10.36 53 6.16 53 6.16 52.61 36 15 40.5 15zM31.5 15L3 50.99 3 49.1 30 15 31.5 15z"></path>
                        <rect width="8" height="6" x="15" y="27" fill="#f9dd8f" rx="2" ry="2"></rect>
                        <path fill="#8d6c9f"
                              d="M59,14H5a3,3,0,0,0-3,3V51a3,3,0,0,0,3,3H59a3,3,0,0,0,3-3V17A3,3,0,0,0,59,14Zm1,37a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V17a1,1,0,0,1,1-1H59a1,1,0,0,1,1,1Z"></path>
                        <path fill="#8d6c9f"
                              d="M11 40a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2zM22 41a1 1 0 0 0 1 1h6a1 1 0 0 0 0-2H23A1 1 0 0 0 22 41zM41 40H35a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2zM53 40H47a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2zM25 44H11a1 1 0 0 0 0 2H25a1 1 0 0 0 0-2zM36 30H52a1 1 0 0 0 0-2H36a1 1 0 0 0 0 2zM33 44H29a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2zM16 34h6a2 2 0 0 0 2-2V28a2 2 0 0 0-2-2H16a2 2 0 0 0-2 2v4A2 2 0 0 0 16 34zm0-6h6v4H16zM11 34a1 1 0 0 0 .83-1.55L10.2 30l1.63-2.45a1 1 0 0 0-1.66-1.11l-2 3a1 1 0 0 0 0 1.11l2 3A1 1 0 0 0 11 34z"></path>
                    </svg>
                </div>
            </div>
        </section>
    )
}
