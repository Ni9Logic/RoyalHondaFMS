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
        header: 'Parts Cost'
    },
    {
        accessorKey: 'GSTCost',
        header: 'GST Cost'
    },
    {
        accessorKey: 'TAmountGST',
        header: 'Parts After GST'
    },
    {
        accessorKey: 'DepPercent',
        header: 'Depreciation(%)'
    },
    {
        accessorKey: 'DepCost',
        header: 'Depreciation Cost'
    },
    {
        accessorKey: 'TAmountDep',
        header: 'Parts After Depreciation'
    },
    {
        accessorKey: 'TLaborAmount',
        header: 'Labor Cost'
    },
    {
        accessorKey: 'PSTPercent',
        header: 'PST %'
    },
    {
        accessorKey: 'PSTCost',
        header: 'PST Cost'
    },
    {
        accessorKey: 'TLaborAmountPST',
        header: 'Labor Cost After PST'
    },
    {
        accessorKey: 'GrandTAmount',
        header: 'Grand Total'
    },
    {
        accessorKey: 'CreatedAt',
        header: 'Date'
    },
   
    {
        id: "actions",
        cell: ({ row }) => {
            const invoice = row.original


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
                                pathname: '/users/Estimate/EditEstimate',
                                query: {
                                    id: invoice.id
                                }
                            }}>
                                <DropdownMenuItem>Edit Invoice</DropdownMenuItem>
                            </Link>
                            <Link href={{
                                pathname: '/users/Estimate/printableEstimate',
                                query: {
                                    id: invoice.id
                                }
                            }}>
                                <DropdownMenuItem>Print Invoice</DropdownMenuItem>
                            </Link>
                        </DropdownMenuContent>
                    </DropdownMenu>x``

                </div >
            )
        },
    },
]