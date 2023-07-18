import React from 'react';
import Link from 'next/link';
import getCurrentUser from '../actions/getCurrentUser';

export default async function UserMenu() {
    const user = await getCurrentUser();
    return (
        <section className="flex flex-col text-gray-600 body-font h-[75vh] justify-center items-center">
            <div className="px-5 py-24 mx-auto flex flex-col">
                <div className="lg:w-4/6 mx-auto">
                    <div className="flex flex-col sm:flex-row mt-10">
                        <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                            <div className="flex flex-col items-center text-center justify-center">
                                <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">Hi {user?.fullname}</h2>
                                <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                                <p className="text-base ">Welcome back, in the system you can view your profile,
                                    transfer balance, withdraw balance as well as deposit balance.</p>
                            </div>
                        </div>

                        {/* Seperated by lines */}
                        <div
                            className="flex flex-col sm:w-2/3 sm:pl-8 gap-5 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                            <Link href="/users/withdraw">
                                <button
                                    className=" w-[200px] bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                                    Withdraw
                                </button>
                            </Link>
                            <Link href="/users/deposit">
                                <button
                                    className=" w-[200px] bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                                    Deposit
                                </button>
                            </Link>
                            <Link href="/users/transferBalance">
                                <button
                                    className=" w-[200px] bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                                    Transfer Balance
                                </button>
                            </Link>
                            <Link href="/users/updateProfile">
                                <button
                                    className=" w-[200px] bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                                    Update Profile
                                </button>
                            </Link>
                            <Link href="/users/profile">
                                <button
                                    className=" w-[200px] bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                                    View Profile
                                </button>
                            </Link>
                            <Link href="/users/transactions">
                                <button
                                    className=" w-[200px] bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                                    View Transactions
                                </button>
                            </Link>
                        </div>
                        {
                            user?.admin && <div
                                className="flex flex-col sm:w-2/6 border-l sm:pl-8 gap-5 sm:py-8 border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                                <Link href="/users/withdraw">
                                    <button
                                        className=" w-[200px] bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                                        Make Admin
                                    </button>
                                </Link>
                                <Link href="/users/withdraw">
                                    <button
                                        className=" w-[200px] bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                                        Create User
                                    </button>
                                </Link>
                                <Link href="/users/deposit">
                                    <button
                                        className=" w-[200px] bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                                        Edit User Account
                                    </button>
                                </Link>
                                <Link href="/users/admin/viewAllUsers">
                                    <button
                                        className=" w-[200px] bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                                        View All Users
                                    </button>
                                </Link>
                                <Link href="/users/updateProfile">
                                    <button
                                        className=" w-[200px] bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                                        View Transactions
                                    </button>
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}