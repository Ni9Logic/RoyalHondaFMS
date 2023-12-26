import Image from "next/image";
import { EstimateForm } from "../newEstimate/page";
import mehermotors from "@/app/components/images/MehrMotors.png";
import { Label } from "@/components/ui/label";

const PrintEstimate: React.FC<{ data: EstimateForm }> = ({ data }) => {
    const isPrinting = window.matchMedia('print').matches;
    return (
        <>
            <div className={`w-screen ${isPrinting ? '' : 'container'}`}>
                {/* Conditions needed here for specific customers like CGCG and Mobilink who recognize them as meher motors */}

                <div className="flex flex-row">
                    <div className="flex flex-col">
                        {/* Company Details */}
                        <div className="flex flex-col gap-1">
                            <p className="text-red-500 font-bold">
                                Meher Motors
                            </p>
                            <p className="text-[11px] w-auto">
                                445 Meherabad Peshawar Road Rawalpindi
                            </p>
                            <p className="text-blue-400 text-[11px]">051-5496022 - 21, 051-5469654</p>
                            <div className="text-[11px] gap-0">
                                <p>hondameher@yahoo.com</p>
                                <p>services.hondameher@gmail.com</p>
                                <p>hondameher.bodyshop@gmail.com</p>
                            </div>
                        </div>

                        <div className="mt-10 w-full">
                            <p className="text-sm flex flex-row gap-1">Customer Name:
                                <p className="border border-black w-auto h-auto text-sm">
                                    <p className="px-2 font-sans">{data?.customerName}</p>
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
                                <p className="font-bold">NTN #:</p> <p className="text-red-500 font-bold">3268859-8</p>
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
            <div className="flex flex-col mt-10">
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
                                Mod Of Payment
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="col"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-[12px] font-sans">
                                {data?.make}
                            </th>
                            <th scope="col"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-[12px] font-sans">
                                {data?.model}
                            </th>
                            <th scope="col"
                                className="px-6 py-4 font-medium  whitespace-nowrap dark:text-white text-red-500">
                                {data?.carRegistration}
                            </th>
                            <th scope="col"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-[12px] font-sans">
                                {data?.JobId}
                            </th>
                            <th scope="col"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-[12px] font-sans">
                                {data?.Kilometers.toLocaleString()} KM
                            </th>
                            <th scope="col"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-[12px] font-sans">
                                {data?.paymentMode}
                            </th>
                        </tr>
                    </tbody>
                </table>
                <div className="flex flex-col mt-2 gap-10 container mr-5">
                    <div>
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
                                {
                                    data?.EstimateTableData?.map((item, index) => (
                                        <tr className="">
                                            <td className="px-6 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 whitespace-nowrap text-sm text-gray-900 dark:text-white items-center self-center flex">
                                                {item?.partNo}
                                            </td>
                                            <td className="px-6 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {item?.partDesc}
                                            </td>
                                            <td className="px-6 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {item?.partPrice.toLocaleString()} Rs
                                            </td>
                                            <td className="px-6 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {item?.partQty}
                                            </td>
                                            <td className="px-6 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {item.partTotalPrice.toLocaleString()} Rs
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div>
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
                                    data?.ServicesDetailsTableData?.map((item, index) => (
                                        <tr className="">
                                            <td className="px-6 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 whitespace-nowrap text-sm text-gray-900 dark:text-white items-center self-center flex">
                                                {item?.details}
                                            </td>
                                            <td className="px-6 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {item?.charges.toLocaleString()} Rs
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mt-1 justify-end items-end ml-auto mr-10 w-auto">
                <div className="border border-black border-l-0 border-r-0 w-auto">
                    <p className="font-bold">Overall Summary</p>
                </div>
                <div>
                    <p className="font-sans text-sm">Parts Price: {data?.TotalEstimateFee}</p> 
                    <p className="font-sans text-sm">Discount on Parts: {data?.EstimateDiscount}</p> 
                    <p className="font-sans text-sm">Parts Price (Discounted): {(data?.EstimateDiscount/data?.TotalEstimateFee) * 100}</p> 
                    <p className="font-sans text-sm">Labor Cost: {data?.TotalServiceFee}</p> 
                    <p className="font-sans text-sm">Discount on Labor: {data?.ServicesDiscount}</p> 
                    <p className="font-sans text-sm">Labor Price (Discounted): {(data?.ServicesDiscount/data?.TotalEstimateFee) * 100}</p> 
                    <p className="font-sans text-sm">Total Price: {data?.OverAllAmount}</p> 
                </div>
            </div>
        </>
    );
};

export default PrintEstimate;