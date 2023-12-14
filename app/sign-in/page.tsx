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
            <div className='flex flex-col items-center justify-center gap-10 h-[80vh]'>
                <form onSubmit={handleSubmit(onSubmit)} className=''>
                    <div className="text-left">
                        <label htmlFor="helper-text" className="flex flex-col mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" id="helper-text" {...register('email')} aria-describedby="helper-text-explanation" className="flex flex-col w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 min-h-min" placeholder="name@email.com" />
                        <label htmlFor="helper-text" className="flex flex-col my-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
                        <input type="password" {...register('password')} id="helper-text" aria-describedby="helper-text-explanation" className="w-[500px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="***********" />
                    </div>
                    <button type="submit" className={`w-full gap-10 my-10 px-20 text-white bg-[#78c3fc] hover:bg-[#78c3fc] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg ${isLoading ? "cursor-not-allowed opacity-25" : ""} text-sm py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`} disabled={isLoading}>Login</button>
                </form>
            </div>
        </>
    );
}