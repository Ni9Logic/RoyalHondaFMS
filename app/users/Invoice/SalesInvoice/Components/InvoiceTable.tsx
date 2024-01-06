'use client'
import { InvoiceData } from "@/app/lib/Resources";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { EstimateRowObject, Invoice, PriceSheet } from "@/types";
import { Label } from "@radix-ui/react-label";
import axios, { Axios, AxiosResponse } from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

// TODO REFRESH BUTTON INSTEAD OF REGENERATING INVOICE SUMMARY EACH TIME
// TODO A WAY TO DEBOUNCE VALUES IN PARTNO
// TODO A WAY TO USE INVOICEDATA.PARTSTABLE WHEN WE GET ESTIMATETABLEDATA.

interface InvoiceTableProps {
    setValue: UseFormSetValue<Invoice>,
    setGenerateSummary: Dispatch<SetStateAction<boolean>>,
    setRows: Dispatch<SetStateAction<EstimateRowObject>>,

}
export const InvoiceTable: React.FC<InvoiceTableProps> = ({ setValue, setGenerateSummary, setRows }: InvoiceTableProps) => {
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
            partNo: "",
            partDesc: "",
            partQty: 1,
            partPrice: 0,
            partTotalPrice: 0
        };
        setInvoiceRows(obj);
        setRows(obj);
        InvoiceData.PartsTable = invoiceRows;
    }

    const handleRemoveInvoiceRow = (key: string) => {
        const updatedRows = { ...invoiceRows }
        delete updatedRows[key]
        setInvoiceRows(updatedRows)
        setRows(updatedRows);
        InvoiceData.PartsTable = updatedRows;
    }

    const handleGenerateSummary = () => {
        setValue('PartsTable', invoiceRows);
        InvoiceData.PartsTable = invoiceRows;
        const updatedRows = { ...invoiceRows };
        setInvoiceRows(updatedRows);
        setRows(updatedRows);
        setGenerateSummary((prevValue) => !prevValue);
    }

    const [isFetched, setIsFetched] = useState(false);
    async function fetchPart(partNo: string, key: string) {
        setIsFetched(true);
        try {
            const res: AxiosResponse = await axios.post('/api/getPartNo', { partNo });
            const myData: PriceSheet = res?.data?.Message;

            const updatedRows = { ...invoiceRows };
            updatedRows[key].partDesc = myData?.partDescription;
            updatedRows[key].partPrice = parseFloat(myData?.partPrice);
            updatedRows[key].partTotalPrice = updatedRows[key].partQty * updatedRows[key].partPrice;

            setInvoiceRows(updatedRows);
            setRows(updatedRows);
            InvoiceData.PartsTable = updatedRows;

        } catch (error) {
            console.log(error);
            setIsFetched(false);
        }
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
                                            await fetchPart(e.target.value, key);
                                            const updatedRows = { ...invoiceRows };
                                            updatedRows[key].partNo = e.target.value;
                                            setInvoiceRows(updatedRows);
                                            setRows(updatedRows);
                                            InvoiceData.PartsTable = invoiceRows;

                                        }} />
                                    </TableCell>
                                    {/* Part Description */}
                                    <TableCell className="w-1/5">
                                        <Input
                                            onChange={(e) => {
                                                const updatedRows = { ...invoiceRows }
                                                updatedRows[key].partDesc = e.target.value
                                                setInvoiceRows(updatedRows)
                                                setRows(updatedRows);
                                                InvoiceData.PartsTable = invoiceRows;

                                            }} type="text" defaultValue={invoiceRows[key].partDesc} />
                                    </TableCell>
                                    {/* Part Price */}
                                    <TableCell className="w-1/5">
                                        <Input type="text"

                                            onChange={(e) => {
                                                const updatedRows = { ...invoiceRows };
                                                updatedRows[key].partPrice = parseInt(e.target.value);
                                                updatedRows[key].partTotalPrice = updatedRows[key].partQty * updatedRows[key].partPrice;
                                                setInvoiceRows(updatedRows);
                                                setRows(updatedRows);
                                                InvoiceData.PartsTable = invoiceRows;
                                                console.log(invoiceRows[key].partPrice);
                                            }} defaultValue={InvoiceData.PartsTable[key]?.partPrice} />
                                    </TableCell>
                                    {/* Part Qty */}
                                    <TableCell className="w-3">
                                        <Input type="number" onChange={(e) => {
                                            const updatedRows = { ...invoiceRows };
                                            updatedRows[key].partQty = parseInt(e.target.value);
                                            updatedRows[key].partTotalPrice = updatedRows[key].partQty * updatedRows[key].partPrice;
                                            setRows(updatedRows);
                                            InvoiceData.PartsTable = invoiceRows;
                                        }} defaultValue={1} />
                                    </TableCell>
                                    <TableCell>{
                                        (invoiceRows[key].partQty * invoiceRows[key].partPrice).toLocaleString() + ' Rs'}
                                    </TableCell>
                                    <TableCell>
                                        <Button type="button" variant={"ghost"} onClick={
                                            () => handleRemoveInvoiceRow(key)
                                        }>
                                            <p className="text-blue-500 underline">Delete</p>
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
                    <Input onChange={(e) => {
                        setValue('TLaborAmount', parseFloat(e.target.value));
                        InvoiceData.TLaborAmount = parseFloat(e.target.value);
                        if (isNaN(InvoiceData.TLaborAmount))
                            InvoiceData.TLaborAmount = 0;
                    }} className="mt-2 ml-[10rem]" placeholder="Labor Cost" type="number" defaultValue={InvoiceData.TLaborAmount} />
                    <Input onChange={(e) => {
                        setValue('DepPercent', parseFloat(e.target.value));
                        InvoiceData.DepPercent = parseFloat(e.target.value);
                        if (isNaN(InvoiceData.DepPercent))
                            InvoiceData.DepPercent = 0;
                    }} defaultValue={60} className="mt-2" placeholder="Deposition On Parts" type="number" />
                    <Input onChange={(e) => {
                        setValue('PSTPercent', parseFloat(e.target.value));
                        InvoiceData.PSTPercent = parseFloat(e.target.value);
                        if (isNaN(InvoiceData.PSTPercent))
                            InvoiceData.PSTPercent = 0;
                    }} defaultValue={16} className="mt-2" placeholder="PST" type="number" />
                </div>
            </div >
        </>
    )
}

export default InvoiceTable;