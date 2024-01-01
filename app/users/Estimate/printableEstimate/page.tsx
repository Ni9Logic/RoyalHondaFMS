'use client'
import { EstimateForm } from "../newEstimate/page";
import { Label } from "@/components/ui/label";
import TitleMehrMotors from "./Titles/MehrMotors";
import TitleRoyalHonda from "./Titles/RoyalHonda";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import Loader from "@/app/components/ui/loader";

export default function PAGE() {
    const [data, setData] = useState<any>();
    const searchParams = useSearchParams();
    const id = searchParams.get('id')?.toString();
    const [isLoading, setLoading] = useState(false);
    const [estimateRows, setEstimateRows] = useState([]);
    const [servicesDetailsRows, setServicesDetailsRows] = useState([]);


    const searchEstimate = async () => {
        setLoading(true);
        axios.post('/api/getEstimate', { id })
            .then((response: AxiosResponse) => {
                setData(response?.data?.Message)
                setEstimateRows(JSON.parse(response?.data?.Message?.EstimateTableData))
                setServicesDetailsRows(JSON.parse(response?.data?.Message?.ServicesTableData))
            })
            .catch((error: AxiosResponse) => {
                toast.error(error?.data?.Message)
            })
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        const fetchEstimate = async () => {
            await searchEstimate();
        }

        fetchEstimate();
    }, [id])
    return (
        <>
            {!data ? <div className="flex h-screen container items-center justify-center"><Loader isLoading={isLoading} /></div> :
                <div className={`flex items-center justify-center mb-auto`}>
                    <div className="border border-black h-full">
                        <div className={`w-screen container`}>
                            {/* Conditions needed here for specific customers like CGCG and Mobilink who recognize them as meher motors */}

                            <div className="flex flex-row">
                                <div className="flex flex-col">
                                    {/* Company Details */}
                                    {
                                        data.isRoyal ? <TitleRoyalHonda /> : <TitleMehrMotors />
                                    }
                                    <div className="mt-10 w-full flex flex-row gap-2">
                                        <p className="text-sm flex flex-row gap-1">Customer Name:
                                            <p className="border border-black w-auto h-auto text-sm">
                                                <p className="px-2 font-sans">{data?.cName}</p>
                                            </p>
                                        </p>

                                        <p className="text-sm flex flex-row gap-1">Surveyor:
                                            <p className="border border-black w-auto h-auto text-sm">
                                                <p className="px-2 font-sans flex flex-row gap-1">{data?.cSurveyor} <p className="text-sm font-bold text-red-500">{data?.cSurveyorNTN}</p></p>
                                            </p>
                                        </p>
                                    </div>
                                    <div className="mt-10 w-full flex flex-row gap-2">
                                        <p className="text-sm flex flex-row gap-1">Driver|User:
                                            <p className="border border-black w-auto h-auto text-sm">
                                                <p className="px-2 font-sans">{data?.cDriverUser}</p>
                                            </p>
                                        </p>

                                        <p className="text-sm flex flex-row gap-1">Insurance:
                                            <p className="border border-black w-auto h-auto text-sm">
                                                <p className="px-2 font-sans">{data?.Insurance}</p>
                                            </p>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-end ml-auto mt-2 flex-col items-end">
                                    <div className="relative w-32 h-auto">
                                        <hr className={"border-t-1 border-black flex w-auto h-auto"} />
                                        <Label className={"mt-2 flex justify-center mb-2 font-bold text-xl"}>
                                            ESTIMATE
                                        </Label>
                                        <hr className={"border-t-1 border-black flex"} />
                                    </div>
                                    <div className="h-full flex justify-end">
                                        <p className="font-sans">Date: {data?.CreatedAt}</p>
                                    </div>
                                    <div className="h-full flex justify-end">
                                        <p className="font-sans flex flex-row gap-1">
                                            <p className="font-bold">NTN #:</p> <p className="text-red-500 font-bold">{data.isRoyal ? "7522464-3" : "3268859-8"}</p>
                                        </p>
                                    </div>
                                    <div className="h-full flex justify-end">
                                        <p className="font-sans flex flex-row gap-1">
                                            <p className="font-bold">EST #:</p> 20
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Table */}
                        <div className="flex flex-col mt-10 container">
                            <table
                                className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead
                                    className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-[10px] font-sans">
                                            Make
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-[10px] font-sans">
                                            Model
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-[10px] font-sans">
                                            Veh Reg No
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-[10px] font-sans">
                                            Job #
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-[10px] font-sans">
                                            KM
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-[10px] font-sans">
                                            Payment Mode
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="col"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-[12px] font-sans">
                                            {data?.cMake}
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-[12px] font-sans">
                                            {data?.cModel}
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-4 font-medium  whitespace-nowrap dark:text-white text-red-500">
                                            {data?.cRegistration}
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-[12px] font-sans">
                                            {data?.jobId}
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-[12px] font-sans">
                                            {data?.cKiloMeters.toLocaleString()} KM
                                        </th>
                                        <th scope="col"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-[12px] font-sans">
                                            {data?.PaymentMode}
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="flex mt-2 gap-10 container flex-col">
                                <div className="flex w-full h-full flex-col">
                                    <Label className="font-sans mb-1">
                                        Parts Charges
                                    </Label>
                                    <table className="">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className=" py-3 text-[10px] font-sans">
                                                    S.NO
                                                </th>
                                                <th scope="col" className=" py-3 text-[10px] font-sans">
                                                    PART NO
                                                </th>
                                                <th scope="col" className=" py-3 text-[10px] font-sans">
                                                    PART DESCRIPTION
                                                </th>
                                                <th scope="col" className=" py-3 text-[10px] font-sans">
                                                    UNIT PRICE
                                                </th>
                                                <th scope="col" className=" py-3 text-[10px] font-sans">
                                                    QTY
                                                </th>
                                                <th scope="col" className=" py-3 text-[10px] font-sans">
                                                    TOTAL PRICE
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* {
                                                Object.keys(data?.EstimateTableData)?.map((key, index) => (
                                                    <tr className="">
                                                        <td className="px-6 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                            {index + 1}
                                                        </td>
                                                        <td className="px-6 whitespace-nowrap text-sm text-gray-900 dark:text-white items-center self-center flex">
                                                            {data?.EstimateTableData[key].partNo}
                                                        </td>
                                                        <td className="px-6 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                            {data?.EstimateTableData[key].partDesc}
                                                        </td>
                                                        <td className="px-6 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                            {data?.EstimateTableData[key].partPrice.toLocaleString()} Rs
                                                        </td>
                                                        <td className="px-6 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                            {data?.EstimateTableData[key].partQty}
                                                        </td>
                                                        <td className="px-6 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                            {data?.EstimateTableData[key].partTotalPrice.toLocaleString()} Rs
                                                        </td>
                                                    </tr>
                                                ))
                                            } */}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex w-full h-full flex-col">
                                    <Label className="font-sans mb-1">
                                        Service Labor Charges
                                    </Label>
                                    <table className="">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 w-screen">
                                            <tr>
                                                <th scope="col" className=" py-3 text-[10px] font-sans">
                                                    S.NO
                                                </th>
                                                <th scope="col" className=" py-3 text-[10px] font-sans">
                                                    Details
                                                </th>
                                                <th scope="col" className=" py-3 text-[10px] font-sans">
                                                    Charges
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                Object.keys(servicesDetailsRows)?.map((key, index) => (
                                                    <tr className="">
                                                        <td className="px-6 text-sm text-gray-900 dark:text-white">
                                                            {index + 1}
                                                        </td>
                                                        <td className="px-6 text-sm text-gray-900 dark:text-white">
                                                            {servicesDetailsRows[key].details}
                                                        </td>
                                                        <td className="px-6 text-sm text-gray-900 dark:text-white">
                                                            {servicesDetailsRows[key].charges.toLocaleString()} Rs
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col mt-1 mr-20 w-auto align-bottom items-end justify-end h-full">
                            <div className="relative h-auto mt-3">
                                <hr className={"border-t-1 border-black flex w-auto h-auto"} />
                                <Label className={"mt-2 flex justify-center mb-2 font-bold text-md"}>
                                    Overall Summary
                                </Label>
                                <hr className={"border-t-1 border-black flex"} />
                                <div>
                                    <p className="font-sans text-sm flex flex-row gap-1"><p className="font-bold">Parts Cost:</p> {data?.TotalEstimateFee.toLocaleString()} Rs</p>
                                    {
                                        data?.DiscountEstimate !== 0 && !isNaN(data?.DiscountEstimate) &&
                                        <p className="font-sans text-sm flex flex-row gap-1"><p className="font-bold">Discount on Parts:</p> {data?.DiscountEstimate} %</p>
                                    }
                                    {
                                        data?.DiscountEstimateFigure !== 0 && !isNaN(data?.DiscountEstimateFigure) &&
                                        <p className="font-sans text-sm flex flex-row gap-1"><p className="font-bold">Discount on Parts (Figure):</p> -{data?.DiscountEstimateFigure} Rs</p>
                                    }
                                    {
                                        data?.DiscountEstimateFigure !== 0 && !isNaN(data?.DiscountEstimateFigure) ?
                                            <p className="font-sans text-sm flex flex-row gap-1">Parts Price <p className="font-bold">(After Discount):</p> {(data?.TotalEstimateFee - data?.DiscountEstimateFigure - (data?.TotalEstimateFee * data?.DiscountEstimate) / 100).toLocaleString()} Rs</p>
                                            :
                                            <p className="font-sans text-sm flex flex-row gap-1">Parts Price <p className="font-bold">(After Discount):</p> {(data?.TotalEstimateFee - ((data?.TotalEstimateFee * data?.DiscountEstimate) / 100)).toLocaleString()} Rs</p>

                                    }
                                    <p className="font-sans text-sm flex flex-row gap-1"><p className="font-bold">Labor Cost:</p> {data?.TotalServiceFee.toLocaleString()} Rs</p>
                                    {
                                        data?.DiscountServices !== 0 && !isNaN(data?.DiscountServices) &&
                                        <p className="font-sans text-sm flex flex-row gap-1"><p className="font-bold">Discount on Labor:</p> {data?.DiscountServices} %</p>
                                    }
                                    {
                                        data?.DiscountServicesFigure !== 0 && !isNaN(data?.DiscountServicesFigure) &&
                                        <p className="font-sans text-sm flex flex-row gap-1"><p className="font-bold">Discount on Services (Figure):</p> -{data?.DiscountServicesFigure} Rs</p>
                                    }
                                    {
                                        data?.DiscountServicesFigure !== 0 && !isNaN(data?.DiscountServicesFigure) ?
                                            <p className="font-sans text-sm flex flex-row gap-1">Labor Price <p className="font-bold">(After Discount):</p> {(data?.TotalServiceFee - data.DiscountServicesFigure - (data?.DiscountServices * data?.TotalServiceFee) / 100).toLocaleString()} Rs</p>
                                            :
                                            <p className="font-sans text-sm flex flex-row gap-1">Labor Price <p className="font-bold">(After Discount):</p> {(data?.TotalServiceFee - (data?.DiscountServices * data?.TotalServiceFee) / 100).toLocaleString()} Rs</p>

                                    }
                                    <p className="font-sans text-sm flex flex-row gap-1"><p className="font-bold">Total Amount:</p> {((data?.TotalEstimateFee - (data?.TotalEstimateFee * data?.DiscountEstimate) / 100) + (data?.TotalServiceFee - (data?.DiscountServices * data?.TotalServiceFee) / 100)).toLocaleString()} Rs</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};