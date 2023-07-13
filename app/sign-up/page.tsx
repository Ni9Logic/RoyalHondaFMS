'use client'

import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { MouseEvent } from 'react';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Navbar } from '../navbar/Navbar'
import { toast } from 'react-hot-toast';

export default function page() {
    const [account, setAccountType] = useState('Current');

    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            fullname: '',
            password: '',
            email: '',
            phone: '',
            accountType: account,
        }
    })

    // We are using useEffect as well because our value is dynamic and just like it gets updated in rendering once the value is stored in object it needs to be
    useEffect(() => {
        setValue('accountType', account); // Update the value of the accountType field
    }, [account, setValue]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const response = axios.post('./api/register', data)
        if ((await response).data) {
            toast.success('Account Successfully Created')
        }
        else {
            toast.error('Some Error Occured')
        }

    }

    // Had to use it to make changes on account settings
    const handleAccountTypeChange = (accountType: string) => {
        setAccountType(accountType);
    };


    return (
        <>
            <Navbar />

            <form onSubmit={handleSubmit(onSubmit)} className='mx-auto container justify-center items-center my-20'>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                        <input type="text" id="fullname" {...register('fullname')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Muhammad Rohail" required />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                        <input type="tel" id="phone" {...register('phone')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+92-330-0000000" pattern="[+][0-9]{2}-[0-9]{3}-[0-9]{7}" required />
                    </div>
                </div>
                <div className='container gap-10 flex flex-row w-full mx-auto mb-5 '>
                    {/* Somehow I had to use this mouse event to make it work and also an extra function for some reason */}
                    <button
                        onClick={(event: MouseEvent<HTMLButtonElement>) => handleAccountTypeChange('Current')}
                        type="button"
                        className={`py-2.5 px-5 mr-2 mb-2 w-full text-sm font-medium text-gray-900 focus:outline-none bg-white border border-gray-200
                        ${account === 'Current' ? 'dark:bg-gray-200 text-blue-700 hover:text-blue-700 bg-gray-200 active:text-blue-700'
                                : 'hover:bg-gray-200 hover:text-blue-700'
                            } focus:z-10 focus:ring-4 focus:ring-gray-200 dark:bg-gray-200 dark:text-gray-200 dark:border-gray-200 dark:hover:text-white dark:hover:bg-gray-200`} >
                        Current Account
                    </button>
                    <button
                        onClick={(event: MouseEvent<HTMLButtonElement>) => handleAccountTypeChange('Saving')}
                        type="button"
                        className={`py-2.5 px-5 mr-2 mb-2 w-full text-sm font-medium text-gray-900 focus:outline-none bg-white border border-gray-200
                        ${account === 'Saving' ? 'bg-gray-200 text-blue-700 hover:bg-gray-200 hover:text-blue-700 active:bg-gray-100 active:text-blue-700'
                                : 'hover:bg-gray-200 hover:text-blue-700'
                            } focus:z-10 focus:ring-4 focus:ring-gray-200 dark:bg-gray-200 dark:text-gray-200 dark:border-gray-200 dark:hover:text-white dark:hover:bg-gray-200`} >
                        Savings Account
                    </button>
                </div>
                <div id="helper-text-explanation" className="container flex flex-row mt-2 text-sm text-gray-500 dark:text-gray-400">By Default Selected Account Is Current Account</div>
                <div id="helper-text-explanation" className="container flex flex-row mb-6 mt-2 text-sm text-gray-500 dark:text-gray-400">Selected Account: <p className="mx-2 font-medium text-blue-600   dark:text-blue-500"> {account} Account</p></div>

                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                    <input type="email" id="email" {...register('email')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" id="password" {...register('password')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                    <input type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                </div>
                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                    </div>
                    <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

        </>
    )
}
