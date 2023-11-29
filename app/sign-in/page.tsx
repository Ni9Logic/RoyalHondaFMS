'use client'

import React, { useEffect, useState } from 'react';
import { Navbar } from '../navbar/Navbar';
import { signIn, useSession } from "next-auth/react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
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
                }

                if (callback?.ok && !callback?.error) {
                    toast.success('Logged In')
                }
            })
            .finally(() => setLoading(false));
    }
    return (
        <>
            <Navbar />
            <div className='flex flex-col items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="500" height="400" viewBox="0 0 48 48">
                    <path fill="#50e6ff" d="M39,16v25c0,1.105-0.895,2-2,2H11c-1.105,0-2-0.895-2-2V7c0-1.105,0.895-2,2-2h17L39,16z"></path><linearGradient id="_rnrzRmyCORmBgGe4G1aPa_aeo6Jl3iRPTl_gr1" x1="28.529" x2="33.6" y1="-2829.362" y2="-2824.29" gradientTransform="matrix(1 0 0 -1 0 -2813.89)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#3079d6"></stop><stop offset="1" stop-color="#297cd2"></stop></linearGradient><path fill="url(#_rnrzRmyCORmBgGe4G1aPa_aeo6Jl3iRPTl_gr1)" d="M28,5v9c0,1.105,0.895,2,2,2h9L28,5z"></path><path fill="#e52030" d="M25.391,31h-3.083l-0.893-2.794h-4.466L16.065,31H13l4.571-12.558h3.354L25.391,31z M20.768,26.035 l-1.349-4.221c-0.099-0.315-0.169-0.692-0.21-1.13h-0.07c-0.029,0.368-0.102,0.733-0.219,1.095l-1.366,4.256H20.768z"></path><path fill="#e52030" d="M35,26.753h-3.372v3.372H29.86v-3.372h-3.389v-1.778h3.389v-3.389h1.769v3.389H35V26.753z"></path>
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