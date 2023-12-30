'use client'

import React, { useEffect, useState } from 'react';
import { Navbar } from '../navbar/Navbar';
import { signIn, useSession } from "next-auth/react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Loader from '../components/ui/loader';
import { Label } from '@/components/ui/label';
import logo from "@/app/components/images/logo.png";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Image from 'next/image';

export default function Page() {
    const router = useRouter();
    const session = useSession();
    const [isLoading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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
                <div className='h-96 justify-center items-center grid grid-rows-2'>
                    <div className='container'>
                        <div className='flex flex-col w-full justify-center items-center'>
                            <Image src={logo} alt='logo' width={200} height={200} />
                            <h1 className='mt-2 font-bold text-3xl text-red-500'>ROYAL HONDA</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
                            <div className="text-left">
                                <label htmlFor="helper-text" className="flex flex-col mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" id="helper-text" {...register('email')} aria-describedby="helper-text-explanation" className="flex flex-col w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 min-h-min" placeholder="name@email.com" />
                                <label htmlFor="helper-text" className="flex flex-col my-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
                                <div className="relative flex items-center">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...register('password')}
                                        id="helper-text"
                                        aria-describedby="helper-text-explanation"
                                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="***********"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-4 top-[3.3]"
                                    >
                                        {showPassword ? <FaEyeSlash className="h-5 w-5 text-gray-500" /> : <FaEye className="h-5 w-5 text-gray-500" />}
                                    </button>
                                </div>
                            </div>
                            <Button className='mt-2 w-full flex flex-row gap-1 mb-1' disabled={isLoading}>
                                Submit
                                <Loader isLoading={isLoading} />
                            </Button>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
}