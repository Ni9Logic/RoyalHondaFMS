'use client'

import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Navbar } from '../navbar/Navbar'
import { toast } from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function page() {
    const [isLoading, setLoading] = useState(false);
    const session = useSession();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue
    } = useForm<FieldValues>({
        defaultValues: {
            fullname: '',
            password: '',
            email: '',
            semester: '',
        }
    })

    // We are using useEffect as well because our value is dynamic and just like it gets updated in rendering once the value is stored in object it needs to be
    useEffect(() => {


        if (session?.status === 'authenticated') {
            router.push('/users')
        }
    }, [session?.status, router, setValue]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        // Setting Loading state of button
        setLoading(true);

        // Check for phone number
        if (isNaN(data.semester)) {
            setLoading(false);
            return toast.error('Invalid Phone Number')
        }

        // If both passwords are incorrect
        if (data.password !== data.cpassword) {
            setLoading(false);
            return toast.error('Unmatched Passwords!');
        }

        // If passwords length are less than 8
        if (data.password.length < 8) {
            setLoading(false);
            return toast.error('Password must be greater than 8 characters');
        }

        // If full name length is less than 4
        if (data.fullname.length < 4) {
            setLoading(false);
            return toast.error('Fullname shall have at least 4 characters')
        }

        axios.post('./api/register', data)
            .then(() => {
                signIn('credentials', {
                    ...data,
                    redirect: false,
                });

                toast.success('Account Successfully Created');
                toast.success('Logged in!');
            })
            .catch(() => {
                toast.error('Email Address Already Exists!');
            })
            .finally(() => setLoading(false));
    }

    return (
        <>
            <Navbar />

            <form onSubmit={handleSubmit(onSubmit)} className='mx-auto container justify-center items-center my-20'>
                <div className="grid gap-6 mb-6">
                    <div>
                        <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                        <input type="text" id="fullname" {...register('fullname')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Muhammad Rohail" required />
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                    <input type="email" id="email" {...register('email')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@email.com" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="semester" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Semester</label>
                    <input type="semestetr" id="semester" {...register('semester')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Current Semester" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" id="password" {...register('password')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                    <input type="password" id="confirm_password" {...register('cpassword')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                </div>
                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                    </div>
                    <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                </div>
                <button type="submit" className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg ${isLoading ? "cursor-not-allowed opacity-25" : ""} text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`} disabled={isLoading}>Submit</button>
            </form>

        </>
    )
}
