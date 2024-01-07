'use client'

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Invoice } from "@/types";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogEditInvoice } from "../Components/CustomerDetailsEditInvoice";


export const columns: ColumnDef<Invoice>[] = [
    {
        accessorKey: 'id',
        header: 'INV #'
    },
    {
        accessorKey: 'EstimateNum',
        header: 'EST #'
    },
    {
        accessorKey: 'InvoiceType',
        header: 'Type'
    },
    {
        accessorKey: 'LossNumber',
        header: 'Loss Number'
    },
    {
        accessorKey: 'InsuranceName',
        header: 'Insurance'
    },
    {
        accessorKey: 'SurveyorName',
        header: 'Surveyor'
    },
    {
        accessorKey: 'DriverUser',
        header: 'User'
    },
    {
        accessorKey: 'CarMake',
        header: 'Make'
    },
    {
        accessorKey: 'CarModel',
        header: 'Model'
    },
    {
        accessorKey: 'CarRegNum',
        header: 'Reg #'
    },
    {
        accessorKey: 'PaymentMode',
        header: 'Payment'
    },
    {
        accessorKey: 'TAmountPart',
        header: 'Parts Cost',
        cell({ row }) {
            const invoice = row.original;
            return invoice.TAmountPart.toLocaleString('en-US', { style: 'currency', currency: 'PKR' });
        },
    },
    {
        accessorKey: 'GSTCost',
        header: 'GST Cost',
        cell({ row }) {
            const invoice = row.original;
            return invoice.GSTCost.toLocaleString('en-US', { style: 'currency', currency: 'PKR' });
        },
    },
    {
        accessorKey: 'TAmountGST',
        header: 'Parts After GST',
        cell({ row }) {
            const invoice = row.original;
            return invoice.TAmountGST.toLocaleString('en-US', { style: 'currency', currency: 'PKR' });
        },
    },
    {
        accessorKey: 'DepPercent',
        header: 'Depreciation(%)'
    },
    {
        accessorKey: 'DepCost',
        header: 'Depreciation Cost',
        cell({ row }) {
            const invoice = row.original;
            return invoice.DepCost.toLocaleString('en-US', { style: 'currency', currency: 'PKR' });
        },
    },
    {
        accessorKey: 'TAmountDep',
        header: 'Parts After Depreciation',
        cell({ row }) {
            const invoice = row.original;
            return invoice.TAmountDep.toLocaleString('en-US', { style: 'currency', currency: 'PKR' });
        },
    },
    {
        accessorKey: 'TLaborAmount',
        header: 'Labor Cost',
        cell({ row }) {
            const invoice = row.original;
            return invoice.TLaborAmount.toLocaleString('en-US', { style: 'currency', currency: 'PKR' });
        },
    },
    {
        accessorKey: 'PSTPercent',
        header: 'PST %'
    },
    {
        accessorKey: 'PSTCost',
        header: 'PST Cost',
        cell({ row }) {
            const invoice = row.original;
            return invoice.PSTCost.toLocaleString('en-US', { style: 'currency', currency: 'PKR' });
        },
    },
    {
        accessorKey: 'TLaborAmountPST',
        header: 'Labor Cost After PST',
        cell({ row }) {
            const invoice = row.original;
            return invoice.TLaborAmountPST.toLocaleString('en-US', { style: 'currency', currency: 'PKR' });
        },
    },
    {
        accessorKey: 'GrandTAmount',
        header: 'Grand Total',
        cell({ row }) {
            const invoice = row.original;
            return invoice.GrandTAmount.toLocaleString('en-US', { style: 'currency', currency: 'PKR' });
        },
    },
    {
        accessorKey: 'CreatedAt',
        header: 'Date'
    },

    {
        id: "actions",
        cell: ({ row }) => {
            const invoice = row.original
            const [isEdit, setEdit] = useState(false);

            return (
                <div className="flex items-center justify-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(invoice.id!.toString())}
                            >
                                Copy Serial Number
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DialogEditInvoice invoice={invoice} />
                            <DropdownMenuItem>Print Invoice</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div >
            )
        },
    },
]