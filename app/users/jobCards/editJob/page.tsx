'use client'
import Footer from "@/app/users/Footer";
import Navbar from "@/app/users/Navbar";
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import axios, { AxiosError, AxiosResponse } from "axios";
import 'react-datetime/css/react-datetime.css';
import { useSearchParams } from 'next/navigation'
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Loader from "@/app/components/ui/loader";
import { InsuranceCompaniesData } from "../../createJobCard/page";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns/format";
import { Calendar } from "@/components/ui/calendar";

export type JOBFormData = {
    SerialNo: string,
    CustomerName: string,
    DriverUser: string,
    CellNo: string,
    JobCheckedBy: string,
    WorkType: string,
    Make: string,
    Model: string,
    Insurance: string,
    Status: string,
    RegistrationNumber: string,
    RequiredWorkDetails: string,
    OtherAdditionalWorkDetails: string,
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
    InReceivedBy: string,
    InReceivedFrom: string,
    InTime: string,
    OutReceivedBy: string,
    OutReceivedFrom: string,
    OutTime: string,
};

export default function Page() {
    // Date Time Selection
    const [isLoading, setLoading] = useState(false);
    const searchParams = useSearchParams()!;

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
    } = useForm<JOBFormData>({
        defaultValues: {
            SerialNo: searchParams.get('SerialNo')?.toString(),
            CustomerName: searchParams.get('CustomerName')?.toString(),
            DriverUser: searchParams.get('DriverUser')?.toString(),
            CellNo: searchParams.get('CustomerContact')?.toString(),
            JobCheckedBy: searchParams.get('JobCheckedBy')?.toString(),
            WorkType: searchParams.get('WorkType')?.toString(),
            Make: searchParams.get('Make')?.toString(),
            Model: searchParams.get('Model')?.toString(),
            Insurance: searchParams.get('Insurance')?.toString(),
            Status: searchParams.get('Status')?.toString(),
            RegistrationNumber: searchParams.get('RegistrationNumber')?.toString(),
            RequiredWorkDetails: searchParams.get('RequiredWorkDetails')?.toString(),
            OtherAdditionalWorkDetails: searchParams.get('OtherAdditionalWork')?.toString(),
            Fuel: searchParams.get('Fuel')?.toString(),
            Mileage: searchParams.get('Mileage')?.toString(),
            Lighter: searchParams.get('Lighter') ? true : false,
            Ashtray: searchParams.get('Ashtray') ? true : false,
            FloorMats: searchParams.get('FloorMats') ? true : false,
            OriginalBook: searchParams.get('OriginalBook') ? true : false,
            SeatCovers: searchParams.get('SeatCovers') ? true : false,
            RadioAntena: searchParams.get('RadioAntena') ? true : false,
            SpareWheel: searchParams.get('SpareWheel') ? true : false,
            WheelRod: searchParams.get('WheelRod') ? true : false,
            JackHandle: searchParams.get('JackHandle') ? true : false,
            Tools: searchParams.get('Tools') ? true : false,
            ExtraThings: searchParams.get('ExtraThings') ? true : false,
            FrameNo: searchParams.get('FrameNo')?.toString(),
            BatteryNumber: searchParams.get('BatteryNumber')?.toString(),
            InReceivedBy: searchParams.get('InReceivedBy')?.toString(),
            InReceivedFrom: searchParams.get('InReceivedFrom')?.toString(),
            InTime: searchParams.get('inTime')?.toString(),
            OutReceivedBy: searchParams.get('OutReceivedBy')?.toString(),
            OutReceivedFrom: searchParams.get('OutReceivedFrom')?.toString(),
            OutTime: searchParams.get('OutTime')?.toString(),
        },
    });


    const onSubmit: SubmitHandler<JOBFormData> = async (data: JOBFormData) => {
        setLoading(true);
        console.log(data);
        axios.post("/api/updateJobCard", data)
            .then(() => {
                toast.success("Job Card Updated!")
            })
            .catch((response: any) => {
                let error = response?.response?.data?.Message;
                toast.error(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const [inDate, setInDate] = React.useState<Date>()
    const [outDate, setOutDate] = React.useState<Date>();
    const [allInsurances, setAllInsurances] = useState<InsuranceCompaniesData[]>();
    const getAllInsurances = async () => {
        axios.get("/api/getAllInsurance")
            .then((response: AxiosResponse) => setAllInsurances(response.data.Message))
            .catch((error: AxiosError) => console.log(error));
    }

    useEffect(() => {
        const fetchData = async () => {
            await getAllInsurances();
        }

        fetchData();
    })
    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center ">
                <h1 className="font-bold text-3xl self-center items-center text-center justify-center mb-10 container">
                    Job Card Updation
                </h1>
            </div>
            <div className="items-center justify-center text-center gap-10 container h-full">
                <div className="overflow-x-auto flex items-center justfiy-center">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-2">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex-1 m-0 p-0">
                                <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                                                Serial No
                                            </th>
                                            <td className="px-6 py-4">
                                                <Label>{searchParams.get('SerialNo')?.toString()}</Label>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Customer Name
                                            </th>
                                            <td className="px-6 py-4">
                                                <input defaultValue={searchParams.get('CustomerName')?.toString()} {...register('CustomerName')} className="border-none focus:outline-none" />
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Driver | User
                                            </th>
                                            <td className="px-6 py-4">
                                                <input defaultValue={searchParams.get('DriverUser')?.toString()} onChange={(value) => {
                                                    setValue('DriverUser', value.target.value);
                                                }} className="border-none focus:outline-none"></input>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Contact Number
                                            </th>
                                            <td className="px-6 py-4">
                                                <input defaultValue={searchParams.get('CustomerContact')?.toString()} onChange={(value) => {
                                                    setValue('CellNo', value.target.value);
                                                }} className="border-none focus:outline-none"></input>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Job Checked By
                                            </th>
                                            <td className="px-6 py-4">
                                                <input defaultValue={searchParams.get('JobCheckedBy')?.toString()} onChange={(value) => {
                                                    setValue('JobCheckedBy', value.target.value);
                                                }} className="border-none focus:outline-none"></input>
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
                                <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                                                <select onChange={(value) => {
                                                    setValue('WorkType', value.target.value);
                                                }} className="border-none focus:outline-none">
                                                    <option value="" disabled selected>{searchParams.get('WorkType')?.toString()}</option>
                                                    <option value="INSURANCE">INSURANCE</option>
                                                    <option value="WORK ORDER">WORK ORDER</option>
                                                    <option value="CASH WORK">CASH WORK</option>
                                                    <option value="NONE">NONE</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Insurance
                                            </th>
                                            <td className="px-6 py-4">
                                                <select onChange={(value) => {
                                                    setValue('Insurance', value.target.value);
                                                }} className="border-none focus:outline-none">
                                                    <option value="" disabled selected>{searchParams.get('Insurance')?.toString()}</option>
                                                    {
                                                        allInsurances?.map((insurance: any) => {
                                                            return (
                                                                <option value={insurance.name}>{insurance.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Status
                                            </th>
                                            <td className="px-6 py-4">
                                                <select onChange={(value) => {
                                                    setValue('Status', value.target.value);
                                                }} defaultValue={searchParams.get('Status')?.toString()} className="border-none focus:outline-none">
                                                    <option disabled selected defaultValue={"None Selected"}>Select Status</option>
                                                    <option value="PARKED">PARKED</option>
                                                    <option value="DELIVERED">DELIVERED</option>
                                                    <option value="COME BACK LATER">COME BACK LATER</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Make
                                            </th>
                                            <td className="px-6 py-4">
                                                <input defaultValue={searchParams.get('Make')?.toString()} onChange={(value) => {
                                                    setValue('Make', value.target.value);
                                                }} className="border-none focus:outline-none"></input>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Model
                                            </th>
                                            <td className="px-6 py-4">
                                                <input defaultValue={searchParams.get('Model')?.toString()} onChange={(value) => {
                                                    setValue('Model', value.target.value);
                                                }} className="border-none focus:outline-none"></input>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Registration
                                            </th>
                                            <td className="px-6 py-4">
                                                <input defaultValue={searchParams.get('RegistrationNumber')?.toString()} onChange={(value) => {
                                                    setValue('RegistrationNumber', value.target.value);
                                                }} className="border-none focus:outline-none"></input>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Battery Number
                                            </th>
                                            <td className="px-6 py-4">
                                                <input defaultValue={searchParams.get('BatteryNumber')?.toString()} onChange={(value) => {
                                                    setValue('BatteryNumber', value.target.value);
                                                }} className="border-none focus:outline-none"></input>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Frame Number
                                            </th>
                                            <td className="px-6 py-4">
                                                <input defaultValue={searchParams.get('FrameNumber')?.toString()} onChange={(value) => {
                                                    setValue('FrameNo', value.target.value);
                                                }} className="border-none focus:outline-none"></input>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* Tools CheckList */}
                            <div className="flex-1 m-0 p-0">
                                <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                                                <input defaultValue={searchParams.get('Fuel')?.toString()} onChange={(value) => {
                                                    setValue('Fuel', value.target.value);
                                                }} className="border-none focus:outline-none"></input>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Mileage
                                            </th>
                                            <td className="px-6 py-4">
                                                <input defaultValue={searchParams.get('Mileage')?.toString()} onChange={(value) => {
                                                    setValue('Mileage', value.target.value);
                                                }} className="border-none focus:outline-none"></input>
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
                                                } id="default-checkbox" type="checkbox" checked={searchParams.get('DriverUser') ? true : false} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                                                } id="default-checkbox" type="checkbox" checked={searchParams.get('DriverUser') ? true : false} value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                                                } id="default-checkbox" checked={searchParams.get('DriverUser') ? true : false} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                                                } id="default-checkbox" type="checkbox" checked={searchParams.get('DriverUser') ? true : false} value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                                                } id="default-checkbox" checked={searchParams.get('DriverUser') ? true : false} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                                                } id="default-checkbox" checked={searchParams.get('DriverUser') ? true : false} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                                                } id="default-checkbox" checked={searchParams.get('DriverUser') ? true : false} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                                                } id="default-checkbox" type="checkbox" checked={searchParams.get('DriverUser') ? true : false} value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                                                } id="default-checkbox" checked={searchParams.get('DriverUser') ? true : false} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                                                } id="default-checkbox" checked={searchParams.get('DriverUser') ? true : false} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                                                } id="default-checkbox" type="checkbox" checked={searchParams.get('DriverUser') ? true : false} value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* Additional Work Details */}

                            <div>
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Required Work Details</label>
                                <textarea onChange={(e) => {
                                    setValue('RequiredWorkDetails', e.target.value);
                                }} defaultValue={searchParams.get('RequiredWorkDetails')?.toString()} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2">Addtional Work Details (If Required)</label>
                                <textarea defaultValue={searchParams.get('AdditionalWorkDetails')?.toString()} onChange={(e) => {
                                    setValue('OtherAdditionalWorkDetails', e.target.value);
                                }} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
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
                                                    <input defaultValue={searchParams.get('InReceivedBy')?.toString()} onChange={
                                                        (e) => {
                                                            setValue('InReceivedBy', e.target.value);
                                                        }
                                                    } className="border-none focus:outline-none border-b"></input>
                                                    <input defaultValue={searchParams.get('InReceivedFrom')?.toString()} onChange={
                                                        (e) => {
                                                            setValue('InReceivedFrom', e.target.value);
                                                        }
                                                    } className="border-none focus:outline-none"></input>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-row text-center justify-center gap-2">
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "justify-start text-left font-normal",
                                                                    !inDate && "text-muted-foreground"
                                                                )}
                                                            >
                                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                                {inDate ? format(inDate, "yyyy-MM-dd") : <span>{searchParams.get('InTime')?.toString()}</span>}
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent>
                                                            <Calendar
                                                                mode="single"
                                                                selected={inDate}
                                                                onSelect={(date) => {
                                                                    setInDate(date);
                                                                }}
                                                                onDayClick={(date) => {
                                                                    setValue('InTime', date ? date?.toLocaleDateString() : '')
                                                                }}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                Out
                                            </th>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <input defaultValue={searchParams.get('OutReceivedBy')?.toString()} onChange={
                                                        (e) => {
                                                            setValue('OutReceivedBy', e.target.value);
                                                        }
                                                    } className="border-none focus:outline-none border-b"></input>
                                                    <input defaultValue={searchParams.get('OutReceivedFrom')?.toString()} onChange={
                                                        (e) => {
                                                            setValue('OutReceivedFrom', e.target.value);
                                                        }
                                                    } className="border-none focus:outline-none"></input>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "justify-start text-left font-normal",
                                                                !outDate && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {outDate ? format(outDate, "yyyy-MM-dd") : <span>{searchParams.get('OutTime')?.toString()}</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent>
                                                        <Calendar
                                                            mode="single"
                                                            selected={outDate}
                                                            onSelect={(date) => {
                                                                setOutDate(date);
                                                            }}
                                                            onDayClick={(date) => {
                                                                setValue('OutTime', date ? date?.toLocaleDateString() : '')
                                                            }}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <Button className="flex gap-1" disabled={isLoading}>
                                Update Job Card
                                <Loader isLoading={isLoading} />
                            </Button>
                        </div>
                    </form>
                </div >

            </div >
            <Footer />
        </>
    )
}