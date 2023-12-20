import React from 'react';
import { useRouter } from 'next/navigation';

export default async function UserMenu() {
    const router = useRouter();
return (
        <section className="flex flex-col text-gray-600 body-font h-[75vh] justify-center items-center">
            <div className="h-[60vh] w-[70vh] grid grid-cols-2 items-center flex-col gap-5">
                <div className="gap-2 flex flex-col pt-5">
                    <button onClick={
                        () => {
                            router.push('users/createJobCard')
                        }
                    } className="relative inline-block px-4 py-2 font-medium group">
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                        <span className="relative z-10 text-black group-hover:text-white">Create Job Card</span>
                    </button>
                    <button className="relative inline-block px-4 py-2 font-medium group">
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                        <span className="relative z-10 text-black group-hover:text-white">View Invoice</span>
                    </button>
                    <button className="relative inline-block px-4 py-2 font-medium group">
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                        <span className="relative z-10 text-black group-hover:text-white">Show Ledgers</span>
                    </button>
                    <button className="relative inline-block px-4 py-2 font-medium group">
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                        <span className="relative z-10 text-black group-hover:text-white">Delete Invoice</span>
                    </button>
                </div>
                <div className="gap-2 flex flex-col pt-5">
                    <button className="relative inline-block px-4 py-2 font-medium group">
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                        <span className="relative z-10 text-black group-hover:text-white">Create Invoice</span>
                    </button>

                    <button onClick={() => {
                        router.push('users/salesTaxInvoice')
                    }} className="relative inline-block px-4 py-2 font-medium group">
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                        <span className="relative z-10 text-black group-hover:text-white">Create Sales Tax Invoice</span>
                    </button>
                    <button className="relative inline-block px-4 py-2 font-medium group">
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                        <span className="relative z-10 text-black group-hover:text-white">Create Estimate</span>
                    </button>
                    <button className="relative inline-block px-4 py-2 font-medium group">
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                        <span className="relative z-10 text-black group-hover:text-white">User Logs</span>
                    </button>
                </div>
            </div>
        </section>
    )
}
