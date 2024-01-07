'use client'
import TitleRoyalHonda from "@/app/users/Estimate/printableEstimate/Titles/RoyalHonda";
import { EstimateRowObject, Invoice } from "@/types";
import axios, { AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function PAGE() {
    const [isLoading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const [invoice, setInvoice] = useState<Invoice>();
    const [partRows, setPartRows] = useState<EstimateRowObject>();
    const id = searchParams.get('id');
    const fetchInvoice = async () => {
        setLoading(true);
        axios.post('/api/getInvoice', { id: parseInt(id!) })
            .then((response: AxiosResponse) => {
                setInvoice(response.data.Message);
                let myParts: EstimateRowObject = JSON.parse(response.data.Message.PartsTable);
                setPartRows(myParts);
            })
            .catch((error: AxiosResponse) => console.log(error))
            .finally(() => setLoading(false));
    }
    useEffect(() => {
        const fetchEstimate = async () => {
            await fetchInvoice();
        }

        fetchEstimate();
    }, [])


    return (
        <>
            {
                invoice &&
                <div className="h-screen w-screen items-center justify-center">
                    <div className="grid grid-cols-3 w-screen">
                        <div className="ml-2 font-sans">
                            <TitleRoyalHonda />
                        </div>
                        <div className="font-sans flex justify-center">
                            <span className="font-bold text-xl">SALES TAX INVOICE</span>
                        </div>
                        <div className="flex ml-auto flex-col font-sans mr-2">
                            <span className="flex flex-row gap-1">
                                <b>Invoice #</b>
                                <span key={"invoiceId"} className="text-red-500">
                                    {invoice.id}
                                </span>
                            </span>
                            <span key={"Date"}><b>Date:</b> {invoice.CreatedAt}</span>
                            <span key={"Est#"}><b>Estimate #</b> {invoice.EstimateNum} </span>
                        </div>
                    </div>

                    <div className="flex flex-row">
                        <div className="mt-5 ml-2 text-sm flex flex-col">
                            <div className="flex flex-row gap-1">
                                <b>Customer Name:</b> <span className="underline font-bold bg-[#eeece1]">{invoice.InsuranceName}</span>
                            </div>
                            <div className="flex flex-row gap-1">
                                <b>Surveyor Name:</b> <span className="underline font-bold bg-[#eeece1]">{invoice.SurveyorName}</span>
                            </div>
                        </div>
                        <div className="flex ml-auto text-sm p-0 flex-col mr-2">
                            <span className="border border-black">
                                <span className="ml-1 mr-1">NTN & GSTR</span>
                                <span className="border border-black border-t-0 border-r-0 border-b-0"><span className="ml-1 mr-1">7522464-3</span></span>
                                <span className="border border-black border-t-0 border-r-0 border-b-0"><span className="ml-1 mr-1">3277-87613-8009</span></span>
                            </span>
                            <span className="border border-black border-t-0">
                                <span className="ml-1 mr-1">NTN & GSTR</span>
                                <span className="border border-black border-t-0 border-r-0 border-b-0"><span className="ml-1 mr-1">{invoice.InsuranceNTN}</span></span>
                                <span className="border border-black border-t-0 border-r-0 border-b-0"><span className="ml-1 mr-1">{invoice.InsuranceGSTR}</span></span>
                            </span>
                        </div>
                    </div>
                    <div className="container mt-2 border border-black">
                        <Table className="">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Make</TableHead>
                                    <TableHead>Model</TableHead>
                                    <TableHead>Reg No</TableHead>
                                    <TableHead >Driver User</TableHead>
                                    <TableHead >Payment Mode</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="text-sm">{invoice.CarMake}</TableCell>
                                    <TableCell>{invoice.CarModel}</TableCell>
                                    <TableCell>{invoice.CarRegNum}</TableCell>
                                    <TableCell>{invoice.DriverUser}</TableCell>
                                    <TableCell>{invoice.PaymentMode}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                    <div className="container mt-2 border border-black">
                        <Table className="">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Part No</TableHead>
                                    <TableHead>Part Description</TableHead>
                                    <TableHead>Part Price</TableHead>
                                    <TableHead >Part Qty</TableHead>
                                    <TableHead >Total Price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    Object.keys(partRows!).map((key, index) => (
                                        <TableRow>
                                            <TableCell className="text-sm">{partRows![key].partNo}</TableCell>
                                            <TableCell>{partRows![key].partDesc}</TableCell>
                                            <TableCell>{partRows![key].partPrice.toLocaleString() + ' Rs'}</TableCell>
                                            <TableCell>{partRows![key].partQty}</TableCell>
                                            <TableCell>{partRows![key].partTotalPrice.toLocaleString() + ' Rs'}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </div>
                    <div className="items-center w-auto justify-center flex flex-col mt-5">
                        {/* Heading */}
                        <div className="border border-black border-l-0 border-r-0">

                            <div className="flex items-center flex-col">
                                Invoice Summary
                            </div>

                        </div>
                        {/* Parts Total */}
                        <p className="text-sm flex flex-row gap-1">
                            <b>Parts Cost:</b> {invoice.TAmountPart.toLocaleString()} Rs
                        </p>
                        <p className="text-sm flex flex-row gap-1">
                            <b>{invoice.GSTPercent}% GST:</b> {invoice.GSTCost.toLocaleString()} Rs
                        </p>

                        {/* Total Parts Cost */}
                        <p className="text-sm flex flex-row gap-1">
                            <b>Total Parts Cost:</b> {invoice.TAmountGST.toLocaleString()} Rs
                        </p>
                        <p className="text-sm flex flex-row gap-1">
                            <b>{invoice.DepPercent}% Dep On Parts:</b> {invoice.DepCost.toLocaleString()} Rs
                        </p>
                        <p className="text-sm flex flex-row gap-1">
                            <b>Parts after Dep:</b> {invoice.TAmountDep.toLocaleString()} Rs
                        </p>
                        <p className="text-sm flex flex-row gap-1">
                            <b>Labor Cost:</b> {invoice.TLaborAmount.toLocaleString()} Rs
                        </p>
                        <p className="text-sm flex flex-row gap-1">
                            <b>{invoice?.PSTPercent}% PST On Labor:</b> {invoice.PSTCost.toLocaleString()} Rs
                        </p>
                        <p className="text-sm flex flex-row gap-1">
                            <b>Labor after PST:</b> {invoice.TLaborAmountPST.toLocaleString()} Rs
                        </p>
                        <p className="text-sm flex flex-row gap-1">
                            <b>Grand Total:</b> {invoice.GrandTAmount.toLocaleString()} Rs
                        </p>
                    </div>
                </div>
            }
        </>
    )
}