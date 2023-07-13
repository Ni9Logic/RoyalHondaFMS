import getCurrentUser from '@/actions/getCurrentUser'
import React from 'react'
import Link from 'next/link';
import Navbar from '../Navbar';
import Footer from '../Footer';

export default async function page() {
    const user = await getCurrentUser();
    return (
        <>
            <Navbar />
            <div className='flex flex-col justify-center items-center h-[75vh] gap-10'>
                <h1 className='font-mono font-semibold text-3xl'>Profile Details</h1>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <tbody>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Email
                                </th>
                                <td className="px-6 py-4">
                                    {user?.email}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Full name
                                </th>
                                <td className="px-6 py-4">
                                    {user?.fullname}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Password
                                </th>
                                <td className="px-6 py-4">
                                    {user?.hashedPassword}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Account Type
                                </th>
                                <td className="px-6 py-4">
                                    {user?.accountType}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Phone Number
                                </th>
                                <td className="px-6 py-4">
                                    {user?.phone}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Created At
                                </th>
                                <td className="px-6 py-4">
                                    {JSON.stringify(user?.createdAt)}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Admin Status
                                </th>
                                <td className="px-6 py-4">
                                    {user?.admin ? 'Yes' : 'No'}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Balance
                                </th>
                                <td className="px-6 py-4">
                                    {user?.Balance}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Link href="/users">
                    <button
                        className=" w-[200px] bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0"
                        control-id="ControlID-80">
                        Back
                    </button>
                </Link>
            </div >
            <Footer />
        </>
    )
}
