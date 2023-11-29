'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Hero() {
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);

    return (
        <section className="text-gray-600 body-font">
            <div className="container mx-auto flex justify-center px-5 py-24 md:flex-row flex-col items-center">
                <div
                    className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                        Study Tracker
                    </h1>
                    <p className="mb-8 leading-relaxed">
                        A Small Project, here you can keep track of your grades, subject weightage and much more.
                    </p>
                    <div className="flex justify-center">
                        <button onClick={() => {
                            setLoading(true);
                            router.push('/sign-in')
                        }}
                            className={`inline-flex text-white bg-indigo-500 ${isLoading ? 'opacity-25 cursor-not-allowed' : ''} border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg`}>
                            Login
                        </button>
                        <button onClick={() => {
                            setLoading(true);
                            router.push('/sign-up')
                        }}
                            className={`ml-4 inline-flex text-gray-700 bg-gray-100 ${isLoading ? 'opacity-25 cursor-not-allowed' : ''} border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg`}>
                            Register
                        </button>
                    </div>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="500" height="600" viewBox="0 0 48 48">
                        <path fill="#50e6ff" d="M39,16v25c0,1.105-0.895,2-2,2H11c-1.105,0-2-0.895-2-2V7c0-1.105,0.895-2,2-2h17L39,16z"></path><linearGradient id="_rnrzRmyCORmBgGe4G1aPa_aeo6Jl3iRPTl_gr1" x1="28.529" x2="33.6" y1="-2829.362" y2="-2824.29" gradientTransform="matrix(1 0 0 -1 0 -2813.89)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#3079d6"></stop><stop offset="1" stop-color="#297cd2"></stop></linearGradient><path fill="url(#_rnrzRmyCORmBgGe4G1aPa_aeo6Jl3iRPTl_gr1)" d="M28,5v9c0,1.105,0.895,2,2,2h9L28,5z"></path><path fill="#e52030" d="M25.391,31h-3.083l-0.893-2.794h-4.466L16.065,31H13l4.571-12.558h3.354L25.391,31z M20.768,26.035 l-1.349-4.221c-0.099-0.315-0.169-0.692-0.21-1.13h-0.07c-0.029,0.368-0.102,0.733-0.219,1.095l-1.366,4.256H20.768z"></path><path fill="#e52030" d="M35,26.753h-3.372v3.372H29.86v-3.372h-3.389v-1.778h3.389v-3.389h1.769v3.389H35V26.753z"></path>
                    </svg>
                </div>
            </div>
        </section>
    )
}
