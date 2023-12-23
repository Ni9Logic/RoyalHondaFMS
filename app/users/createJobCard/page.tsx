'use client'
import Footer from "../Footer";
import Navbar from "../Navbar";
import React, { useState, useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm, useFieldArray, FieldArrayWithId } from "react-hook-form";
import { toast } from 'react-hot-toast';
import axios from "axios";
import EstimateRow from "@/app/components/estimates/Row";
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { Middleware } from "next/dist/lib/load-custom-routes";
import AnotherPrintJobs from "@/app/components/printable/jobPrintAble";


export default function Page() {
    // Date Time Selection
    const [inDate, setInDate] = useState<any>(undefined);
    const [outDate, setOutDate] = useState<any>(undefined);
    const [isPreview, setIsPreview] = useState(false);

    // To transfer all the fields inside jobprintable
    const [CustomerName, setCustomerName] = useState<string>('');
    const [DriverUser, setDriverUser] = useState<string>('');
    const [CellNo, setCellNo] = useState<string>('');
    const [JobCheckedBy, setJobCheckedBy] = useState<string>('');
    const [WorkType, setWorkType] = useState<string>('');
    const [Insurance, setInsurance] = useState<string>('');
    const [WorkOrder, setWorkOrder] = useState<string>('');
    const [CashWorks, setCashWorks] = useState<string>('');
    const [RegistrationNumber, setRegistrationNumber] = useState<string>('');
    const [OtherAdditionalWork, setOtherAdditionalWork] = useState<string>('');
    const [Fuel, setFuel] = useState<string>('');
    const [Mileage, setMileage] = useState<string>('');
    const [Lighter, setLighter] = useState<boolean>(false);
    const [Ashtray, setAshtray] = useState<boolean>(false);
    const [FloorMats, setFloorMats] = useState<boolean>(false);
    const [OriginalBook, setOriginalBook] = useState<boolean>(false);
    const [SeatCovers, setSeatCovers] = useState<boolean>(false);
    const [RadioAntena, setRadioAntena] = useState<boolean>(false);
    const [SpareWheel, setSpareWheel] = useState<boolean>(false);
    const [WheelRod, setWheelRod] = useState<boolean>(false);
    const [JackHandle, setJackHandle] = useState<boolean>(false);
    const [Tools, setTools] = useState<boolean>(false);
    const [ExtraThings, setExtraThings] = useState<boolean>(false);
    const [FrameNo, setFrameNo] = useState<string>('');
    const [BatteryNumber, setBatteryNumber] = useState<string>('');
    const [RequiredWorkDetails, setRequiredWorkDetails] = useState<string>('');
    const [AdditionalWorkDetails, setAdditionalWorkDetails] = useState<string>('');
    const [InReceivedBy, setInReceivedBy] = useState<string>('');
    const [InReceivedFrom, setInReceivedFrom] = useState<string>('');
    const [InReceivedTime, setInReceivedTime] = useState<any>('');
    const [OutReceivedBy, setOutReceivedBy] = useState<string>('');
    const [OutReceivedFrom, setOutReceivedFrom] = useState<string>('');
    const [OutReceivedTime, setOutReceivedTime] = useState<string>('');




    interface EstimateRowType {
        work: string;
        price: string;
    }
    const [rows, setRows] = useState<EstimateRowType[]>([]);
    type FormData = {
        CustomerName: string,
        DriverUser: string,
        CellNo: string,
        JobCheckedBy: string,
        WorkType: string,
        Insurance: string,
        RegistrationNumber: string,
        RequiredWorkDetails: string,
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
        In: { VRecievedBy: string, VReceivedFrom: string, Time: string | null },
        Out: { VRecievedBy: string, VReceivedFrom: string, Time: string | null },
    };

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
            RegistrationNumber: '',
            RequiredWorkDetails: '',
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

            {
                !isPreview &&
                <>
                    <Navbar />
                    <div className="flex items-center justify-center ">
                        <h1 className="font-bold text-3xl self-center items-center text-center justify-center mb-10 container">
                            Job Card Creation
                        </h1>
                    </div>
                    <div className="items-center justify-center text-center gap-10 container">
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
                                                        Customer Name
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        <input placeholder="Customer Name" onChange={(value) => {
                                                            setValue('CustomerName', value.target.value);
                                                            setCustomerName(value.target.value);
                                                        }} className="border-none focus:outline-none" />
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        Driver | User
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        <input placeholder="Driver | User" onChange={(value) => {
                                                            setValue('DriverUser', value.target.value);
                                                            setDriverUser(value.target.value);
                                                        }} className="border-none focus:outline-none"></input>
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        Contact Number
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        <input placeholder="Contact Number" onChange={(value) => {
                                                            setValue('CellNo', value.target.value);
                                                            setCellNo(value.target.value);
                                                        }} className="border-none focus:outline-none"></input>
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        Job Checked By
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        <input placeholder="Job Checked By" onChange={(value) => {
                                                            setValue('JobCheckedBy', value.target.value);
                                                            setJobCheckedBy(value.target.value);
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
                                                            setWorkType(value.target.value);
                                                        }} className="border-none focus:outline-none">
                                                            <option value="" disabled selected>Select Work Type</option>
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
                                                            setInsurance(value.target.value);
                                                        }} className="border-none focus:outline-none">
                                                            <option value="" disabled selected>Select an insurance company</option>
                                                            <option value="HABIB BANK LIMITED">HABIB BANK LIMITED</option>
                                                            <option value="TPL Insurance Coampnay">TPL INSURANCE COMPANY</option>
                                                            <option value="IGI GENERAL INSURNACE LIMITED">IGI GENERAL INSURNACE LIMITED </option>
                                                            <option value="SALAAM TAKAFUL INS PAKISTAN LTD">SALAAM TAKAFUL INS PAKISTAN LTD</option>
                                                            <option value="ALFALAH GENERAL INSURNACE COMPANY LTD">ALFALAH GENERAL INSURNACE COMPANY LTD</option>
                                                            <option value="JUBILEE INSURNACE COMPANY">JUBILEE INSURNACE COMPANY</option>
                                                            <option value="ATLAS INSURNACE COMPANY LTD">ATLAS INSURNACE COMPANY LTD</option>
                                                            <option value="ADAMJEE INSURNACE CORP BR KHI">ADAMJEE INSURNACE CORP BR KHI</option>
                                                            <option value="ASKARI GENERAL INSURNACE COMPANY LTD">ASKARI GENERAL INSURNACE COMPANY LTD</option>
                                                            <option value="EFU GENERAL INSURNACE COMPANY LTD">EFU GENERAL INSURNACE COMPANY LTD</option>
                                                            <option value="UBL INSURNACE COMPANY">UBL INSURNACE COMPANY</option>
                                                            <option value="EFU GENERAL INSURNACE COMPANY LTD">EFU GENERAL INSURNACE COMPANY LTD</option>
                                                            <option value="PAK QATAR">PAK QATAR</option>
                                                            <option value="UNITED INS">UNITED INS</option>
                                                            <option value="NONE">NONE</option>

                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        Registration
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        <input placeholder="Registration" onChange={(value) => {
                                                            setValue('RegistrationNumber', value.target.value);
                                                            setRegistrationNumber(value.target.value);
                                                        }} className="border-none focus:outline-none"></input>
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        Battery Number
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        <input placeholder="Battery #" onChange={(value) => {
                                                            setValue('BatteryNumber', value.target.value);
                                                            setBatteryNumber(value.target.value);
                                                        }} className="border-none focus:outline-none"></input>
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        Frame Number
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        <input placeholder="Frame #" onChange={(value) => {
                                                            setValue('FrameNo', value.target.value);
                                                            setFrameNo(value.target.value);
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
                                                        <input placeholder="Fuel" onChange={(value) => {
                                                            setValue('Fuel', value.target.value);
                                                            setFuel(value.target.value);
                                                        }} className="border-none focus:outline-none"></input>
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        Mileage
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        <input placeholder="Mileage" onChange={(value) => {
                                                            setValue('Mileage', value.target.value);
                                                            setMileage(value.target.value);
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
                                                                setLighter(e.target.checked);
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
                                                                setAshtray(e.target.checked);
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
                                                                setFloorMats(e.target.checked);
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
                                                                setOriginalBook(e.target.checked);

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
                                                                setSeatCovers(e.target.checked);

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
                                                                setRadioAntena(e.target.checked);

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
                                                                setSpareWheel(e.target.checked);

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
                                                                setWheelRod(e.target.checked);
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
                                                                setJackHandle(e.target.checked);
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
                                                                setTools(e.target.checked);
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
                                                                setExtraThings(e.target.checked);
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
                                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Required Work Details</label>
                                        <textarea onChange={(e) => {
                                            setValue('RequiredWorkDetails', e.target.value);
                                            setRequiredWorkDetails(e.target.value);
                                        }} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
                                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2">Addtional Work Details (If Required)</label>
                                        <textarea onChange={(e) => {
                                            setValue('OtherAdditionalWork', e.target.value);
                                            setAdditionalWorkDetails(e.target.value);
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
                                                            <input placeholder="Vehicle Received By" onChange={
                                                                (e) => {
                                                                    setValue('In.VRecievedBy', e.target.value);
                                                                    setInReceivedBy(e.target.value);
                                                                }
                                                            } className="border-none focus:outline-none border-b"></input>
                                                            <input placeholder="Vehicle Received From" onChange={
                                                                (e) => {
                                                                    setValue('In.VReceivedFrom', e.target.value);
                                                                    setInReceivedFrom(e.target.value);
                                                                }
                                                            } className="border-none focus:outline-none"></input>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-row text-center justify-center gap-2">
                                                            <Datetime
                                                                initialValue={'Click to set Time'}
                                                                value={inDate}
                                                                onChange={(date) => {
                                                                    setInDate(date);
                                                                    setValue('In.Time', inDate);
                                                                    setInReceivedTime(date?.toString());
                                                                }
                                                                }
                                                                dateFormat="MM/D/YY"
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        Out
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <input placeholder="Vehicle Received By" onChange={
                                                                (e) => {
                                                                    setValue('Out.VRecievedBy', e.target.value);
                                                                    setOutReceivedBy(e.target.value);
                                                                }
                                                            } className="border-none focus:outline-none border-b"></input>
                                                            <input placeholder="Vehicle Received From" onChange={
                                                                (e) => {
                                                                    setValue('Out.VReceivedFrom', e.target.value);
                                                                    setOutReceivedFrom(e.target.value);
                                                                }
                                                            } className="border-none focus:outline-none"></input>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <Datetime
                                                            initialValue={'Click to set Time'}
                                                            className="border-none outline-none focus:border-none focus:outline-none"
                                                            value={outDate}
                                                            onChange={(date) => {
                                                                setInDate(date);
                                                                setValue('Out.Time', outDate);
                                                                setOutReceivedTime(date?.toString());
                                                            }
                                                            }
                                                            dateFormat="MM/D/YY"
                                                            timeFormat="hh:mm A"
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-2 items-center justify-center">
                                    <button type="submit" className="print:hidden relative inline-block px-4 py-2 font-medium group overflow-y-hidden overflow-hidden">
                                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                                        <span className="relative z-10 text-black group-hover:text-white">Submit</span>
                                    </button>
                                    <button onClick={() => {
                                        setIsPreview(!isPreview);

                                    }} type="button" className="print:hidden relative inline-block px-4 py-2 font-medium group overflow-y-hidden overflow-hidden">
                                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                                        <span className="relative z-10 text-black group-hover:text-white">Preview</span>
                                    </button>
                                </div>
                            </form>
                        </div >

                    </div >
                    <Footer />
                </>
            }
            {
                isPreview &&
                <div>
                    <AnotherPrintJobs
                        data={
                            {
                                CustomerName,
                                DriverUser,
                                CellNo,
                                JobCheckedBy,
                                WorkType,
                                Insurance,
                                WorkOrder,
                                CashWorks,
                                RegistrationNumber,
                                RequiredWorkDetails,
                                AdditionalWorkDetails,
                                Fuel,
                                Mileage,
                                Lighter,
                                Ashtray,
                                FloorMats,
                                OriginalBook,
                                SeatCovers,
                                RadioAntena,
                                SpareWheel,
                                WheelRod,
                                JackHandle,
                                Tools,
                                ExtraThings,
                                FrameNo,
                                BatteryNumber,
                                InReceivedBy,
                                InReceivedFrom,
                                InReceivedTime,
                                OutReceivedBy,
                                OutReceivedFrom,
                                OutReceivedTime,
                                isPreview,
                            }
                        }
                    />
                </div>
            }
        </>
    )
}