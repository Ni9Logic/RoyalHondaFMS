'use client'
import Footer from "../Footer";
import Navbar from "../Navbar";
import React, { useState, useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm, useFieldArray, FieldArrayWithId } from "react-hook-form";
import { toast } from 'react-hot-toast';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";

export default function Page() {

    type FormData = {
        CustomerName: string,
        DriverUser: string,
        CellNo: string,
        JobCheckedBy: string,
        WorkType: string,
        Insurance: string,
        WorkOrder: string,
        CashWorks: string,
        RegistrationNumber: string,
        RequiredWorkDetails: { work: string, price: string }[],
        OtherAdditionalWork: string,
        Fuel: string,
        Mileage: string,
        Lighter: boolean,
        Ashtray: boolean,
        FloorMats: boolean,
        OriginalBook: boolean,
        SeatCovers: boolean,
        RadioAntena: boolean,
        SpareWheel: boolean,
        WheelRod: boolean,
        JackHandle: boolean,
        Tools: boolean,
        ExtraThings: boolean,
        FrameNo: boolean,
        BatteryNumber: string,
        In: any, // Assuming In is a string
        Out: any, // Assuming Out is a string
    };

    const handleAddRow = () => {
        append({ work: '', price: '' }); // Add an empty row to the fields array
    };
    const handleRemoveRow = (indexToRemove: any) => {
        remove(indexToRemove);
    }



    const [isLoading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<FormData>({
        defaultValues: {
            CustomerName: '',
            DriverUser: '',
            CellNo: '',
            JobCheckedBy: '',
            WorkType: '',
            Insurance: '',
            WorkOrder: '',
            CashWorks: '',
            RegistrationNumber: '',
            RequiredWorkDetails: [{ 'work': '', 'price': '' }],
            OtherAdditionalWork: '',
            Fuel: '0',
            Mileage: '0',
            Lighter: false,
            Ashtray: false,
            FloorMats: false,
            OriginalBook: false,
            SeatCovers: false,
            RadioAntena: false,
            SpareWheel: false,
            WheelRod: false,
            JackHandle: false,
            Tools: false,
            ExtraThings: false,
            FrameNo: false,
            BatteryNumber: '',
            In: '', // Assuming In is a string
            Out: '', // Assuming Out is a string
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'RequiredWorkDetails',
    });

    // We wanna keep track of changes in price and works
    const logRequiredWorkDetails = () => {
        fields.forEach((item, index) => {
            console.log(`Item ${index + 1}:`, item);
        });
    };

    // On each change uses useEffect
    const [storedRequiredWorkDetails, setStoredRequiredWorkDetails] = useState<FieldArrayWithId<FormData, 'RequiredWorkDetails', 'id'>[]>([]);
    useEffect(() => {
        logRequiredWorkDetails();
        setStoredRequiredWorkDetails([...fields]);
        console.log(storedRequiredWorkDetails)
    }, [fields])

    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        // Setting Loading state of button
        setLoading(true);

        axios.post('../../api/jobcard', data)
            .then(() => {
                console.log(data);
                toast.success('Job Card Created!');
            })
            .catch(() => {
                toast.error('Some Error Occurred.');
            })
            .finally(() => setLoading(false));
    }
    return (
        <>
            <Navbar />
            <div className="items-center justify-center text-center container gap-10">
                <div className="overflow-x-auto flex items-center justfiy-center">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-2">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex-1 m-0 p-0">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 h-[300px]">
                                    <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-center">
                                                Job
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Card
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Customer Name
                                            </th>
                                            <td className="px-6 py-4">
                                                <input placeholder="Customer Name" {...register('CustomerName')} className="border-none focus:outline-none"></input>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Driver | User
                                            </th>
                                            <td className="px-6 py-4">
                                                <input placeholder="Driver | User" {...register('DriverUser')} className="border-none focus:outline-none"></input>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Contact Number
                                            </th>
                                            <td className="px-6 py-4">
                                                <input placeholder="Contact Number" {...register('CellNo')} className="border-none focus:outline-none"></input>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Job Checked By
                                            </th>
                                            <td className="px-6 py-4">
                                                <input placeholder="Job Checked By" {...register('JobCheckedBy')} className="border-none focus:outline-none"></input>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Email Us
                                            </th>
                                            <td className="px-6 py-4 font-bold">
                                                services.royalhonda@gmail.com
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex-1 m-0 p-0">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 h-[300px]">
                                    <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-center">
                                                Work
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Details
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Work Type
                                            </th>
                                            <td className="px-6 py-4">
                                                <input placeholder="Work Type" {...register('WorkType')} className="border-none focus:outline-none"></input>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Insurance
                                            </th>
                                            <td className="px-6 py-4">
                                                <input placeholder="Insurance" {...register('Insurance')} className="border-none focus:outline-none"></input>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Cash Works
                                            </th>
                                            <td className="px-6 py-4">
                                                <textarea placeholder="Describe..." {...register('CashWorks')} className="resize-y h-10 w-full border-none focus:outline-none"></textarea>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Registration
                                            </th>
                                            <td className="px-6 py-4">
                                                <input placeholder="Job Checked By" {...register('RegistrationNumber')} className="border-none focus:outline-none"></input>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Battery Number
                                            </th>
                                            <td className="px-6 py-4">
                                                <input placeholder="Battery #" {...register('BatteryNumber')} className="border-none focus:outline-none"></input>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* Tools CheckList */}
                            <div className="flex-1 m-0 p-0">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 h-[300px]">
                                    <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-center">
                                                Tools
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                | Checklist
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Fuel
                                            </th>
                                            <td className="px-6 py-4">
                                                <input placeholder="Fuel" {...register('Fuel')} className="border-none focus:outline-none"></input>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Mileage
                                            </th>
                                            <td className="px-6 py-4">
                                                <input placeholder="Mileage" {...register('Mileage')} className="border-none focus:outline-none"></input>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Lighter
                                            </th>
                                            <td className="px-6 py-4">
                                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Ashtray
                                            </th>
                                            <td className="px-6 py-4">
                                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Floor Mats
                                            </th>
                                            <td className="px-6 py-4">
                                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Orignal Book
                                            </th>
                                            <td className="px-6 py-4">
                                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Seat Covers
                                            </th>
                                            <td className="px-6 py-4">
                                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Radio Anteena
                                            </th>
                                            <td className="px-6 py-4">
                                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Spare Wheel
                                            </th>
                                            <td className="px-6 py-4">
                                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Wheel Rod
                                            </th>
                                            <td className="px-6 py-4">
                                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Jack | Handle
                                            </th>
                                            <td className="px-6 py-4">
                                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Tools
                                            </th>
                                            <td className="px-6 py-4">
                                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Extra Things
                                            </th>
                                            <td className="px-6 py-4">
                                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* Additional Work Details */}

                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 h-[300px]">
                                <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th className="px-6 py-3 text-center">Work</th>
                                        <th className="px-6 py-3 text-center">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fields.map((item, index) => (
                                        <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <input
                                                    {...register(`RequiredWorkDetails.${index}.work`)}
                                                    placeholder="Work"
                                                    className="border-none outline-none"
                                                />
                                            </th>
                                            <td className="px-6 py-4">
                                                <input
                                                    {...register(`RequiredWorkDetails.${index}.price`)}
                                                    placeholder="Price"
                                                    className="border-none outline-none"
                                                />
                                            </td>
                                            <td>
                                                <button type="button" onClick={() => handleRemoveRow(index)} className="relative inline-block px-4 py-2 font-medium group overflow-y-hidden overflow-hidden">
                                                    <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                                    <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-red-500"></span>
                                                    <span className="relative z-10 text-black group-hover:text-white">Delete</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <button type="button" onClick={() => handleAddRow()} className="relative mt-2 inline-block px-4 py-2 font-medium group overflow-y-hidden overflow-hidden">
                                    <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                    <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                                    <span className="relative z-10 text-black group-hover:text-white">Add New Record</span>
                                </button>
                            </table>


                        </div>
                        <div className="flex items-center justify-center">
                            <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            Additional
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Details
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Time
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            In
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <input placeholder="Vehicle Received By" {...register('In')} className="border-none focus:outline-none border-b"></input>
                                                <input placeholder="Vehicle Received From" {...register('In')} className="border-none focus:outline-none"></input>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {/* Implementation of Time */}
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Out
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <input placeholder="Vehicle Received By" {...register('In')} className="border-none focus:outline-none border-b"></input>
                                                <input placeholder="Vehicle Received From" {...register('In')} className="border-none focus:outline-none"></input>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {/* Implementation of Time */}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button type="submit" className="relative inline-block px-4 py-2 font-medium group overflow-y-hidden overflow-hidden">
                            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                            <span className="relative z-10 text-black group-hover:text-white">Submit</span>
                        </button>
                    </form>
                </div >

            </div >
            <Footer />
        </>
    )
}