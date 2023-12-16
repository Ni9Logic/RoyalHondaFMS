'use client'
import Footer from "../Footer";
import Navbar from "../Navbar";
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default async function Page() {
    const [isLoading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            SerialNo: '', // Assuming SerialNo is a string
            CustomerName: '',
            DriverUser: '',
            CellNo: '',
            JobCheckedBy: '',
            WorkType: '',
            Insurance: '',
            WorkOrder: '',
            CashWorks: '',
            RegistrationNumber: '',
            RequiredWorkDetails: '',
            OtherAdditionalWork: '',
            Fuel: '',
            Mileage: '',
            Lighter: '',
            Ashtray: '',
            FloorMats: '',
            OriginalBook: '',
            SeatCovers: '',
            RadioAntena: '',
            SpareWheel: '',
            WheelRod: '',
            JackHandle: '',
            Tools: '',
            ExtraThings: '',
            FrameNo: '',
            BatteryNumber: '',
            In: '', // Assuming In is a string
            Out: '', // Assuming Out is a string
        },
    });

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
            <div className="h-full items-center justify-center text-center container gap-2">
                <div className="overflow-x-auto flex items-center justfiy-center">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[600px]">
                        <div className="grid grid-cols-2 grid-rows-2">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <h1 className='text-center flex items-center justify-center font-bold'>
                                    Job Card
                                </h1>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Field
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Values
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Serial No
                                        </th>
                                        <td className="px-6 py-4">
                                            {/* Will get fetched Automatically from Database */}
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Customer Name
                                        </th>
                                        <td className="px-6 py-4">
                                            <input {...register('CustomerName')} className="border-none focus:outline-none"></input>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Contact Number
                                        </th>
                                        <td className="px-6 py-4">
                                            <input {...register('CellNo')} className=""></input>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Field
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Values
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Serial No
                                    </th>
                                    <td className="px-6 py-4">
                                        {/* Will get fetched Automatically from Database */}
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Customer Name
                                    </th>
                                    <td className="px-6 py-4">
                                        <input {...register('CustomerName')} className="border-none focus:outline-none"></input>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Contact Number
                                    </th>
                                    <td className="px-6 py-4">
                                        <input {...register('CellNo')} className=""></input>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Driver/User
                                    </th>
                                    <td className="px-6 py-4">
                                        <input {...register('DriverUser')} className=""></input>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Job Checked By
                                    </th>
                                    <td className="px-6 py-4">
                                        <input {...register('JobCheckedBy')} className=""></input>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Insurance
                                    </th>
                                    <td className="px-6 py-4">
                                        <input {...register('Insurance')} className=""></input>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Work Type
                                    </th>
                                    <td className="px-6 py-4">
                                        <input {...register('WorkType')} className=""></input>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Work Order
                                    </th>
                                    <td className="px-6 py-4">
                                        <input {...register('WorkOrder')} className=""></input>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Registration Number
                                    </th>
                                    <td className="px-6 py-4">
                                        <input {...register('RegistrationNumber')} className=""></input>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Battery Number
                                    </th>
                                    <td className="px-6 py-4">
                                        <input {...register('BatteryNumber')} className=""></input>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Fuel
                                    </th>
                                    <td className="px-6 py-4">
                                        <input {...register('Fuel')} className=""></input>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Milage
                                    </th>
                                    <td className="px-6 py-4">
                                        <input {...register('Mileage')} className=""></input>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Ashtray
                                    </th>
                                    <td className="px-6 py-4">
                                        <input {...register('Ashtray')} className=""></input>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Floor Mats
                                    </th>
                                    <td className="px-6 py-4">
                                        <input {...register('FloorMats')} className=""></input>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Original Book
                                    </th>
                                    <td className="px-6 py-4">
                                        <input {...register('OriginalBook')} className=""></input>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Seat Covers
                                    </th>
                                    <td className="px-6 py-4">
                                        <input {...register('SeatCovers')} className=""></input>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Radio Antena
                                    </th>
                                    <td className="px-6 py-4">
                                        <input {...register('RadioAntena')} className=""></input>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Spare Wheel
                                    </th>
                                    <td className="px-6 py-4">
                                        <input {...register('SpareWheel')} className=""></input>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Wheel Rod
                                    </th>
                                    <td className="px-6 py-4">
                                        <input {...register('WheelRod')} className=""></input>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Jack/Handle
                                    </th>
                                    <td className="px-6 py-4">
                                        <input {...register('JackHandle')} className=""></input>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Tools
                                    </th>
                                    <td className="px-6 py-4">
                                        <input {...register('Tools')} className=""></input>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Extra Things
                                    </th>
                                    <td className="px-6 py-4">
                                        <input {...register('ExtraThings')} className=""></input>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Frame No
                                    </th>
                                    <td className="px-6 py-4">
                                        <input {...register('FrameNo')} className=""></input>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Required Work
                                    </th>
                                    <td className="px-6 py-4">
                                        <textarea {...register('RequiredWorkDetails')} className="resize-y h-32 w-full"></textarea>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Additional Work
                                    </th>
                                    <td className="px-6 py-4">
                                        <textarea {...register('OtherAdditionalWork')} className="resize-y h-32 w-full"></textarea>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        In Time
                                    </th>
                                    <td className="px-6 py-4">
                                        <input {...register('In')} className=""></input>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Out Time
                                    </th>
                                    <td className="px-6 py-4">
                                        <input {...register('Out')} className=""></input>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <br></br>
                        <button type="submit" className="relative inline-block px-4 py-2 font-medium group overflow-y-hidden overflow-hidden">
                            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                            <span className="relative z-10 text-black group-hover:text-white">Submit</span>
                        </button>
                    </form>
                </div>

            </div>
            <Footer />
        </>
    )
}