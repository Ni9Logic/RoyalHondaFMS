'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import logo from "@/app/components/images/logo.png";

export default function Hero() {
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);

    return (
        <section className="text-gray-600 body-font">
            <div className="container mx-auto flex justify-center px-5 py-24 md:flex-row flex-col items-center">
                <div
                    className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 flex gap-2">
                        <p className='text-red-500'>Royal</p> <p>Honda</p>

                    </h1>
                    <p>
                        Easy to track invoices, login by clicking the button below.
                    </p>
                    <div className="flex justify-center pt-3">
                        <button onClick={() => {
                            setLoading(true);
                            router.push('/sign-in')
                        }}
                            className={`inline-flex text-white bg-[#78c3fc] ${isLoading ? 'opacity-25 cursor-not-allowed' : ''} border-0 py-2 px-6 focus:outline-none hover:bg-[#78c3fc] rounded text-lg`}>
                            Login
                        </button>
                    </div>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="300" height="700" viewBox="0 0 48 48">
                        <path fill="#37474F" d="M24,8c-3.985,0.002-7.876,0.144-11.824,0.664c-2.097,0.276-4.352,0.707-5.914,2.243c-1.713,1.686-2.054,4.171-2.192,6.45c-0.16,2.641-0.022,5.273,0.143,7.908c0.167,2.595,0.463,5.215,1.106,7.74c0.298,1.171,0.701,2.347,1.391,3.355c0.663,0.967,1.618,1.652,2.688,2.134c2.271,1.023,4.894,1.111,7.348,1.261C19.152,39.899,21.575,39.988,24,40c2.424-0.012,4.848-0.101,7.255-0.246c2.454-0.151,5.075-0.238,7.348-1.261c1.07-0.479,2.024-1.167,2.688-2.134c0.688-1.009,1.092-2.185,1.39-3.355c0.644-2.524,0.939-5.145,1.104-7.738c0.165-2.635,0.304-5.269,0.145-7.909c-0.137-2.278-0.48-4.764-2.191-6.449c-1.563-1.537-3.816-1.969-5.915-2.244C31.877,8.144,27.985,8.002,24,8L24,8z"></path><path fill="#FF3D00" d="M39.633,13.045c-0.833-0.82-2.281-1.155-4.199-1.407C32.1,11.199,28.574,11.002,24,11c-4.575,0.002-8.101,0.199-11.432,0.639c-1.548,0.203-3.277,0.498-4.202,1.407c-0.961,0.946-1.194,2.719-1.301,4.493c-0.15,2.473-0.019,4.977,0.142,7.539c0.187,2.904,0.51,5.189,1.019,7.188c0.276,1.086,0.581,1.849,0.959,2.402c0.291,0.424,0.776,0.791,1.443,1.092c1.61,0.726,3.729,0.85,5.779,0.971l0.52,0.031c2.507,0.149,4.827,0.228,7.087,0.238c2.211-0.011,4.596-0.092,7.06-0.24l0.536-0.033c2.137-0.127,4.155-0.247,5.762-0.97c0.666-0.298,1.15-0.666,1.444-1.095c0.375-0.549,0.681-1.313,0.957-2.398c0.51-2.001,0.833-4.285,1.018-7.188c0.16-2.563,0.293-5.072,0.144-7.538C40.828,15.765,40.598,13.994,39.633,13.045z"></path><path fill="#FFF" d="M31.61,36.727c0.77-0.046,1.513-0.101,2.237-0.173c-0.046-0.104-0.074-0.218-0.059-0.36c0.729-5.49,1.131-10.996,1.478-16.522c0.103-2.318,0.235-4.642,0.27-6.962c0.021-0.249-0.069-0.729,0.022-1.054c-0.043-0.005-0.082-0.012-0.125-0.018c-1.039-0.137-2.103-0.247-3.205-0.339c-0.807,2.898-1.738,6.729-2.566,9.634c-0.665,2.329-1.428,5.685-4.313,5.981c-0.43,0.043-0.888,0.08-1.35,0.086c-0.462-0.006-0.919-0.043-1.35-0.086c-2.885-0.299-3.647-3.652-4.313-5.981c-0.829-2.904-1.759-6.735-2.567-9.633c-1.102,0.091-2.165,0.202-3.203,0.339c-0.042,0.006-0.085,0.012-0.127,0.018c0.091,0.324,0.001,0.804,0.023,1.053c0.033,2.32,0.167,4.645,0.269,6.962c0.345,5.526,0.748,11.032,1.478,16.522c0.015,0.136-0.002,0.254-0.033,0.364c0.736,0.074,1.484,0.129,2.23,0.173l0.52,0.031c0.527,0.031,1.041,0.058,1.553,0.083c0.196-0.649,1.083-3.469,1.083-3.469c0.689-2.214,0.67-2.842,2.437-3.185c0.587-0.114,1.256-0.188,1.934-0.191c0.677,0.003,1.347,0.077,1.934,0.191c1.768,0.343,1.883,0.971,2.57,3.185c0,0,0.887,2.815,1.084,3.468c0.514-0.025,1.03-0.053,1.553-0.084L31.61,36.727z"></path>
                    </svg>
                </div>
            </div>
        </section>
    )
}
