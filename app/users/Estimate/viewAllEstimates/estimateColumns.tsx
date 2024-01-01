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
import { useState } from "react";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
} from "@/components/ui/drawer"
import { EstimateForm } from "../newEstimate/page";
import PrintEstimate from "../printableEstimate/PrintableEstimate";


export const columns: ColumnDef<EstimateForm>[] = [
    {
        accessorKey: 'id',
        header: 'EST #'
    },
    {
        accessorKey: 'jobId',
        header: 'JOB #'
    },
    {
        accessorKey: 'cName',
        header: 'Customer Name'
    },
    {
        accessorKey: 'cDriverUser',
        header: 'Insured User'
    },
    {
        accessorKey: 'cSurveyor',
        header: 'Surveyor'
    },
    {
        accessorKey: 'Insurance',
        header: 'Insurance'
    },
    {
        accessorKey: 'isRoyal',
        header: 'Estimate Type'
    },
    {
        accessorKey: 'PaymentMode',
        header: 'Payment'
    },
    {
        accessorKey: 'cRegistration',
        header: 'VEH REG NO'
    },
    {
        accessorKey: 'cMake',
        header: 'MAKE'
    },
    {
        accessorKey: 'cModel',
        header: 'MODEL'
    },
    {
        accessorKey: 'cKiloMeters',
        header: 'KM'
    },
    {
        accessorKey: 'TotalEstimateFee',
        header: 'Parts Cost'
    },
    {
        accessorKey: 'DiscountEstimate',
        header: 'Parts Discount %'
    },
    {
        accessorKey: 'DiscountEstimateFigure',
        header: 'Parts Discount (In Figure)'
    },
    {
        accessorKey: 'TotalServiceFee',
        header: 'Service Cost'
    },
    {
        accessorKey: 'DiscountServices',
        header: 'Labor Discount'
    },
    {
        accessorKey: 'DiscountServicesFigure',
        header: 'Labor Discount (In Figure)'
    },
    {
        accessorKey: 'OverAllAmount',
        header: 'Overall Amount'
    },
    {
        accessorKey: 'CreatedAt',
        header: 'Date'
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const estimate = row.original
            const [printing, setIsPrinting] = useState(false);


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
                                onClick={() => navigator.clipboard.writeText(estimate.id.toString())}
                            >
                                Copy Serial Number
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem>Edit Estimate</DropdownMenuItem>
                            <Link href={{
                                pathname: '/users/Estimate/printableEstimate',
                                query: {
                                    id: estimate.id
                                }
                            }}>
                                <DropdownMenuItem>Print Estimate</DropdownMenuItem>
                            </Link>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div >
            )
        },
    },
]