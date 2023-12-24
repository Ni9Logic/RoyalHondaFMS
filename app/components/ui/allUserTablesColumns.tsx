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
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import AnotherPrintJobs from "../printable/jobPrintAble";
import axios from "axios";
import { useRouter } from "next/navigation";

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
    RequiredWorkDetails: String;
    AdditionalWorkDetails: string;
    OtherAdditionalWorkDetails: String;
    Fuel: string;
    Mileage: string;
    Lighter: boolean;
    Ashtray: boolean;
    FloorMats: boolean;
    OriginalBook: boolean;
    SeatCovers: boolean;
    RadioAnteena: boolean;
    SpareWheel: boolean;
    WheelRod: boolean;
    JackHandle: boolean;
    Tools: boolean,
    ExtraThings: boolean;
    InReceivedBy: string;
    InReceivedFrom: string;
    InTime: string;
    OutReceivedBy: string;
    OutReceivedFrom: string;
    OutTime: string;
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
                                <Link href={{
                                    pathname: '../components/editJob',
                                    query: {
                                        SerialNo: `${job.SerialNo}`,
                                        CustomerName: `${job.CustomerName}`,
                                        CustomerContact: `${job.CellNo}`,
                                        JobCheckedBy: `${job.JobCheckedBy}`,
                                        WorkType: `${job.WorkType}`,
                                        Insurance: `${job.Insurance}`,
                                        RegistrationNumber: `${job.carRegistration}`,
                                        RequiredWorkDetails: `${job.RequiredWorkDetails}`,
                                        AdditionalWorkDetails: `${job.AdditionalWorkDetails}`,
                                        OtherAdditionalWorkDetails: `${job.OtherAdditionalWorkDetails}`,
                                        BatteryNumber: `${job.BatteryNumber}`,
                                        FrameNumber: `${job.FrameNo}`,
                                        DriverUser: `${job.DriverUser}`,
                                        Fuel: `${job.Fuel}`,
                                        Mileage: `${job.Mileage}`,
                                        Lighter: `${job.Lighter}`,
                                        Ashtray: `${job.Ashtray}`,
                                        FloorMats: `${job.FloorMats}`,
                                        OriginalBook: `${job.OriginalBook}`,
                                        SeatCovers: `${job.SeatCovers}`,
                                        RadioAnteena: `${job.RadioAnteena}`,
                                        SpareWheel: `${job.SpareWheel}`,
                                        WheelRod: `${job.WheelRod}`,
                                        JackHandle: `${job.JackHandle}`,
                                        Tools: `${job.Tools}`,
                                        ExtraThings: `${job.ExtraThings}`,
                                        InReceivedBy: `${job.InReceivedBy}`,
                                        InReceivedFrom: `${job.InReceivedFrom}`,
                                        InTime: `${job.InTime}`,
                                        OutReceivedBy: `${job.OutReceivedBy}`,
                                        OutReceivedFrom: `${job.OutReceivedFrom}`,
                                        OutTime: `${job.OutTime}`,
                                    },
                                }}>
                                    <DropdownMenuItem>Edit Job Card</DropdownMenuItem>
                                </Link>
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
                </>
            )
        },
    },
]