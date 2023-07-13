'use client'

import React, { useEffect, useState } from 'react';
import { Navbar } from '../navbar/Navbar';
import { signIn, useSession } from "next-auth/react"
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const session = useSession();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/users');
        }
        

    }, [session?.status, router]);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        }
    })
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true);
        signIn('credentials', {
            ...data,
            redirect: false,
        })
            .then((callback) => {
                if (callback?.error) {
                    toast.error('Invalid Credentials');
                    setLoading(false);
                }

                if (callback?.ok && !callback?.error) {
                    toast.success('Logged In')
                    setLoading(false);
                }
            })
    }
    return (
        <>
            <Navbar />
            <div className='flex flex-col items-center justify-center'>
                <svg className='mb-10 animate-pulse' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="500" height="300" viewBox="0 0 100 100">
                    <path fill="#a3a3cd" d="M89,29v42c0,3.3-2.7,6-6,6H17c-3.3,0-6-2.7-6-6V29c0-3.3,2.7-6,6-6h66C86.3,23,89,25.7,89,29z"></path>
                    <path fill="#f9e65c" d="M34.5,31h-12c-1.4,0-2.5,1.1-2.5,2.5v12c0,1.4,1.1,2.5,2.5,2.5h12c1.4,0,2.5-1.1,2.5-2.5v-12 C37,32.1,35.9,31,34.5,31z"></path>
                    <path fill="#fcba7f" d="M30.5,53h-10c-0.3,0-0.5,0.2-0.5,0.5v5c0,0.3,0.2,0.5,0.5,0.5h10c0.3,0,0.5-0.2,0.5-0.5v-5 C31,53.2,30.8,53,30.5,53z"></path>
                    <path fill="#fcba7f" d="M46.5,53h-10c-0.3,0-0.5,0.2-0.5,0.5v5c0,0.3,0.2,0.5,0.5,0.5h10c0.3,0,0.5-0.2,0.5-0.5v-5 C47,53.2,46.8,53,46.5,53z"></path>
                    <path fill="#fcba7f" d="M62.5,53h-10c-0.3,0-0.5,0.2-0.5,0.5v5c0,0.3,0.2,0.5,0.5,0.5h10c0.3,0,0.5-0.2,0.5-0.5v-5 C63,53.2,62.8,53,62.5,53z"></path>
                    <path fill="#fcba7f" d="M78.5,53h-10c-0.3,0-0.5,0.2-0.5,0.5v5c0,0.3,0.2,0.5,0.5,0.5h10c0.3,0,0.5-0.2,0.5-0.5v-5 C79,53.2,78.8,53,78.5,53z"></path>
                    <path fill="#fefdef" d="M51.5,63h3c0.3,0,0.5,0.2,0.5,0.5v5c0,0.3-0.2,0.5-0.5,0.5h-34c-0.3,0-0.5-0.2-0.5-0.5v-5 c0-0.3,0.2-0.5,0.5-0.5h17H51.5z"></path>
                    <path fill="#fefdef" d="M79.5,38h-34c-0.3,0-0.5-0.2-0.5-0.5v-6c0-0.3,0.2-0.5,0.5-0.5h34c0.3,0,0.5,0.2,0.5,0.5v6 C80,37.8,79.8,38,79.5,38z"></path>
                    <g>
                        <path fill="none" stroke="#1f212b" strokeMiterlimit="10" strokeWidth="2" d="M89,29v42c0,3.3-2.7,6-6,6H17c-3.3,0-6-2.7-6-6V29c0-3.3,2.7-6,6-6h66C86.3,23,89,25.7,89,29z"></path>
                        <path fill="none" stroke="#1f212b" strokeMiterlimit="10" d="M89,29v42c0,3.3-2.7,6-6,6H17c-3.3,0-6-2.7-6-6V29c0-3.3,2.7-6,6-6h66C86.3,23,89,25.7,89,29z"></path>
                        <path fill="none" stroke="#1f212b" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M31.5,26.5h51c1.6,0,3,1.3,3,2.9v41.1c0,1.6-1.3,2.9-3,2.9H17.5c-1.6,0-3-1.3-3-2.9V29.4c0-1.6,1.3-2.9,3-2.9 h1"></path>
                        <line x1="24.5" x2="28.5" y1="26.5" y2="26.5" fill="none" stroke="#1f212b" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></line>
                        <line x1="20.6" x2="21.5" y1="26.5" y2="26.5" fill="none" stroke="#1f212b" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10"></line>
                        <path fill="#1f212b" d="M34.5,31h-12c-1.4,0-2.5,1.1-2.5,2.5v12c0,1.4,1.1,2.5,2.5,2.5h12c1.4,0,2.5-1.1,2.5-2.5v-12 C37,32.1,35.9,31,34.5,31z M36,45.5c0,0.8-0.7,1.5-1.5,1.5h-12c-0.8,0-1.5-0.7-1.5-1.5v-12c0-0.8,0.7-1.5,1.5-1.5h12 c0.8,0,1.5,0.7,1.5,1.5V45.5z"></path>
                        <path fill="#1f212b" d="M30.5,53h-10c-0.3,0-0.5,0.2-0.5,0.5v5c0,0.3,0.2,0.5,0.5,0.5h10c0.3,0,0.5-0.2,0.5-0.5v-5 C31,53.2,30.8,53,30.5,53z M30,58h-9v-4h9V58z"></path>
                        <path fill="#1f212b" d="M75.5,59h-7c-0.3,0-0.5-0.2-0.5-0.5v-5c0-0.3,0.2-0.5,0.5-0.5h10c0.3,0,0.5,0.2,0.5,0.5v3 c0,0.3-0.2,0.5-0.5,0.5S78,56.8,78,56.5V54h-9v4h6.5c0.3,0,0.5,0.2,0.5,0.5S75.8,59,75.5,59z"></path>
                        <path fill="#1f212b" d="M79.5,38h-19c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5H79v-5H46v5h5.5c0.3,0,0.5,0.2,0.5,0.5S51.8,38,51.5,38 h-6c-0.3,0-0.5-0.2-0.5-0.5v-6c0-0.3,0.2-0.5,0.5-0.5h34c0.3,0,0.5,0.2,0.5,0.5v6C80,37.8,79.8,38,79.5,38z"></path>
                        <path fill="#1f212b" d="M49.5,64h-2c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5h2c0.3,0,0.5,0.2,0.5,0.5S49.8,64,49.5,64z"></path>
                        <path fill="#1f212b" d="M44.5,64h-4c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5h4c0.3,0,0.5,0.2,0.5,0.5S44.8,64,44.5,64z"></path>
                        <path fill="#1f212b" d="M54.5,69h-34c-0.3,0-0.5-0.2-0.5-0.5v-5c0-0.3,0.2-0.5,0.5-0.5h17c0.3,0,0.5,0.2,0.5,0.5S37.8,64,37.5,64 H21v4h33v-4h-2.5c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5h3c0.3,0,0.5,0.2,0.5,0.5v5C55,68.8,54.8,69,54.5,69z"></path>
                        <path fill="#1f212b" d="M46.5,59h-10c-0.3,0-0.5-0.2-0.5-0.5v-5c0-0.3,0.2-0.5,0.5-0.5h2c0.3,0,0.5,0.2,0.5,0.5S38.8,54,38.5,54H37 v4h9v-4h-4.5c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5h5c0.3,0,0.5,0.2,0.5,0.5v5C47,58.8,46.8,59,46.5,59z"></path>
                        <path fill="#1f212b" d="M62.5,53h-10c-0.3,0-0.5,0.2-0.5,0.5v5c0,0.3,0.2,0.5,0.5,0.5h10c0.3,0,0.5-0.2,0.5-0.5v-5 C63,53.2,62.8,53,62.5,53z M62,58h-9v-4h9V58z"></path>
                    </g>
                </svg>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-left">
                        <label htmlFor="helper-text" className="flex flex-col mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" id="helper-text" {...register('email')} aria-describedby="helper-text-explanation" className="flex flex-col w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 min-h-min" placeholder="name@email.com" />
                        <label htmlFor="helper-text" className="flex flex-col my-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
                        <input type="password" {...register('password')} id="helper-text" aria-describedby="helper-text-explanation" className="w-[500px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="***********" />
                    </div>
                    <button type="submit" className={`w-full gap-10 my-10 px-20 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg ${isLoading ? "cursor-not-allowed opacity-25" : ""} text-sm py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`} disabled={isLoading}>Login</button>
                </form>
            </div>
        </>
    );
}