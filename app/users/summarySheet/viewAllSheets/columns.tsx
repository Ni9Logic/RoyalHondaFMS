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
import { summarySheet } from "@prisma/client";


export const columns: ColumnDef<summarySheet>[] = [
    {
        accessorKey: 'id',
        header: 'SR #'
    },
    {
        accessorKey: 'CreatedAt',
        header: 'Date'
    },
    {
        accessorKey: 'InvoiceId',
        header: 'INV #'
    },
    {
        accessorKey: 'LossNum',
        header: 'LOSS #'
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
        accessorKey: 'ParkedStatus',
        header: 'Parked Status'
    },
    {
        accessorKey: 'UserDriver',
        header: 'User Driver'
    },
    {
        accessorKey: 'jobid',
        header: 'Job Id'
    },
    {
        accessorKey: 'Total Cost',
        header: 'Parts Cost',
        cell({ row }) {
            const summarySheet = row.original;
            return summarySheet.InvoiceGrandAmount!.toLocaleString('en-US', { style: 'currency', currency: 'PKR' });
        },
    },
    {
        accessorKey: 'ExpectedPromiseTime',
        header: 'Expected Promise Time'
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
                            <Link href={{
                                pathname: './printSalesInvoice',
                                query: {
                                    id: invoice.id,
                                }
                            }}>
                                <DropdownMenuItem>Print Invoice</DropdownMenuItem>
                            </Link>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div >
            )
        },
    },
]