'use client'
import Footer from "../../Footer";
import Navbar from "../../Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import PrintEstimate from "../printableEstimate/PrintableEstimate";
import { v4 as uuidv4 } from 'uuid';
import TableSummaries from "./Summary";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "@/app/components/ui/loader";


export interface EstimateRowType {
    partNo: string;
    partDesc: string;
    partQty: number;
    partPrice: number;
    partTotalPrice: number;
}
interface EstimateRowObject {
    [key: string]: EstimateRowType;
};

export interface ServicesDetailsType {
    details: string;
    charges: number;
}

interface ServiceRowObject {
    [key: string]: ServicesDetailsType;
}

export interface EstimateForm {
    id: number;
    cName: string;
    jobId: string;
    cMake: string;
    cModel: string;
    EstimateTableData: EstimateRowObject;
    ServicesDetailsTableData: ServiceRowObject;
    DiscountServices: number;
    DiscountEstimate: number;
    TotalServiceFee: number;
    TotalEstimateFee: number;
    cKiloMeters: number;
    CreatedAt: string;
    cRegistration: string;
    PaymentMode: string;
    OverAllAmount: number;
}
export default function PAGE() {
    // Get the current date
    const currentDate = new Date();

    // Extract the year, month, and day
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-based
    const day = currentDate.getDate();

    // Format the date as a string (e.g., "2023-12-23")
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const [cName, setcName] = useState('');

    // Convert this to integer later in the api
    const [jobId, setjobId] = useState('');
    const [cMake, setcMake] = useState('');
    const [ckiloMeters, setcKiloMeters] = useState(0);
    const [cModel, setcModel] = useState('');
    const [cRegistration, setcRegistration] = useState('');
    const [PaymentMode, setPaymentMode] = useState('');

    const [servicesDetailsRows, setServicesDetailsRow] = useState<ServiceRowObject>({})
    const [estimateRows, setEstimateRows] = useState<EstimateRowObject>({});

    const handleAddEstimateRow = () => {
        const obj = { ...estimateRows };
        obj[uuidv4()] = {
            partNo: '',
            partDesc: '',
            partQty: 1,
            partPrice: 0,
            partTotalPrice: 0
        };
        setEstimateRows(obj);

    };

    const handleAddServicesDetailsRow = () => {
        const obj = { ...servicesDetailsRows };
        obj[uuidv4()] = {
            details: '',
            charges: 0,
        };

        setServicesDetailsRow(obj);
    };

    const handleRemoveServicesDetailsRow = (uuidtoRemove: string) => {
        const obj = { ...servicesDetailsRows };
        delete obj[uuidtoRemove];
        setServicesDetailsRow(obj);
    }

    const handleRemoveEstimateRow = (uuidToRemove: string) => {
        const obj = { ...estimateRows };
        delete obj[uuidToRemove];
        setEstimateRows(obj);
    };


    const dynamicWidth = "50%";
    const [isGenerateSummary, setGenerateSummary] = useState(false);
    const handleGenerateSummary = () => {
        setServiceFee(handleServicesTotalPrice(servicesDetailsRows));
        setEstimateFee(handleEstimateTotalPrice(estimateRows));
        setOverAllPrice(handleOverAllBill());
        setGenerateSummary(!isGenerateSummary);
    }

    function handleEstimateTotalPrice(EstimateArray: EstimateRowObject) {
        let totalPrice = 0;
        Object.keys(EstimateArray).map((key, index) => (
            totalPrice = totalPrice + EstimateArray[key].partTotalPrice
        ))

        return totalPrice;
    }

    function handleServicesTotalPrice(EstimateArray: ServiceRowObject) {
        let totalPrice = 0;
        Object.keys(EstimateArray).map((key, index) => (
            totalPrice = totalPrice + EstimateArray[key].charges
        ))

        return totalPrice;
    }


    const [DiscountServices, setDiscountServices] = useState(0);
    const [DiscountEstimate, setDiscountEstimate] = useState(0);

    const [estimateFee, setEstimateFee] = useState(0);
    const [serviceFee, setServiceFee] = useState(0);

    const [overAllPrice, setOverAllPrice] = useState(0);

    function handleDiscountEstimate(totalEstimatePrice: number) {
        if (isNaN(DiscountEstimate))
            setDiscountEstimate(0);

        return (DiscountEstimate / 100) * totalEstimatePrice;
    }

    function handleDiscountServices(totalServicesPrice: number) {
        if (isNaN(DiscountServices))
            setDiscountServices(0);

        return (DiscountServices / 100) * totalServicesPrice;
    }

    function overAllBillEstimate(totalEstimatePrice: number) {
        return totalEstimatePrice - handleDiscountEstimate(totalEstimatePrice);
    }

    function overAllBillServices(totalServicesPrice: number) {
        return totalServicesPrice - handleDiscountServices(totalServicesPrice);
    }

    function handleOverAllBill() {
        return overAllBillEstimate(overAllBillEstimate(handleEstimateTotalPrice(estimateRows))) + overAllBillServices(handleServicesTotalPrice(servicesDetailsRows));
    }



    // @ts-ignore
    const data: EstimateForm = {
        cName: cName,
        jobId: jobId,
        cMake: cMake,
        cModel: cModel,
        EstimateTableData: estimateRows,
        ServicesDetailsTableData: servicesDetailsRows,
        DiscountServices: DiscountServices,
        DiscountEstimate: DiscountEstimate,
        TotalServiceFee: handleServicesTotalPrice(servicesDetailsRows),
        TotalEstimateFee: handleEstimateTotalPrice(estimateRows),
        cKiloMeters: ckiloMeters,
        CreatedAt: formattedDate,
        cRegistration: cRegistration,
        PaymentMode: PaymentMode,
        OverAllAmount: handleOverAllBill(),
    }

    const {
        register,
        handleSubmit,
        setValue,
    } = useForm<EstimateForm>({
        defaultValues: {
            cName: cName,
            jobId: jobId,
            cMake: cMake,
            cModel: cModel,
            EstimateTableData: {},
            ServicesDetailsTableData: {},
            DiscountServices: 0,
            DiscountEstimate: DiscountEstimate,
            TotalServiceFee: 0,
            TotalEstimateFee: 0,
            cKiloMeters: ckiloMeters,
            CreatedAt: formattedDate,
            cRegistration: cRegistration,
            PaymentMode: PaymentMode,
            OverAllAmount: 0,
        }
    })
    const [isPrinting, setIsPrinting] = useState(false);

    const [isLoading, setLoading] = useState(false);
    const onSubmit: SubmitHandler<EstimateForm> = async (data: EstimateForm) => {
        setLoading(true);
        axios.post("../../../api/registerEstimate", data)
            .then(() => {
                toast.success("Estimate Created!")
            })
            .catch((response: any) => {
                let error = response?.response?.data?.Message;
                toast.error(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }
    return (
        <>
            {
                !isPrinting && (
                    <div>
                        <Navbar />
                        <div className="flex-grow w-full container flex flex-col gap-2">
                            <div className="flex justify-center w-full">
                                <h1 className="text-3xl font-bold">Estimate Sheet</h1>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-2 mt-10">
                                <div className="flex flex-row gap-2">
                                    <div className="max-w-sm items-center gap-1.5">
                                        <Label htmlFor="Customer Name">Customer Name</Label>
                                        <div className="flex flex-row w-full">
                                            <div className="">
                                                <Input onChange={(e) => {
                                                    setValue('cName', e.target.value);
                                                    setcName(e.target.value);
                                                }} type="text" id="text" placeholder="Customer Name"
                                                    required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-grow max-w-sm items-center gap-1.5">
                                        <Label htmlFor="Customer Name">Estimate Number</Label>
                                        <Input type="text" id="text" placeholder="Estimate Number" disabled />
                                    </div>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <div className="flex-grow max-w-sm items-center gap-1.5">
                                        <Label htmlFor="Customer Name">Date</Label>
                                        <Input {...register('CreatedAt')} type="text" id="text" placeholder="Date"
                                            value={formattedDate} disabled />
                                    </div>
                                    <div className="flex-grow max-w-sm items-center gap-1.5">
                                        <Label htmlFor="Customer Name">NTN</Label>
                                        <Input type="text" id="text" placeholder="NTN" value={"3268859-8"} disabled />
                                    </div>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <div className="flex-grow max-w-sm items-center gap-1.5">
                                        <Label htmlFor="Customer Name">Make</Label>
                                        <Input onChange={(e) => {
                                            setValue('cMake', e.target.value);
                                            setcMake(e.target.value);
                                        }} type="text" id="text" placeholder="cMake" required />
                                    </div>
                                    <div className="flex-grow max-w-sm items-center gap-1.5">
                                        <Label htmlFor="Customer Name">Model</Label>
                                        <Input onChange={(e) => {
                                            setValue('cModel', e.target.value);
                                            setcModel(e.target.value);
                                        }} type="text" id="text" placeholder="cModel" required />
                                    </div>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <div className="flex-grow max-w-sm items-center gap-1.5">
                                        <Label htmlFor="Customer Name">Vehicle Reg No</Label>
                                        <Input onChange={(e) => {
                                            setValue('cRegistration', e.target.value);
                                            setcRegistration(e.target.value);
                                        }} type="text" id="text" placeholder="Vehicle Reg No"
                                            required />
                                    </div>
                                    <div className="flex-grow max-w-sm items-center gap-1.5">
                                        <Label htmlFor="Customer Name">Job Card Id</Label>
                                        <Input onChange={(e) => {
                                            setValue('jobId', e.target.value);
                                            setjobId(e.target.value);
                                        }} type="number" id="text" placeholder="Job Card ID (If Exist)" />
                                    </div>
                                </div>
                                <div className="flex flex-row gap-2 mt-2">
                                    <div className="w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="Customer Name">KiloMeters</Label>
                                        <Input onChange={(e) => {
                                            setValue('cKiloMeters', parseInt(e.target.value));
                                            setcKiloMeters(parseInt(e.target.value));
                                        }} type="number" id="number" placeholder="Km" required />
                                    </div>
                                    <div className="max-w-sm items-center gap-1.5 w-full flex-col flex">
                                        <Label className="mt-2">Payment Mode</Label>
                                        <select defaultValue={"CHEQUE"} onChange={(value) => {
                                            setValue('PaymentMode', value.target.value);
                                            setPaymentMode(value.target.value);
                                        }} className="border-none focus:outline-none mt-1" required>
                                            <option value="CHEQUE">CHEQUE</option>
                                            <option value="CASH">CASH</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={"mt-32 h-full w-full flex flex-col gap-4"}>
                                    <div>
                                        {/* @ts-ignore */}
                                        <Label className={"mb-2 font-bold flex justify-center"}>Estimated Cost Work</Label>
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <thead
                                                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">
                                                        Serial No
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Part No
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Part Desc
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Part Price
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Qty
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    Object.keys(estimateRows).map((key, index) => (
                                                        <tr key={key}
                                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                            <th scope="row"
                                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {index + 1}
                                                            </th>
                                                            <td className="px-6 py-4">
                                                                <input onChange={(e) => {
                                                                    const updatedRows = { ...estimateRows };
                                                                    updatedRows[key].partNo = e.target.value;
                                                                    setEstimateRows(updatedRows);
                                                                    setValue('EstimateTableData', updatedRows);
                                                                }}
                                                                    className={"border-none outline-none"} />
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <input onChange={(e) => {
                                                                    const updatedRows = { ...estimateRows };
                                                                    updatedRows[key].partDesc = e.target.value;
                                                                    setEstimateRows(updatedRows);
                                                                    setValue('EstimateTableData', updatedRows);
                                                                }}
                                                                    className={"border-none outline-none"} required />
                                                            </td>
                                                            <td className={"px-6 py-4"}>
                                                                <input type={"number"} onChange={(e) => {
                                                                    const updatedRows = { ...estimateRows };
                                                                    updatedRows[key].partPrice = parseInt(e.target.value);
                                                                    updatedRows[key].partTotalPrice = (updatedRows[key].partPrice) * (updatedRows[key].partQty);
                                                                    setEstimateRows(updatedRows);
                                                                    setValue('EstimateTableData', updatedRows);
                                                                }} className={"border-none outline-none"}
                                                                    style={{ width: dynamicWidth }} required /> Rs
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <input type={"number"} onChange={(e) => {

                                                                    const updatedRows = { ...estimateRows }
                                                                    updatedRows[key].partQty = parseInt(e.target.value);
                                                                    updatedRows[key].partTotalPrice = (updatedRows[key].partPrice) * (updatedRows[key].partQty);
                                                                    setEstimateRows(updatedRows);
                                                                    setValue('EstimateTableData', updatedRows);

                                                                }} className={"border-none outline-none w-[56px]"}
                                                                    defaultValue={estimateRows[key].partQty} />
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className={"gap-2 flex"}>
                                                                    <button type={"button"}
                                                                        onClick={() => handleRemoveEstimateRow(key)}
                                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>

                                        <div className={"flex flex-row gap-2"}>
                                            <Button type={"button"} className={"mt-2 w-2/6"} onChange={(e) => e.preventDefault()}
                                                onClick={() => handleAddEstimateRow()}>Add Row</Button>
                                            <Input type="number" placeholder={"Parts Discount %"}
                                                onChange={(e) => {
                                                    setDiscountEstimate(parseFloat(e.target.value));
                                                    setValue('DiscountEstimate', parseInt(e.target.value));
                                                }}
                                                className={"mt-2 flex justify-end ml-auto w-[2/6]"} />
                                        </div>
                                    </div>
                                    <div>
                                        <Label className={"mb-2 font-bold flex justify-center"}>Services Details and Charges</Label>
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <thead
                                                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">
                                                        Serial No
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Services
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Charges
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    Object.keys(servicesDetailsRows).map((key, index) => (
                                                        <tr key={index}
                                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                            <th scope="row"
                                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {index + 1}
                                                            </th>
                                                            <td className="px-6 py-4">
                                                                <input
                                                                    onChange={(e) => {
                                                                        servicesDetailsRows[key].details = e.target.value;
                                                                        const updatedRows = { ...servicesDetailsRows }
                                                                        setServicesDetailsRow(updatedRows);
                                                                        setValue('ServicesDetailsTableData', updatedRows);
                                                                    }}
                                                                    className={"border-none outline-none w-full"} />
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <input type="number"
                                                                    onChange={(e) => {
                                                                        const updatedRows = { ...servicesDetailsRows }
                                                                        servicesDetailsRows[key].charges = parseInt(e.target.value)
                                                                        setServicesDetailsRow(updatedRows);
                                                                        setValue('ServicesDetailsTableData', updatedRows);
                                                                    }}
                                                                    className={"border-none outline-none w-full"} />
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className={"gap-2 flex"}>
                                                                    <button type={"button"}
                                                                        onClick={() => handleRemoveServicesDetailsRow(key)}
                                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                        <div className={"gap-2 flex flex-row"}>
                                            <Button type={"button"} className={"mt-2 w-1/6"} onChange={(e) => e.preventDefault()}
                                                onClick={() => handleAddServicesDetailsRow()}>Add Row</Button>
                                            <Button type={"button"} onClick={() => {
                                                handleGenerateSummary();
                                                let completeAmount = overAllBillEstimate(handleEstimateTotalPrice(estimateRows)) + overAllBillServices(handleServicesTotalPrice(servicesDetailsRows));
                                                setValue(('TotalEstimateFee'), overAllBillEstimate(handleEstimateTotalPrice(estimateRows)));
                                                setValue(('TotalServiceFee'), overAllBillServices(handleServicesTotalPrice(servicesDetailsRows)));

                                                console.log(DiscountEstimate, DiscountServices)
                                                setValue('OverAllAmount', completeAmount);
                                            }} className={"mt-2 w-1/6"}
                                                onChange={(e) => e.preventDefault()}>
                                                Generate Summary
                                            </Button>
                                            <Input onChange={(e) => {
                                                setDiscountServices(parseInt(e.target.value));
                                                setValue('DiscountServices', parseInt(e.target.value));
                                            }}
                                                className={"mt-2 flex w-1/6 ml-auto"} type="number" placeholder={"Discount Services %"} />
                                        </div>
                                    </div>
                                    {
                                        isGenerateSummary &&
                                        (
                                            <TableSummaries data={data} />
                                        )
                                    }
                                    <div className={"flex flex-row mt-2 gap-2"}>
                                        <Button disabled={isLoading || !isGenerateSummary} className="flex gap-1">
                                            Submit

                                            <Loader isLoading={isLoading} />
                                        </Button>
                                        <Button onClick={() => setIsPrinting(true)} variant={"outline"} type={"button"}>
                                            Preview
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <Footer />
                    </div>
                )
            }
            {
                isPrinting &&
                <div>
                    <PrintEstimate data={data} />
                    <div className="flex flex-row mt-2 justify-center gap-2 print:hidden">
                        <Button className="print:hidden" type="button" onClick={() => setIsPrinting(false)}>Close</Button>
                        <Button className="print:hidden" type="button" onClick={() => {
                            setIsPrinting(false);
                            window.print();
                        }}>Print</Button>
                    </div>
                </div>
            }

        </>
    )
}