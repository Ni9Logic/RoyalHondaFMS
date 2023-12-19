'use client'
import Footer from "../Footer";
import Navbar from "../Navbar";
import React, { useState, useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm, useFieldArray, FieldArrayWithId } from "react-hook-form";
import { toast } from 'react-hot-toast';
import axios from "axios";
import EstimateRow from "@/app/components/estimates/Row";


export default function Page() {

    interface EstimateRowType {
        work: string;
        price: string;
    }
    const [rows, setRows] = useState<EstimateRowType[]>([]);
    useEffect(() => {
        console.log(rows);
    }, [rows]);
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
        FrameNo: string,
        BatteryNumber: string,
        In: { VRecievedBy: string, VReceivedFrom: string, Time: string },
        Out: { VRecievedBy: string, VReceivedFrom: string, Time: string },
    };

    const handleAddRow = () => {
        setRows(rows => [...rows, { work: storedRequiredWorkDetails[0].work, price: storedRequiredWorkDetails[0].price }]);
    };
    const handleRemoveRow = (indexToRemove: any) => {
        const updatedRows = rows.filter((_, index) => index !== indexToRemove);
        setRows(updatedRows);
    }
    const handleEstimate = () => {
        setValue('RequiredWorkDetails', rows);
    }

    const [isLoading, setLoading] = useState(false);
    const [isEstimate, setisEstimate] = useState(false);

    const handleIsEstimate = () => {
        if (isEstimate === false)
            setisEstimate(true);
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
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
            RequiredWorkDetails: [{ work: '', price: '' }],
            OtherAdditionalWork: '',
            Fuel: '',
            Mileage: '',
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
            FrameNo: '',
            BatteryNumber: '',
            In: { VReceivedFrom: '', VRecievedBy: '', Time: '' },
            Out: { VReceivedFrom: '', VRecievedBy: '', Time: '' },
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'RequiredWorkDetails',
    });


    // On each change uses useEffect
    const [storedRequiredWorkDetails, setStoredRequiredWorkDetails] = useState<FieldArrayWithId<FormData, 'RequiredWorkDetails', 'id'>[]>([]);
    useEffect(() => {
        setStoredRequiredWorkDetails([...fields]);
    }, [fields])


    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        // Setting Loading state of button
        setLoading(true);

        axios.post('../../api/jobcard', data)
            .then(() => {
                toast.success('Job Card Created!');
            })
            .catch((error) => {
                toast.error(error.error)
            })
            .finally(() => setLoading(false));
    }

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center ">
                <h1 className="font-bold text-3xl self-center items-center text-center justify-center">
                    Job Card Creation
                </h1>
            </div>
            <div className="items-center justify-center text-center gap-10 container">
                <div className="overflow-x-auto flex items-center justfiy-center">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-2">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex-1 m-0 p-0">
                                <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 h-[300px]">
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
                                <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 h-[300px]">
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
                                <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 h-[300px]">
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
                                                <input onChange={
                                                    (e) => {
                                                        setValue('Lighter', e.target.checked);
                                                    }
                                                } id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Ashtray
                                            </th>
                                            <td className="px-6 py-4">
                                                <input onChange={
                                                    (e) => {
                                                        setValue('Ashtray', e.target.checked);
                                                    }
                                                } id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Floor Mats
                                            </th>
                                            <td className="px-6 py-4">
                                                <input onChange={
                                                    (e) => {
                                                        setValue('FloorMats', e.target.checked);
                                                    }
                                                } id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Orignal Book
                                            </th>
                                            <td className="px-6 py-4">
                                                <input onChange={
                                                    (e) => {
                                                        setValue('OriginalBook', e.target.checked);
                                                    }
                                                } id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Seat Covers
                                            </th>
                                            <td className="px-6 py-4">
                                                <input onChange={
                                                    (e) => {
                                                        setValue('SeatCovers', e.target.checked);
                                                    }
                                                } id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Radio Antena
                                            </th>
                                            <td className="px-6 py-4">
                                                <input onChange={
                                                    (e) => {
                                                        setValue('RadioAntena', e.target.checked);
                                                    }
                                                } id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Spare Wheel
                                            </th>
                                            <td className="px-6 py-4">
                                                <input onChange={
                                                    (e) => {
                                                        setValue('SpareWheel', e.target.checked);
                                                    }
                                                } id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Wheel Rod
                                            </th>
                                            <td className="px-6 py-4">
                                                <input onChange={
                                                    (e) => {
                                                        setValue('WheelRod', e.target.checked);
                                                    }
                                                } id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Jack | Handle
                                            </th>
                                            <td className="px-6 py-4">
                                                <input onChange={
                                                    (e) => {
                                                        setValue('JackHandle', e.target.checked);
                                                    }
                                                } id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Tools
                                            </th>
                                            <td className="px-6 py-4">
                                                <input onChange={
                                                    (e) => {
                                                        setValue('Tools', e.target.checked);
                                                    }
                                                } id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Extra Things
                                            </th>
                                            <td className="px-6 py-4">
                                                <input onChange={
                                                    (e) => {
                                                        setValue('ExtraThings', e.target.checked);
                                                    }
                                                } id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* Additional Work Details */}

                            <div>
                                <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 h-[300px]">
                                    <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-center">
                                                Work
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-center">
                                                Price
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {rows.map((item, index) => (
                                            <tr key={`rows-${index}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <input
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            const copy = [...rows];
                                                            copy[index].work = value;
                                                            setRows(copy);
                                                        }}
                                                        placeholder="Work"
                                                        className="border-none outline-none"
                                                    />
                                                </th>
                                                <td className="px-6 py-4">
                                                    <input
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            const copy = [...rows];
                                                            copy[index].price = value;
                                                            setRows(copy);
                                                        }}
                                                        placeholder="Price"
                                                        className="border-none outline-none"
                                                    />
                                                </td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveRow(index)}
                                                        className="relative inline-block px-4 py-2 font-medium group overflow-y-hidden overflow-hidden print:hidden"
                                                    >
                                                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-red-500"></span>
                                                        <span className="relative z-10 text-black group-hover:text-white">Delete</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                                <div className="flex flex-col gap-2 w-[200px]">
                                    <button
                                        type="button"
                                        onClick={() => handleAddRow()}
                                        className="print:hidden relative mt-2 inline-block px-4 py-2 font-medium group overflow-y-hidden overflow-hidden"
                                    >
                                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                                        <span className="relative z-10 text-black group-hover:text-white">Add New Record</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            handleEstimate()
                                            handleIsEstimate()
                                        }}
                                        className="print:hidden relative mt-2 inline-block px-4 py-2 font-medium group overflow-y-hidden overflow-hidden"
                                    >
                                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                        <span className="absolute inset-0 w-full h-full border-2 border-black bg-green-300"></span>
                                        <span className="relative z-10 text-black">Generate Estimate</span>
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            print()
                                        }}
                                        className="print:hidden relative mt-2 inline-block px-4 py-2 font-medium group overflow-y-hidden overflow-hidden"
                                    >
                                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                        <span className="absolute inset-0 w-full h-full border-2 border-black bg-green-300"></span>
                                        <span className="relative z-10 text-black">Print Form</span>
                                    </button>
                                </div>
                                <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-10">
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
                                                    <input placeholder="Vehicle Received By" {...register('In.VRecievedBy')} className="border-none focus:outline-none border-b"></input>
                                                    <input placeholder="Vehicle Received From" {...register('In.VReceivedFrom')} className="border-none focus:outline-none"></input>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                Testing
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Out
                                            </th>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <input placeholder="Vehicle Received By" {...register('Out.VRecievedBy')} className="border-none focus:outline-none border-b"></input>
                                                    <input placeholder="Vehicle Received From" {...register('Out.VReceivedFrom')} className="border-none focus:outline-none"></input>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                Testing
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                {
                                    storedRequiredWorkDetails.length > 0 && isEstimate && (
                                        <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 h-[100px] mt-10">
                                            <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th className="px-6 py-3 text-center">Estimated Work</th>
                                                    <th className="px-6 py-3 text-center">Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {<EstimateRow list={storedRequiredWorkDetails} />}
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Estimated Cost</th>
                                                    <td className="px-6 py-4">
                                                        {
                                                            storedRequiredWorkDetails.reduce((total, item) => {
                                                                // Assuming item.price is a string, convert it to a number before summing
                                                                const priceAsNumber = parseFloat(item.price);
                                                                return total + (isNaN(priceAsNumber) ? 0 : priceAsNumber);
                                                            }, 0)}
                                                    </td>
                                                </tr>
                                            </tbody>

                                        </table>
                                    )
                                }
                            </div>
                        </div>



                        <button type="submit" className="print:hidden relative inline-block px-4 py-2 font-medium group overflow-y-hidden overflow-hidden">
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