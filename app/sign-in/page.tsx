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
import Image from 'next/image';

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
                <div className='h-96 justify-center items-center grid grid-rows-2'>
                    <div className='container'>
                        <div className='flex flex-col w-full justify-center items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="200" height="150" viewBox="0 0 24 24">
                                <path fill="#CCC" fill-rule="evenodd" d="M19.465,3.982c0,0-0.125-0.215-0.604-0.386	c-0.479-0.172-0.959-0.236-0.959-0.236s-0.24,1.456-1.33,6.039c-1.09,4.582-1.81,5.075-4.571,5.075s-3.481-0.493-4.571-5.075	c-1.09-4.583-1.33-6.039-1.33-6.039S5.619,3.424,5.14,3.596C4.66,3.767,4.536,3.982,4.536,3.982s-0.099,3.237,0.486,9.142	c0.587,5.904,0.707,6.911,0.707,6.911s0.94,0.545,1.393,0.606c0.402,0.055,0.589,0.043,0.589,0.043s0.271-1.297,0.679-2.517	c0.599-1.795,0.738-2.643,3.609-2.643s3.011,0.848,3.609,2.643c0.407,1.22,0.679,2.517,0.679,2.517s0.186,0.012,0.589-0.043	c0.453-0.061,1.393-0.606,1.393-0.606s0.121-1.006,0.708-6.911C19.563,7.219,19.465,3.982,19.465,3.982L19.465,3.982z" clip-rule="evenodd"></path><path fill="#E6E6E6" d="M11.125,20.781c-5.282,0-7.961-0.065-9.053-2.628c-0.872-2.046-1.06-6.988-1.06-8.102	c0-6.254,1.027-6.899,10.988-6.899V3.46c-10.087,0-10.682,0.745-10.682,6.591c0,1.482,0.246,6.126,1.036,7.982	c1.041,2.443,3.753,2.441,9.195,2.441L12,20.474v0.308h-0.45C11.406,20.781,11.265,20.781,11.125,20.781L11.125,20.781z"></path><path fill="#E6E6E6" d="M12,2.217L12,2.217C2.808,2.218-0.05,2.554-0.05,9.428c0,10.769,2.352,11.717,6.038,12.128	c0.907,0.1,3.201,0.165,5.665,0.165c3.087,0,6.44-0.104,7.667-0.377c2.409-0.543,4.665-1.549,4.68-11.365	C23.99,2.617,21.878,2.22,12,2.217L12,2.217z M12.282,20.185c-2.984,0-6.194-0.094-7.271-0.34c-2.078-0.468-2.554-1.509-2.942-3.614	c-0.409-2.19-0.545-5.193-0.545-6.232V9.85c0-5.534,0.489-6.096,10.407-6.096H12v0.001l0.032-0.001	c10.107,0,10.443,0.682,10.443,6.145v0.088c0,1.843-0.299,6.339-1.026,8.031c-0.629,1.459-1.908,1.828-3.602,2.012	C17.003,20.123,14.719,20.185,12.282,20.185L12.282,20.185z"></path><path fill="#B2B2B2" d="M6.204,3.92C5.563,3.98,5.01,4.059,4.533,4.164c-0.011,0.758-0.016,3.867,0.49,8.96	c0.501,5.034,0.662,6.507,0.698,6.832c0.554,0.063,1.289,0.112,2.124,0.147c0.118-0.491,0.309-1.227,0.546-1.937	c0.599-1.795,0.738-2.643,3.609-2.643l0,0v-1.049l0,0c-2.762,0-3.481-0.493-4.571-5.075C6.706,6.36,6.357,4.696,6.204,3.92	L6.204,3.92z"></path><path fill="#C8C8C8" d="M12,2.217L12,2.217C3.497,2.218,0.414,2.506,0,7.99v3.96c0.357,8.404,2.614,9.23,5.988,9.607	c0.907,0.1,3.201,0.165,5.665,0.165c0.115,0,0.231,0,0.347,0v-1.537c-1.437-0.003-2.909-0.028-4.155-0.081	c-0.835-0.036-1.57-0.084-2.124-0.147c-0.289-0.033-0.529-0.07-0.709-0.111c-2.078-0.468-2.554-1.509-2.942-3.614	c-0.409-2.19-0.545-5.193-0.545-6.232V9.85c0-3.568,0.203-5.07,3.007-5.686C5.01,4.059,5.563,3.98,6.204,3.92	c1.43-0.133,3.296-0.167,5.729-0.167H12v0.001V2.217L12,2.217L12,2.217z"></path>
                            </svg>
                            <h1 className='mt-2 font-bold text-xl text-red-500'>ROYAL HONDA</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className=''>
                            <div className="text-left">
                                <label htmlFor="helper-text" className="flex flex-col mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" id="helper-text" {...register('email')} aria-describedby="helper-text-explanation" className="flex flex-col w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 min-h-min" placeholder="name@email.com" />
                                <label htmlFor="helper-text" className="flex flex-col my-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Password</label>
                                <input type="password" {...register('password')} id="helper-text" aria-describedby="helper-text-explanation" className="w-[500px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="***********" />
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