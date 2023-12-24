'use client'

import {ColumnDef} from "@tanstack/react-table";
import {MoreHorizontal} from "lucide-react"
import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useState} from "react";


interface EstimateTable {
    SerialNumber: string;
    jobId: string;
    cName: string;
    cMake: string;
    cModel: string;
    carRegistration: string;
    cKilometers: string;
    PaymentMode: string;
    TableData: [{ PartNo: string, PartDesc: string, PartQty: string, PartPrice: string }];
}

export const columns: ColumnDef<EstimateTable>[] = [
    {
        accessorKey: 'SerialNo',
        header: 'Serial No'
    },
    {
        accessorKey: 'CustomerName',
        header: 'Customer Name'
    },
    {
        accessorKey: 'Insurance',
        header: 'Insurance Company'
    },
    {
        accessorKey: 'CellNo',
        header: 'Contact Number'
    },
    {
        accessorKey: 'DriverUser',
        header: 'Driver | User'
    },
    {
        accessorKey: 'JobCheckedBy',
        header: 'Job Checked By'
    },
    {
        accessorKey: 'carRegistration',
        header: 'Registration Number'
    },
    {
        accessorKey: 'DriverUser',
        header: 'Driver | User'
    },
    {
        accessorKey: 'BatteryNumber',
        header: 'Battery Number'
    },
    {
        accessorKey: 'FrameNo',
        header: 'Frame Number'
    },

    {
        accessorKey: 'CreatedAt',
        header: 'Creation Time'
    },
    {
        id: "actions",
        cell: ({row}) => {
            const job = row.original
            const [printing, setIsPrinting] = useState(false);


            return (
                <>
                    {
                        !printing &&
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4"/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                    onClick={() => navigator.clipboard.writeText(job.SerialNumber.toString())}
                                >
                                    Copy Serial Number
                                </DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem>Edit Job Card</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                    setIsPrinting(true);
                                }
                                }>Print Job Card</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    }
                </>
            )
        },
    },
]