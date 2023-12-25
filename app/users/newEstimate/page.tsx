'use client'
import Footer from "../Footer";
import Navbar from "../Navbar";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import React, {useState} from "react";
import {Button} from "@/app/components/ui/button";

export interface TableDataProp {
    PartNo: string,
    PartDesc: string,
    PartQty: string,
    PartPrice: string
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


    interface EstimateRowType {
        partNo: string;
        partDesc: string;
        partQty: number;
        partPrice: number;
        partTotalPrice: number;
    }

    interface ServicesDetailsType {
        details: string;
        charges: number;
    }

    interface EstimateForm {
        customerName: string;
        make: string;
        model: string;
        EstimateTableData: EstimateRowType[];
        ServicesDetailsTableData: ServicesDetailsType[];
        ServicesDiscount: number;
        EstimateDiscount: number;
    }

    const [servicesDetailsRows, setServicesDetailsRow] = useState<ServicesDetailsType[]>([
        {
            details: '',
            charges: 0,
        },
        {
            details: '',
            charges: 0,
        }
    ])
    // Array of rows
    const [estimateRows, setEstimateRows] = useState<EstimateRowType[]>([
        {
            partPrice: 0,
            partNo: '',
            partQty: 1,
            partDesc: '',
            partTotalPrice: 0,
        },
        {
            partPrice: 0,
            partNo: '',
            partQty: 1,
            partDesc: '',
            partTotalPrice: 0,
        },
    ]);
    const handleAddEstimateRow = () => {
        setEstimateRows(rows => [...rows, {
            partNo: '',
            partDesc: '',
            partQty: 1,
            partPrice: 0,
            partTotalPrice: 0
        }]);
    };

    const handleAddServicesDetailsRow = () => {
        setServicesDetailsRow(rows => [...rows, {
            details: '',
            charges: 0
        }]);
    };

    const handleRemoveServicesDetailsRow = (indexToRemove: number) => {
        setServicesDetailsRow(prevRows => prevRows.filter((_, index) => index !== indexToRemove));
    }

    const handleRemoveEstimateRow = (indexToRemove: any) => {
        setEstimateRows(prevRows => prevRows.filter((_, index) => index !== indexToRemove));
    };


    const dynamicWidth = "50%";
    const [isGenerateSummary, setGenerateSummary] = useState(false);
    const handleGenerateSummary = () => {
        setGenerateSummary(!isGenerateSummary);
    }

    function handleEstimateTotalPrice(EstimateArray: EstimateRowType[]) {
        let totalPrice = 0;
        EstimateArray.map((item, index) => (
            totalPrice = totalPrice + item?.partTotalPrice
        ))

        return totalPrice;
    }

    function handleServicesTotalPrice(EstimateArray: ServicesDetailsType[]) {
        let totalPrice = 0;
        EstimateArray.map((item, index) => (
            totalPrice = totalPrice + item?.charges
        ))

        return totalPrice;
    }

    const [servicesDiscount, setServicesDiscount] = useState(0);
    const [estimateDiscount, setEstimateDiscount] = useState(0);

    function handleEstimateDiscount(totalEstimatePrice: number) {
        return (estimateDiscount / 100) * totalEstimatePrice;
    }

    function handleServicesDiscount(totalServicesPrice: number) {
        return (servicesDiscount / 100) * totalServicesPrice;
    }

    return (
        <>
            <Navbar/>
            <div className="flex-grow w-full container flex flex-col gap-2">
                <div className="flex justify-center w-full">
                    <h1 className="text-3xl font-bold">Estimate Sheet</h1>
                </div>
                <form className="flex flex-col items-center justify-center gap-2 mt-10">
                    <div className="flex flex-row gap-2">
                        <div className="flex-grow max-w-sm items-center gap-1.5">
                            <Label htmlFor="Customer Name">Customer Name</Label>
                            <Input type="text" id="text" placeholder="Customer Name" required/>
                        </div>
                        <div className="flex-grow max-w-sm items-center gap-1.5">
                            <Label htmlFor="Customer Name">Estimate Number</Label>
                            <Input type="text" id="text" placeholder="Estimate Number" disabled/>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <div className="flex-grow max-w-sm items-center gap-1.5">
                            <Label htmlFor="Customer Name">Date</Label>
                            <Input type="text" id="text" placeholder="Date" value={formattedDate} disabled/>
                        </div>
                        <div className="flex-grow max-w-sm items-center gap-1.5">
                            <Label htmlFor="Customer Name">NTN</Label>
                            <Input type="text" id="text" placeholder="NTN" value={"3268859-8"} disabled/>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <div className="flex-grow max-w-sm items-center gap-1.5">
                            <Label htmlFor="Customer Name">Make</Label>
                            <Input type="text" id="text" placeholder="Make" required/>
                        </div>
                        <div className="flex-grow max-w-sm items-center gap-1.5">
                            <Label htmlFor="Customer Name">Model</Label>
                            <Input type="text" id="text" placeholder="Model" required/>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <div className="flex-grow max-w-sm items-center gap-1.5">
                            <Label htmlFor="Customer Name">Vehicle Reg No</Label>
                            <Input type="text" id="text" placeholder="Vehicle Reg No" required/>
                        </div>
                        <div className="flex-grow max-w-sm items-center gap-1.5">
                            <Label htmlFor="Customer Name">Job Card Id</Label>
                            <Input type="text" id="text" placeholder="Job Card ID (If Exist)"/>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 mt-2">
                        <div className="w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="Customer Name">KiloMeters</Label>
                            <Input type="text" id="text" placeholder="Km"/>
                        </div>
                        <div className="max-w-sm items-center gap-1.5 w-full">
                            <Select required>
                                <Label>Payment Mode</Label>
                                <SelectTrigger>
                                    <SelectValue placeholder="Payment Mode"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Cheque</SelectItem>
                                    <SelectItem value="dark">Cash</SelectItem>
                                </SelectContent>
                            </Select>
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
                                    estimateRows.map((item, index) => (
                                        <tr key={index}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {index + 1}
                                            </th>
                                            <td className="px-6 py-4">
                                                <input onChange={(e) => estimateRows[index].partNo = e.target.value}
                                                       className={"border-none outline-none"}/>
                                            </td>
                                            <td className="px-6 py-4">
                                                <input onChange={(e) => estimateRows[index].partDesc = e.target.value}
                                                       className={"border-none outline-none"}/>
                                            </td>
                                            <td className={"px-6 py-4"}>
                                                <input type={"number"} onChange={(e) => {
                                                    estimateRows[index].partPrice = parseInt(e.target.value);
                                                    estimateRows[index].partTotalPrice = (estimateRows[index].partPrice) * (estimateRows[index].partQty);
                                                    console.log(estimateRows);
                                                }} className={"border-none outline-none"}
                                                       style={{width: dynamicWidth}}/> Rs
                                            </td>
                                            <td className="px-6 py-4">
                                                <input type={"number"} onChange={(e) => {
                                                    estimateRows[index].partQty = parseInt(e.target.value);
                                                    estimateRows[index].partTotalPrice = (estimateRows[index].partPrice) * (estimateRows[index].partQty);
                                                    console.log(estimateRows);

                                                }} className={"border-none outline-none w-[56px]"}
                                                       defaultValue={item.partQty}/>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className={"gap-2 flex"}>
                                                    <button type={"button"}
                                                            onClick={() => handleRemoveEstimateRow(index)}
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
                                <Input placeholder={"Parts Discount %"}
                                       onChange={(e) => setEstimateDiscount(parseFloat(e.target.value))}
                                       className={"mt-2 flex justify-end ml-auto w-[2/6]"}/>
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
                                    servicesDetailsRows.map((item, index) => (
                                        <tr key={index}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {index + 1}
                                            </th>
                                            <td className="px-6 py-4">
                                                <input
                                                    onChange={(e) => servicesDetailsRows[index].details = e.target.value}
                                                    className={"border-none outline-none w-full"}/>
                                            </td>
                                            <td className="px-6 py-4">
                                                <input
                                                    onChange={(e) => servicesDetailsRows[index].charges = parseInt(e.target.value)}
                                                    className={"border-none outline-none w-full"}/>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className={"gap-2 flex"}>
                                                    <button type={"button"}
                                                            onClick={() => handleRemoveServicesDetailsRow(index)}
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
                                <Button type={"button"} onClick={() => handleGenerateSummary()} className={"mt-2 w-1/6"}
                                        onChange={(e) => e.preventDefault()}>
                                    Generate Summary
                                </Button>
                                <Input onChange={(e) => setServicesDiscount(parseFloat(e.target.value))}
                                       className={"mt-2 flex w-1/6 ml-auto"} placeholder={"Discount Services %"}/>
                            </div>
                        </div>
                        {
                            isGenerateSummary &&
                            (
                                <div className={"flex flex-col"}>
                                    <div className={"mt-10 flex w-full justify-center flex-col"}>
                                        <Label className={"w-full items-center flex justify-center mb-2"}>Estimate
                                            Summary</Label>
                                        <table
                                            className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                                                    Total Price
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                estimateRows.map((item, index) => (
                                                    <tr key={index}
                                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                        <th scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {index + 1}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            {item?.partNo}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {item?.partDesc}
                                                        </td>
                                                        <td className={"px-6 py-4"}>
                                                            {item?.partPrice.toLocaleString()} Rs
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {item?.partQty}
                                                        </td>
                                                        <td className={"px-6 py-4"}>
                                                            {item?.partTotalPrice.toLocaleString()} Rs
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className={"mt-2 flex justify-end flex-col gap-2"}>
                                            <Label className={"flex justify-end"}>
                                                Parts
                                                Total: {handleEstimateTotalPrice(estimateRows).toLocaleString()} Rs
                                            </Label>
                                            <Label className={"flex justify-end"}>
                                                Discount: {handleEstimateDiscount(handleEstimateTotalPrice(estimateRows)).toLocaleString()} Rs
                                            </Label>
                                        </div>
                                    </div>
                                    <div>
                                        <Label className={"w-full items-center flex justify-center mb-2"}>Services
                                            Summary</Label>
                                        <table
                                            className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                servicesDetailsRows.map((item, index) => (
                                                    <tr key={index}
                                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                        <th scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {index + 1}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            {item?.details}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {item?.charges.toLocaleString()} Rs
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className={"mt-2 flex justify-end flex-col gap-2"}>
                                            <Label className={"mt-2 flex justify-end"}>
                                                Services
                                                Total: {handleServicesTotalPrice(servicesDetailsRows).toLocaleString()} Rs
                                            </Label>
                                            <Label className={"mt-2 flex justify-end"}>
                                                Discount: {handleServicesDiscount(handleServicesTotalPrice(servicesDetailsRows)).toLocaleString()} Rs
                                            </Label>
                                        </div>

                                        <div className={"mt-16 flex justify-center items-end flex-col gap-2"}>
                                            <div className={"absolute w-auto"}>
                                                <hr className={"border-t-1 border-black flex w-auto"}/>
                                                <Label className={"mt-2 flex justify-center mb-2 font-bold"}>
                                                    Overall Summary
                                                </Label>
                                                <hr className={"border-t-1 border-black flex"}/>
                                                <div className={"mt-2 flex flex-col gap-1"}>
                                                    <Label className={"flex flex-row gap-1"}>
                                                        <p className={"font-bold"}>
                                                            Cost of Parts:
                                                        </p> {handleEstimateTotalPrice(estimateRows).toLocaleString()} Rs</Label>
                                                    <Label>
                                                        <p className={"font-bold flex flex-row"}>
                                                            {estimateDiscount} % Discount on Parts:
                                                        </p> {handleEstimateDiscount(handleEstimateTotalPrice(estimateRows)).toLocaleString()} Rs
                                                    </Label>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </form>
            </div>
            <Footer/>
        </>
    )
}