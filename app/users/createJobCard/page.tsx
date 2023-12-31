'use client'
import Footer from "../Footer";
import Navbar from "../Navbar";
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import axios, { AxiosError, AxiosResponse } from "axios";
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import AnotherPrintJobs from "@/app/users/jobCards/printable/jobprintable";
import PlusIcon from "@/app/components/ui/plusicon";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/app/components/ui/loader";
import { v4 as uuidv4 } from 'uuid';
import { format } from "date-fns"
import { Calendar as CalendarIcon, Frame } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { duration } from "moment";

export type JOBFormData = {
    SerialNo?: number,
    CustomerName: string,
    DriverUser: string,
    CellNo: string,
    Make: string,
    Model: string,
    JobCheckedBy: string,
    WorkType: string,
    Insurance: string,
    Status: string,
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
    InReceivedBy: string,
    InReceivedFrom: string,
    InTime: string,
    OutReceivedBy: string,
    OutReceivedFrom: string,
    OutTime: string,
    surelyCreate?: boolean;
};

export type InsuranceCompaniesData = {
    name: string;
}

export default function Page() {
    // Date Time Selection
    const [allInsurances, setAllInsurances] = useState<InsuranceCompaniesData[]>();
    const getAllInsurances = async () => {
        try {
            const response = await axios.get('/api/getAllInsurance');
            setAllInsurances(response?.data?.Message);
        } catch (error: any) {
            console.log('Error Fetching Data', error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getAllInsurances();
            } catch (error) {
                console.error('Error fetching serial number:', error);
            }
        };

        fetchData();

        return () => {
        };
    }, [])
    const [inDate, setInDate] = React.useState<Date>()
    const [outDate, setOutDate] = React.useState<Date>();
    const [isPreview, setIsPreview] = useState(false);
    const [isCheckAll, setCheckAll] = useState(false);



    // To transfer all the fields inside jobprintable
    const [CustomerName, setCustomerName] = useState<string>('');
    const [DriverUser, setDriverUser] = useState<string>('');
    const [CellNo, setCellNo] = useState<string>('');
    const [JobCheckedBy, setJobCheckedBy] = useState<string>('');
    const [WorkType, setWorkType] = useState<string>('');
    const [Insurance, setInsurance] = useState<string>('');
    const [Make, setMake] = useState('');
    const [Model, setModel] = useState('');
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
    const [InReceivedBy, setInReceivedBy] = useState<string>('');
    const [InReceivedFrom, setInReceivedFrom] = useState<string>('');
    const [OutReceivedBy, setOutReceivedBy] = useState<string>('');
    const [OutReceivedFrom, setOutReceivedFrom] = useState<string>('');
    const [Status, setStatus] = useState('');
    const [surelyCreate, setSurelyCreate] = useState(false);


    const [isLoading, setLoading] = useState(false);
    const [isAddInsuranceLoading, setIsAddInsuranceLoading] = useState(false);

    const {
        handleSubmit,
        setValue,
    } = useForm<InsuranceCompaniesData>({
        defaultValues: {
            name: ''
        }
    })

    const {
        handleSubmit: handleSubmitJobFormData,
        setValue: setValueJobFormData,
    } = useForm<JOBFormData>({
        defaultValues: {
            CustomerName: '',
            DriverUser: '',
            CellNo: '',
            JobCheckedBy: '',
            WorkType: '',
            Make: '',
            Model: '',
            Insurance: '',
            Status: '',
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
            InReceivedBy: '',
            InReceivedFrom: '',
            InTime: '',
            OutReceivedBy: '',
            OutReceivedFrom: '',
            OutTime: '',
            surelyCreate: surelyCreate,
        },
    });


    const onSubmit: SubmitHandler<JOBFormData> = async (data: JOBFormData) => {
        setLoading(true);
        axios.post('../../api/jobcard', data)
            .then((response: AxiosResponse) => {
                if (response?.status === 203) {
                    toast((t) => (
                        <span className="text-sm font-bold flex flex-col gap-2">
                            {response?.data?.Message}
                            <div className="w-full flex items-center gap-1 justify-center">
                                <Button variant={"destructive"} onClick={() => toast.dismiss(t.id)}>
                                    Dismiss
                                </Button>
                                <Button className="bg-green-500" variant={"default"} onClick={() => {
                                    toast.dismiss(t.id);
                                    setSurelyCreate(true);
                                    setValueJobFormData('surelyCreate', true);
                                    toast.success('Click on Submit Button To Surely Create');
                                }}>
                                    Create
                                </Button>
                            </div>
                        </span>
                    ))
                }

                if (response?.status === 200) {
                    toast.success(response?.data?.Message)
                }
            })
            .catch((error) => {
                toast.error(error?.response?.data?.Message);
            })
            .finally(() => {
                setLoading(false);
                setSurelyCreate(false);
                setValueJobFormData('surelyCreate', false);
            });
    }

    const onSubmitAddInsurance: SubmitHandler<InsuranceCompaniesData> = async (data: InsuranceCompaniesData) => {
        setIsAddInsuranceLoading(true);
        axios.post('../../api/addInsurance', data)
            .then(() => {
                toast.success('Insurance Company Added');
            })
            .catch((error: AxiosError) => {
                // @ts-ignore
                toast.error(error.response?.data?.Message);
            })
            .finally(() => {
                setIsAddInsuranceLoading(false);
            })
    }


    return (
        <>

            {
                !isPreview &&
                <>
                    <Navbar />
                    <form id="form2" onSubmit={handleSubmit(onSubmitAddInsurance)}></form>
                    <div className="flex items-center justify-center ">
                        <h1 className="font-bold text-3xl self-center items-center text-center justify-center mb-10 container">
                            Job Card Creation
                        </h1>
                    </div>
                    <div className="items-center justify-center text-center gap-10 container">
                        <div className="overflow-x-auto flex items-center justfiy-center">
                            <form onSubmit={handleSubmitJobFormData(onSubmit)} className="flex flex-col w-full gap-2">
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
                                                            setValueJobFormData('CustomerName', value.target.value);
                                                            setCustomerName(value.target.value);
                                                        }} defaultValue={CustomerName} className="border-none focus:outline-none" required />
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        Driver | User
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        <input placeholder="Driver | User" onChange={(value) => {
                                                            setValueJobFormData('DriverUser', value.target.value);
                                                            setDriverUser(value.target.value);
                                                        }} defaultValue={DriverUser} className="border-none focus:outline-none" required></input>
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        Contact Number
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        <input placeholder="Contact Number" onChange={(value) => {
                                                            setValueJobFormData('CellNo', value.target.value);
                                                            setCellNo(value.target.value);
                                                        }} defaultValue={CellNo} className="border-none focus:outline-none" required></input>
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        Job Checked By
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        <input placeholder="Job Checked By" onChange={(value) => {
                                                            setValueJobFormData('JobCheckedBy', value.target.value);
                                                            setJobCheckedBy(value.target.value);
                                                        }} defaultValue={JobCheckedBy} className="border-none focus:outline-none" required></input>
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
                                                            setValueJobFormData('WorkType', value.target.value);
                                                            setWorkType(value.target.value);
                                                        }} className="border-none focus:outline-none" required>
                                                            <option defaultValue={"None Selected"} disabled>Select Work Type</option>
                                                            <option value="INSURANCE">INSURANCE</option>
                                                            <option value="WORK ORDER">WORK ORDER</option>
                                                            <option value="CASH WORK">CASH WORK</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        Insurance
                                                    </th>
                                                    <td className="px-6 py-4 flex flex-row gap-3">
                                                        <select onChange={(value) => {
                                                            setValueJobFormData('Insurance', value.target.value);
                                                            setInsurance(value.target.value);
                                                        }} className="border-none focus:outline-none">
                                                            <option key={uuidv4()} disabled>Select an Insurance Company</option>
                                                            {
                                                                allInsurances?.map((item, index) => (
                                                                    <option value={item.name}>{item.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                        <Drawer>
                                                            <DrawerTrigger>
                                                                <PlusIcon />
                                                            </DrawerTrigger>
                                                            <DrawerContent>
                                                                <DrawerHeader className="flex items-center flex-col gap-2">
                                                                    <DrawerTitle className="justify-center flex">Add Insurance Company?</DrawerTitle>
                                                                    <DrawerDescription className="justify-center flex">
                                                                        <Input required form="form2" placeholder="Company Name" onChange={(e) => setValue('name', e.target.value)} />
                                                                    </DrawerDescription>
                                                                </DrawerHeader>
                                                                <DrawerFooter className="flex justify-center items-center">
                                                                    <Button className="w-20 flex flex-row gap-1" type="submit" form="form2">
                                                                        Add
                                                                        <Loader isLoading={isAddInsuranceLoading} />
                                                                    </Button>
                                                                    <DrawerClose>
                                                                        <Button type="button" className="w-20" variant="outline">Close</Button>
                                                                    </DrawerClose>
                                                                </DrawerFooter>

                                                            </DrawerContent>
                                                        </Drawer>

                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        Status
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        <select onChange={(value) => {
                                                            setValueJobFormData('Status', value.target.value);
                                                            setStatus(value.target.value);
                                                        }} className="border-none focus:outline-none">
                                                            <option disabled defaultValue={"None Selected"}>Select Status</option>
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
                                                        <input placeholder="Make" onChange={(value) => {
                                                            setValueJobFormData('Make', value.target.value);
                                                            setMake(value.target.value);
                                                        }} defaultValue={Make} className="border-none focus:outline-none" type="text" required></input>
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        Model
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        <input placeholder="Model" onChange={(value) => {
                                                            setValueJobFormData('Model', value.target.value);
                                                            setModel(value.target.value);
                                                        }} defaultValue={Model} className="border-none focus:outline-none" type="text" required></input>
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        Registration
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        <input placeholder="Registration" onChange={(value) => {
                                                            setValueJobFormData('RegistrationNumber', value.target.value);
                                                            setRegistrationNumber(value.target.value);
                                                        }} defaultValue={RegistrationNumber} className="border-none focus:outline-none" type="text" required></input>
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        Battery Number
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        <input placeholder="Battery #" onChange={(value) => {
                                                            setValueJobFormData('BatteryNumber', value.target.value);
                                                            setBatteryNumber(value.target.value);
                                                        }} defaultValue={BatteryNumber} className="border-none focus:outline-none" type="text" required></input>
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        Frame Number
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        <input placeholder="Frame #" onChange={(value) => {
                                                            setValueJobFormData('FrameNo', value.target.value);
                                                            setFrameNo(value.target.value);
                                                        }} defaultValue={FrameNo} className="border-none focus:outline-none" type="text" required></input>
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
                                                            setValueJobFormData('Fuel', value.target.value);
                                                            setFuel(value.target.value);
                                                        }} defaultValue={Fuel} className="border-none focus:outline-none" type="number" required></input>
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        Mileage
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        <input placeholder="Mileage" onChange={(value) => {
                                                            setValueJobFormData('Mileage', value.target.value);
                                                            setMileage(value.target.value);
                                                        }} defaultValue={Mileage} className="border-none focus:outline-none" type="number" required></input>
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        Check All
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        <input onChange={
                                                            (e) => {
                                                                setCheckAll(e.target.checked);
                                                                setLighter(e.target.checked);
                                                                setAshtray(e.target.checked);
                                                                setFloorMats(e.target.checked);
                                                                setOriginalBook(e.target.checked);
                                                                setSeatCovers(e.target.checked);
                                                                setRadioAntena(e.target.checked);
                                                                setSpareWheel(e.target.checked);
                                                                setWheelRod(e.target.checked);
                                                                setJackHandle(e.target.checked);
                                                                setTools(e.target.checked);
                                                                setExtraThings(e.target.checked);
                                                                setValueJobFormData('Lighter', e.target.checked);
                                                                setValueJobFormData('Ashtray', e.target.checked);
                                                                setValueJobFormData('FloorMats', e.target.checked);
                                                                setValueJobFormData('OriginalBook', e.target.checked);
                                                                setValueJobFormData('SeatCovers', e.target.checked);
                                                                setValueJobFormData('RadioAntena', e.target.checked);
                                                                setValueJobFormData('SpareWheel', e.target.checked);
                                                                setValueJobFormData('WheelRod', e.target.checked);
                                                                setValueJobFormData('JackHandle', e.target.checked);
                                                                setValueJobFormData('Tools', e.target.checked);
                                                                setValueJobFormData('ExtraThings', e.target.checked);
                                                            }
                                                        } defaultChecked={isCheckAll} id="default-checkbox" type="checkbox" checked={isCheckAll ? true : false} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        Lighter
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        <input onChange={
                                                            (e) => {
                                                                setValueJobFormData('Lighter', e.target.checked);
                                                                setLighter(e.target.checked);
                                                            }
                                                        } defaultChecked={Lighter} id="default-checkbox" type="checkbox" checked={isCheckAll || Lighter ? true : false} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                                                                setValueJobFormData('Ashtray', e.target.checked);
                                                                setAshtray(e.target.checked);
                                                            }
                                                        } defaultChecked={Ashtray} id="default-checkbox" type="checkbox" checked={isCheckAll || Ashtray ? true : false} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                                                                setValueJobFormData('FloorMats', e.target.checked);
                                                                setFloorMats(e.target.checked);
                                                            }
                                                        } defaultChecked={FloorMats} id="default-checkbox" type="checkbox" checked={isCheckAll || FloorMats ? true : false} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                                                                setValueJobFormData('OriginalBook', e.target.checked);
                                                                setOriginalBook(e.target.checked);

                                                            }
                                                        } defaultChecked={OriginalBook} id="default-checkbox" type="checkbox" checked={isCheckAll || OriginalBook ? true : false} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                                                                setValueJobFormData('SeatCovers', e.target.checked);
                                                                setSeatCovers(e.target.checked);

                                                            }
                                                        } defaultChecked={SeatCovers} id="default-checkbox" type="checkbox" checked={isCheckAll || SeatCovers ? true : false} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                                                                setValueJobFormData('RadioAntena', e.target.checked);
                                                                setRadioAntena(e.target.checked);

                                                            }
                                                        } defaultChecked={RadioAntena} id="default-checkbox" type="checkbox" checked={isCheckAll || RadioAntena ? true : false} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                                                                setValueJobFormData('SpareWheel', e.target.checked);
                                                                setSpareWheel(e.target.checked);

                                                            }
                                                        } defaultChecked={SpareWheel} id="default-checkbox" type="checkbox" checked={isCheckAll || SpareWheel ? true : false} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                                                                setValueJobFormData('WheelRod', e.target.checked);
                                                                setWheelRod(e.target.checked);
                                                            }
                                                        } defaultChecked={WheelRod} id="default-checkbox" type="checkbox" checked={isCheckAll || WheelRod ? true : false} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                                                                setValueJobFormData('JackHandle', e.target.checked);
                                                                setJackHandle(e.target.checked);
                                                            }
                                                        } defaultChecked={JackHandle} id="default-checkbox" type="checkbox" checked={isCheckAll || JackHandle ? true : false} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                                                                setValueJobFormData('Tools', e.target.checked);
                                                                setTools(e.target.checked);
                                                            }
                                                        } defaultChecked={Tools} id="default-checkbox" type="checkbox" checked={isCheckAll || Tools ? true : false} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                                                                setValueJobFormData('ExtraThings', e.target.checked);
                                                                setExtraThings(e.target.checked);
                                                            }
                                                        } defaultChecked={ExtraThings} id="default-checkbox" type="checkbox" checked={isCheckAll || ExtraThings ? true : false} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
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
                                            setValueJobFormData('RequiredWorkDetails', e.target.value);
                                            setRequiredWorkDetails(e.target.value);
                                        }} defaultValue={RequiredWorkDetails} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
                                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2">Addtional Work Details (If Required)</label>
                                        <textarea onChange={(e) => {
                                            setValueJobFormData('OtherAdditionalWork', e.target.value);
                                            setOtherAdditionalWork(e.target.value);
                                        }} defaultValue={OtherAdditionalWork} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
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
                                                                    setValueJobFormData('InReceivedBy', e.target.value);
                                                                    setInReceivedBy(e.target.value);
                                                                }
                                                            } defaultValue={InReceivedBy} className="border-none focus:outline-none border-b"></input>
                                                            <input placeholder="Vehicle Received From" onChange={
                                                                (e) => {
                                                                    setValueJobFormData('InReceivedFrom', e.target.value);
                                                                    setInReceivedFrom(e.target.value);
                                                                }
                                                            } defaultValue={InReceivedFrom} className="border-none focus:outline-none" required></input>
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
                                                                        {inDate ? format(inDate, "yyyy-MM-dd") : <span>Pick a date</span>}
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent>
                                                                    <Calendar
                                                                        mode="single"
                                                                        selected={inDate}
                                                                        onSelect={setInDate}
                                                                        onDayClick={(date) => {
                                                                            setValueJobFormData('InTime', date ? date?.toLocaleDateString() : '')
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
                                                            <input placeholder="Vehicle Received By" onChange={
                                                                (e) => {
                                                                    setValueJobFormData('OutReceivedBy', e.target.value);
                                                                    setOutReceivedBy(e.target.value);
                                                                }
                                                            } defaultValue={OutReceivedBy} className="border-none focus:outline-none border-b"></input>
                                                            <input placeholder="Vehicle Received From" onChange={
                                                                (e) => {
                                                                    setValueJobFormData('OutReceivedFrom', e.target.value);
                                                                    setOutReceivedFrom(e.target.value);
                                                                }
                                                            } defaultValue={OutReceivedFrom} className="border-none focus:outline-none" required></input>
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
                                                                    {outDate ? format(outDate, "yyyy-MM-dd") : <span>Pick a date</span>}
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent>
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={outDate}
                                                                    onSelect={setOutDate}
                                                                    onDayClick={(date) => {
                                                                        setValueJobFormData('OutTime', date ? date?.toLocaleDateString() : '')
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
                                <div className="flex flex-row gap-2 items-center justify-center">
                                    <Button className="w-1/6 flex flex-row gap-1" disabled={isLoading} type="submit">
                                        Submit <Loader isLoading={isLoading} />
                                    </Button>
                                    <Button variant={"secondary"} onClick={() => setIsPreview(!isPreview)}>Preview</Button>
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
                                Status,
                                OtherAdditionalWork,
                                RegistrationNumber,
                                RequiredWorkDetails,
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
                                inDate,
                                Make,
                                Model,
                                OutReceivedBy,
                                OutReceivedFrom,
                                outDate,
                                isPreview,
                            }
                        }

                        onClose={() => setIsPreview(false)}
                    />
                </div>
            }
        </>
    )
}