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
                                <p className="text-base ">Welcome back, in the system you can view your profile, transfer balance, withdraw balance as well as deposit balance.</p>
                            </div>
                        </div>

                        {/* Seperated by line */}
                        <div className="flex flex-col sm:w-2/3 sm:pl-8 gap-5 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                            <Link href="/users/withdraw">
                                <button
                                    className=" w-[200px] bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                                    control-id="ControlID-80">
                                    Withdraw
                                </button>
                            </Link>
                            <button
                                className=" w-[200px] bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                                control-id="ControlID-80">
                                Deposit
                            </button>
                            <button
                                className=" w-[200px] bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                                control-id="ControlID-80">
                                Transfer Balance
                            </button>

                            <button
                                className=" w-[200px] bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                                control-id="ControlID-80">
                                Update Profile
                            </button>
                            <Link href="/users/profile">
                                <button
                                    className=" w-[200px] bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                                    control-id="ControlID-80">
                                    View Profile
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}