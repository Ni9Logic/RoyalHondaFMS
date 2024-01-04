'use client'
import { InvoiceData } from "@/app/lib/Resources";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { EstimateRowObject, Invoice, PriceSheet } from "@/types";
import { Label } from "@radix-ui/react-label";
import axios, { Axios, AxiosResponse } from "axios";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
interface InvoiceTableProps {
    setValue: UseFormSetValue<Invoice>,
    setGenerateSummary: Dispatch<SetStateAction<boolean>>
}
export const InvoiceTable: React.FC<InvoiceTableProps> = ({ setValue, setGenerateSummary }: InvoiceTableProps) => {
    const [invoiceRows, setInvoiceRows] = React.useState<EstimateRowObject>({
        [uuidv4()]: {
            partNo: "",
            partDesc: "",
            partPrice: 0,
            partQty: 1,
            partTotalPrice: 0,
        },
        [uuidv4()]: {
            partNo: "",
            partDesc: "",
            partPrice: 0,
            partQty: 1,
            partTotalPrice: 0,
        },
        [uuidv4()]: {
            partNo: "",
            partDesc: "",
            partPrice: 0,
            partQty: 1,
            partTotalPrice: 0,
        },
    })

    const handleAddInvoiceRow = () => {
        const obj = { ...invoiceRows };
        obj[uuidv4()] = {
            partNo: '',
            partDesc: '',
            partQty: 1,
            partPrice: 0,
            partTotalPrice: 0
        };
        setInvoiceRows(obj);
    }

    const handleRemoveInvoiceRow = (key: string) => {
        const updatedRows = { ...invoiceRows }
        delete updatedRows[key]
        setInvoiceRows(updatedRows)
    }

    const handleGenerateSummary = () => {
        setValue('PartsTable', invoiceRows);
        InvoiceData.PartsTable = invoiceRows;
        setGenerateSummary(true);
    }

    async function fetchPart(partNo: string, key: string) {
        axios.post('/api/getPartNo', { partNo })
            .then((res: AxiosResponse) => {
                const myData: PriceSheet = res?.data?.Message;
                const updatedRows = { ...invoiceRows };
                updatedRows[key].partDesc = myData?.partDescription;
                updatedRows[key].partPrice = parseInt(myData?.partPrice);
                setInvoiceRows(updatedRows);
            })
            .catch((error: any) => {
                console.log(error);
            })
    }


    return (
        <>
            <div className="items-center justify-center flex flex-col">
                <Label>Invoice</Label>
                <Table className="w-[70rem]">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">SR NO</TableHead>
                            <TableHead className="w-[10rem]">Part No</TableHead>
                            <TableHead className="w-[30rem]">Part Description</TableHead>
                            <TableHead className="w-[30rem]">Part Price</TableHead>
                            <TableHead className="w-[30rem]">Part Qty</TableHead>
                            <TableHead className="w-[30rem]">Total Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            Object.keys(invoiceRows).map((key, index) => (
                                <TableRow key={key}>
                                    {/* Serial No */}
                                    <TableCell className="font-medium">
                                        {index + 1}
                                    </TableCell>
                                    {/* Part No */}
                                    <TableCell className="w-1/5">
                                        <Input type="text" onChange={async (e) => {
                                            const updatedRows = { ...invoiceRows };
                                            updatedRows[key].partNo = e.target.value;
                                            setInvoiceRows(updatedRows);
                                            await fetchPart(e.target.value, key);

                                        }} />
                                    </TableCell>
                                    {/* Part Description */}
                                    <TableCell className="w-1/5">
                                        <Input
                                            onChange={(e) => {
                                                const updatedRows = { ...invoiceRows }
                                                updatedRows[key].partDesc = e.target.value
                                                setInvoiceRows(updatedRows)
                                            }} type="text" defaultValue={invoiceRows[key].partDesc} />
                                    </TableCell>
                                    {/* Part Price */}
                                    <TableCell className="w-1/5">
                                        <Input type="number"
                                            onChange={(e) => {
                                                const updatedRows = { ...invoiceRows };
                                                updatedRows[key].partPrice = parseInt(e.target.value);
                                                updatedRows[key].partTotalPrice = updatedRows[key].partQty * updatedRows[key].partPrice;
                                                setInvoiceRows(updatedRows);
                                            }} defaultValue={invoiceRows[key].partPrice} />
                                    </TableCell>
                                    {/* Part Qty */}
                                    <TableCell className="w-3">
                                        <Input type="number" onChange={(e) => {
                                            const updatedRows = { ...invoiceRows };
                                            updatedRows[key].partQty = parseInt(e.target.value);
                                            updatedRows[key].partTotalPrice = updatedRows[key].partQty * updatedRows[key].partPrice;
                                            setInvoiceRows(updatedRows);
                                        }} />
                                    </TableCell>
                                    <TableCell>{
                                        (invoiceRows[key].partQty * invoiceRows[key].partPrice).toLocaleString() + ' Rs'}
                                    </TableCell>
                                    <TableCell>
                                        <Button type="button" variant={"ghost"} onClick={
                                            () => handleRemoveInvoiceRow(key)
                                        }>
                                            <p className="text-red-500 underline">Delete</p>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                <div className="mr-auto mt-2 flex flex-row gap-1">
                    <Button className="mr-auto mt-2" type="button" onClick={() => {
                        handleAddInvoiceRow()
                    }}>Add Entry</Button>
                    <Button className="mr-auto mt-2" type="button" onClick={() => handleGenerateSummary()}>
                        Generate Summary
                    </Button>
                </div>
            </div >
        </>
    )
}

export default InvoiceTable;