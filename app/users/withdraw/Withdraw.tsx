'use client'
import { webUser } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React from 'react'

interface WithdrawProps {
    currentUser: webUser | null;
}

const Withdraw: React.FC<WithdrawProps> = ({ currentUser }) => {
    const route = useRouter();
    if (!currentUser) return null;
    return (
        <>
            <div className='flex flex-col border border-gray justify-center items-center h-[75vh] gap-10'>
                {/* Showing Available balance */}
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <tbody>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Available Balance
                                </th>
                                <td className="px-6 py-4">
                                    {currentUser?.Balance}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Need to add a input field */}
                <div className='flex flex-row gap-10 mb-10'>
                    <button
                        className="w-[200px] bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0"
                        control-id="ControlID-80"
                        onClick={() => route.push('/users')}>
                        Withdraw Amount
                    </button>
                    <button
                        className=" w-[200px] bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0"
                        control-id="ControlID-80"
                        onClick={() => route.push('/users')}>
                        Back
                    </button>
                </div>
            </div>
        </>
    )
}

export default Withdraw;