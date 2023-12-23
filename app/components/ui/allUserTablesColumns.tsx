'use client'

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
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
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import AnotherPrintJobs from "../printable/jobPrintAble";
import EditJobCard from "../jobCard/editJobCard";


export type JobTable = {
    SerialNo: number;
    CustomerName: String;
    DriverUser: String;
    CellNo: String;
    JobCheckedBy: String;
    WorkType: String;
    Insurance: String;
    carRegistration: String;
    FrameNo: String;
    BatteryNumber: String;
    In: { VRecievedBy: string, VRecievedFrom: string, Time: string };
    Out: { VRecievedBy: string, VRecievedFrom: string, Time: string };
    CreatedAt: Date;
}


export const columns: ColumnDef<JobTable>[] = [
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
        cell: ({ row }) => {
            const job = row.original
            const [printing, setIsPrinting] = useState(false);
            const [edit, setEdit] = useState(false);

            return (
                <>
                    {
                        !printing &&
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
                                    onClick={() => navigator.clipboard.writeText(job.SerialNo.toString())}
                                >
                                    Copy Serial Number
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => {
                                    setEdit(true);
                                }}>Edit Job Card</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                    setIsPrinting(true);
                                }
                                }>Print Job Card</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    }
                    {
                        printing &&
                        <Drawer open={printing}>
                            <DrawerContent className="h-full w-full">
                                <AnotherPrintJobs data={job} onClose={() => setIsPrinting(false)} />
                                <DrawerClose>
                                </DrawerClose>
                            </DrawerContent>
                        </Drawer>
                    }
                    {
                        edit &&
                        <Drawer open={edit}>
                            <DrawerContent className="h-full w-full">
                                <EditJobCard data={job} onClose={() => setEdit(false)} />
                                <DrawerClose>
                                </DrawerClose>
                            </DrawerContent>
                        </Drawer>
                    }
                </>
            )
        },
    },
]